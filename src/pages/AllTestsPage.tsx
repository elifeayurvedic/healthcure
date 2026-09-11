import { useState, useMemo, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useSearchParams } from 'react-router-dom'
import { TESTS, CATEGORIES } from '../data/mockData'
import { Test } from '../types'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { formatPrice, formatDiscount, generateWhatsAppUrl, SITE_CONFIG } from '../lib/constants'

// Routine category tab options for Section 4
const ROUTINE_TABS = [
  { id: 'all', label: 'All Routine' },
  { id: 'hematology', label: 'Hematology', match: ['cbc', 'blood', 'hemogram'] },
  { id: 'thyroid', label: 'Thyroid & Hormones', match: ['thyroid', 'tsh', 't3'] },
  { id: 'liver', label: 'Liver Function', match: ['liver', 'lft', 'bilirubin', 'sgpt'] },
  { id: 'kidney', label: 'Kidney Function', match: ['kidney', 'kft', 'creatinine', 'urea'] },
  { id: 'vitamins', label: 'Vitamins & Minerals', match: ['vitamin', 'b12', 'd3'] },
  { id: 'cardio', label: 'Cardiovascular', match: ['lipid', 'cholesterol', 'heart'] },
]

export default function AllTestsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || ''

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [activeCategoryFilter, setActiveCategoryFilter] = useState(initialCategory)
  const [routineTab, setRoutineTab] = useState('all')

  // Supabase live data integration with fallback
  const [dbTests, setDbTests] = useState<Test[]>(TESTS)
  const [isLoading, setIsLoading] = useState(false)
  const [dbError, setDbError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    async function fetchSupabaseTests() {
      if (!isSupabaseConfigured) return

      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('tests')
          .select('*, category:categories(*)')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (error) throw error
        if (isMounted && data && data.length > 0) {
          setDbTests(data)
        }
      } catch (err: unknown) {
        if (isMounted) {
          setDbError(err instanceof Error ? err.message : 'Could not fetch from database')
          // Keeps local fallback data intact
        }
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }

    fetchSupabaseTests()
    return () => {
      isMounted = false
    }
  }, [])

  // Sync state with URL params
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const cat = searchParams.get('category') || ''
    setSearchQuery(q)
    setActiveCategoryFilter(cat)
  }, [searchParams])

  // Categorized tests for Stitch dedicated sections
  const sugarTests = useMemo(() => {
    return dbTests.filter(t => 
      t.category_id === 'c14' ||
      t.slug.includes('sugar') ||
      t.slug.includes('glucose') ||
      t.slug.includes('hba1c') ||
      t.slug.includes('insulin') ||
      t.slug.includes('diabetes') ||
      t.slug.includes('microalbumin')
    )
  }, [dbTests])

  const pregnancyTests = useMemo(() => {
    return dbTests.filter(t =>
      t.category_id === 'c12' ||
      t.slug.includes('hcg') ||
      t.slug.includes('marker') ||
      t.slug.includes('antenatal') ||
      t.slug.includes('anc') ||
      t.slug.includes('ogtt') ||
      t.slug.includes('pregnancy')
    )
  }, [dbTests])

  const routineTests = useMemo(() => {
    const coreSlugs = [
      'complete-blood-count-cbc',
      'liver-function-test',
      'kidney-function-test',
      'lipid-profile-total',
      'vitamin-d3-25-hydroxy',
      'vitamin-b12-cyanocobalamin',
      'thyroid-profile-total',
      'urine-routine-microscopic',
      'vitamin-d-b12-duo',
      'blood-glucose-fasting-pp',
    ]

    let list = dbTests.filter(t => coreSlugs.includes(t.slug))
    if (list.length === 0) list = dbTests.slice(0, 8)

    if (routineTab === 'all') return list

    const tab = ROUTINE_TABS.find(t => t.id === routineTab)
    if (!tab || !tab.match) return list

    return list.filter(t => 
      tab.match?.some(m => 
        t.name.toLowerCase().includes(m) || 
        t.slug.toLowerCase().includes(m) ||
        (t.method && t.method.toLowerCase().includes(m))
      )
    )
  }, [dbTests, routineTab])

  // Filtered tests when user searches or applies a specific filter
  const isSearchActive = Boolean(searchQuery.trim() || activeCategoryFilter)

  const searchResults = useMemo(() => {
    if (!isSearchActive) return []
    let tests = [...dbTests]

    if (activeCategoryFilter) {
      const catKey = activeCategoryFilter.toLowerCase()
      if (catKey === 'sugar' || catKey === 'diabetes') {
        tests = sugarTests
      } else if (catKey === 'pregnancy' || catKey === 'maternal') {
        tests = pregnancyTests
      } else {
        tests = tests.filter(t => {
          const cat = CATEGORIES.find(c => c.slug === activeCategoryFilter || c.id === activeCategoryFilter)
          if (cat) return t.category_id === cat.id
          return t.name.toLowerCase().includes(catKey) || t.short_description.toLowerCase().includes(catKey)
        })
      }
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      tests = tests.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.short_description.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.method && t.method.toLowerCase().includes(q)) ||
        (t.specimen && t.specimen.toLowerCase().includes(q)) ||
        (t.preparation && t.preparation.toLowerCase().includes(q))
      )
    }

    return tests
  }, [dbTests, searchQuery, activeCategoryFilter, isSearchActive, sugarTests, pregnancyTests])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params: Record<string, string> = {}
    if (searchQuery.trim()) params.q = searchQuery.trim()
    if (activeCategoryFilter) params.category = activeCategoryFilter
    setSearchParams(params)
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setActiveCategoryFilter('')
    setSearchParams({})
  }

  const handleFilterPillClick = (filterSlug: string, anchorId?: string) => {
    if (filterSlug === 'all') {
      handleClearFilters()
      return
    }
    setActiveCategoryFilter(filterSlug)
    const params: Record<string, string> = {}
    if (searchQuery.trim()) params.q = searchQuery.trim()
    params.category = filterSlug
    setSearchParams(params)

    if (anchorId && !searchQuery.trim()) {
      const element = document.getElementById(anchorId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>All Diagnostic Tests | HealthCure Diagnostics, Kolkata</title>
        <meta
          name="description"
          content="Over 350+ certified diagnostic tests, blood tests, and pathology profiles with gentle doorstep collection in Kolkata & Barasat. 100% sterile vacutainers, calibrated HPLC & same-day WhatsApp reports."
        />
        <link rel="canonical" href="https://healthcurediagnostics.in/tests" />
        <meta property="og:title" content="All Diagnostic Tests | HealthCure Diagnostics, Kolkata" />
        <meta
          property="og:description"
          content="Explore certified blood tests, diabetic profiles, and maternal screening with 60-min home sample pickup."
        />
        <meta property="og:url" content="https://healthcurediagnostics.in/tests" />
      </Helmet>

      <div className="w-full bg-surface text-on-surface antialiased min-h-screen">
        {/* ================================================================= */}
        {/* TOP BREADCRUMB & INTRO HEADER                                    */}
        {/* ================================================================= */}
        <section className="w-full bg-surface-container-lowest py-8 px-4 lg:px-8 border-b border-surface-container">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-caption text-caption text-on-surface-variant">
              <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">home</span>
                <span>Home</span>
              </Link>
              <span>/</span>
              <span className="text-on-surface-variant">Diagnostic Tests</span>
              <span>/</span>
              <span className="text-primary font-semibold">All Pathology &amp; Radiology Tests</span>
            </nav>

            {/* Main Headline & Narrative */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-8 flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 self-start bg-secondary/10 text-secondary px-3 py-1 rounded-full font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[16px]">verified_user</span>
                  <span>NABL Aligned • Calibrated Chemiluminescence &amp; HPLC</span>
                </div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-tight font-extrabold">
                  All Diagnostic Tests &amp; Pathology Profiles
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
                  Over 350+ certified individual tests &amp; specialized profiles with doorstep sample collection across Kolkata, Barasat, and North 24 Parganas. 100% sterile vacuum collection, barcoded cold chain, and same-day MD Pathologist verified digital reports delivered via WhatsApp and email.
                </p>
              </div>

              {/* Quick Summary Micro-stats */}
              <div className="lg:col-span-4 flex flex-wrap lg:flex-col gap-3 justify-end">
                <div className="flex items-center gap-3 bg-surface-container-low p-3.5 rounded-xl flex-1 min-w-[200px]">
                  <div className="w-10 h-10 rounded-lg bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">60-Min Dispatch</span>
                    <span className="font-caption text-caption text-on-surface-variant">Fast morning home pickup slots</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-surface-container-low p-3.5 rounded-xl flex-1 min-w-[200px]">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">mark_email_read</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Same-Day TAT</span>
                    <span className="font-caption text-caption text-on-surface-variant">Instant WhatsApp PDF reporting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* SEARCH & FILTER TOOLBAR */}
            <div className="mt-4 flex flex-col gap-4 bg-surface-container-low p-4 lg:p-6 rounded-2xl shadow-sm">
              {/* Search Input Bar */}
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline text-[22px]">
                  search
                </span>
                <input
                  id="test-search-input"
                  className="w-full h-14 pl-12 pr-36 rounded-xl bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                  placeholder="Search by test name, parameter, organ or condition (e.g. HbA1c, Beta HCG, Thyroid, CBC)..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('')
                      const params: Record<string, string> = {}
                      if (activeCategoryFilter) params.category = activeCategoryFilter
                      setSearchParams(params)
                    }}
                    className="absolute right-28 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface p-1 rounded"
                    aria-label="Clear search input"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-5 py-2.5 rounded-lg font-label-md text-label-md font-semibold hover:bg-on-primary-fixed-variant transition-colors"
                >
                  Find Test
                </button>
              </form>

              {/* Filter Pill Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 text-nowrap scrollbar-none">
                <button
                  type="button"
                  onClick={() => handleFilterPillClick('all')}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-semibold transition-colors ${
                    !activeCategoryFilter && !searchQuery
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                  }`}
                >
                  All Tests ({dbTests.length}+)
                </button>

                <button
                  type="button"
                  onClick={() => handleFilterPillClick('sugar', 'sugar-section')}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-medium transition-colors ${
                    activeCategoryFilter === 'sugar'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                  }`}
                >
                  Diabetes &amp; Sugar
                </button>

                <button
                  type="button"
                  onClick={() => handleFilterPillClick('pregnancy', 'pregnancy-section')}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-medium transition-colors ${
                    activeCategoryFilter === 'pregnancy'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                  }`}
                >
                  Pregnancy &amp; Maternal
                </button>

                <button
                  type="button"
                  onClick={() => handleFilterPillClick('thyroid', 'routine-catalog')}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-medium transition-colors ${
                    activeCategoryFilter === 'thyroid'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                  }`}
                >
                  Thyroid &amp; Hormones
                </button>

                <button
                  type="button"
                  onClick={() => handleFilterPillClick('heart', 'routine-catalog')}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-medium transition-colors ${
                    activeCategoryFilter === 'heart'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                  }`}
                >
                  Lipid &amp; Heart
                </button>

                <button
                  type="button"
                  onClick={() => handleFilterPillClick('liver', 'routine-catalog')}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-medium transition-colors ${
                    activeCategoryFilter === 'liver'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                  }`}
                >
                  Liver &amp; Kidney
                </button>

                <button
                  type="button"
                  onClick={() => handleFilterPillClick('vitamins', 'routine-catalog')}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-medium transition-colors ${
                    activeCategoryFilter === 'vitamins'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                  }`}
                >
                  Vitamin &amp; Bone
                </button>

                <button
                  type="button"
                  onClick={() => handleFilterPillClick('blood', 'routine-catalog')}
                  className={`px-4 py-2 rounded-full font-label-sm text-label-sm font-medium transition-colors ${
                    activeCategoryFilter === 'blood'
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface hover:bg-primary-fixed'
                  }`}
                >
                  Complete Hemogram
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* DYNAMIC SEARCH / FILTER RESULTS VIEW (If user searches or filters)*/}
        {/* ================================================================= */}
        {isSearchActive && (
          <section className="w-full py-10 px-4 lg:px-8 bg-surface border-b border-surface-container">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-surface-container">
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold">
                    Search Results
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Showing <span className="font-bold text-primary">{searchResults.length}</span> diagnostic test{searchResults.length !== 1 ? 's' : ''}
                    {searchQuery && <> matching &ldquo;<strong>{searchQuery}</strong>&rdquo;</>}
                    {activeCategoryFilter && <> in <strong>{activeCategoryFilter}</strong></>}
                  </p>
                </div>
                <button
                  onClick={handleClearFilters}
                  className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">clear_all</span>
                  Clear Filters &amp; View All Sections
                </button>
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((test) => {
                    const discount = formatDiscount(test.price, test.mrp)
                    return (
                      <div
                        key={test.id}
                        className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-container hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div className="space-y-4">
                          <div className="flex items-start justify-between gap-2">
                            <span className="bg-primary/10 text-primary font-caption text-caption font-bold px-2.5 py-1 rounded-md">
                              {test.method || test.category?.name || 'Diagnostic Assay'}
                            </span>
                            <span className="inline-flex items-center gap-1 text-secondary font-caption text-caption font-bold">
                              <span className="material-symbols-outlined text-[15px]">timer</span>
                              TAT: {test.report_time}
                            </span>
                          </div>

                          <div>
                            <Link to={`/tests/${test.slug}`} className="hover:text-primary transition-colors">
                              <h3 className="font-headline-md text-headline-md text-on-surface font-bold line-clamp-2">
                                {test.name}
                              </h3>
                            </Link>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                              {test.short_description}
                            </p>
                          </div>

                          {test.specimen && (
                            <div className="flex items-center gap-2 font-caption text-caption text-on-surface bg-surface-container px-3 py-1.5 rounded-lg">
                              <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                              <span className="truncate">{test.specimen}</span>
                            </div>
                          )}

                          {test.highlight && (
                            <div className="flex items-center gap-1.5 font-caption text-caption text-on-surface-variant">
                              <span className="material-symbols-outlined text-[14px] text-secondary">check</span>
                              <span className="truncate">{test.highlight}</span>
                            </div>
                          )}
                        </div>

                        <div className="pt-6 mt-4 flex items-center justify-between gap-3 border-t border-surface-container/60">
                          <div className="flex flex-col">
                            <span className="font-caption text-caption text-outline line-through">
                              {formatPrice(test.mrp)} {discount > 0 && `(${discount}% OFF)`}
                            </span>
                            <span className="font-headline-xl text-headline-xl font-extrabold text-primary">
                              {formatPrice(test.price)}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Link
                              to={`/tests/${test.slug}`}
                              className="px-3 py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-label-sm text-label-sm font-semibold transition-colors"
                            >
                              Details
                            </Link>
                            <Link
                              to={`/book-home-collection?test=${encodeURIComponent(test.name)}`}
                              className="bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors px-4 py-2 rounded-lg font-label-sm text-label-sm font-semibold shadow-sm inline-flex items-center gap-1.5"
                            >
                              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                              <span>Book Test</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-surface-container-lowest rounded-2xl p-8 shadow-sm">
                  <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface mt-4 font-bold">
                    No Diagnostic Tests Found
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
                    We couldn&rsquo;t find tests matching your query. Try searching for broader terms like &ldquo;CBC&rdquo;, &ldquo;Thyroid&rdquo;, &ldquo;Sugar&rdquo;, or &ldquo;Blood&rdquo;.
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-6 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-on-primary-fixed-variant transition-colors shadow-sm"
                  >
                    Reset Search &amp; View All Tests
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* SECTION 1: PROMOTIONAL SPOTLIGHT BANNERS (Sugar & Pregnancy)      */}
        {/* ================================================================= */}
        <section className="w-full py-8 px-4 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Banner A: Diabetes & Blood Sugar Monitoring */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-container to-primary text-on-primary p-6 lg:p-8 flex flex-col justify-between shadow-md">
              <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-secondary/15 pointer-events-none blur-2xl"></div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-secondary px-3 py-1 rounded-full font-label-sm text-label-sm text-on-secondary font-bold tracking-wide uppercase">
                    <span className="material-symbols-outlined text-[15px]">bloodtype</span>
                    Fast Glycemic Screen
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-secondary-fixed">
                    Starting at ₹120
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-headline-xl text-headline-xl font-bold leading-snug">
                    Beat Diabetes Early — Precision Glycemic Profiling
                  </h3>
                  <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                    Gold-standard HPLC HbA1c with estimated average glucose (eAG) and microalbumin screening. 60-min doorstep fasting slots.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md font-caption text-caption font-semibold backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">bolt</span>
                    Same-Day Reports (6 Hrs)
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md font-caption text-caption font-semibold backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">home</span>
                    Fasting Home Collection at 6:30 AM
                  </span>
                </div>
              </div>
              <div className="relative z-10 pt-6 mt-2 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="#sugar-section"
                  className="inline-flex items-center gap-2 bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all px-5 py-3 rounded-lg font-label-md text-label-md font-bold shadow-md"
                >
                  <span>Explore Sugar Tests</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
                <a
                  className="text-on-primary hover:text-secondary-fixed flex items-center gap-1.5 font-label-sm text-label-sm font-semibold transition-colors"
                  href={`tel:${SITE_CONFIG.phone}`}
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>{SITE_CONFIG.phone}</span>
                </a>
              </div>
            </div>

            {/* Banner B: Pregnancy & Maternal Wellness */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-tertiary-container to-tertiary text-on-tertiary p-6 lg:p-8 flex flex-col justify-between shadow-md">
              <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-primary/20 pointer-events-none blur-2xl"></div>
              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full font-label-sm text-label-sm font-bold tracking-wide uppercase">
                    <span className="material-symbols-outlined text-[15px]">pregnant_woman</span>
                    Compassionate Care
                  </span>
                  <span className="font-headline-sm text-headline-sm font-bold text-tertiary-fixed">
                    Starting at ₹220
                  </span>
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-headline-xl text-headline-xl font-bold leading-snug">
                    Maternal Care — Safe, Compassionate Pregnancy Screening
                  </h3>
                  <p className="font-body-md text-body-md text-on-tertiary-container leading-relaxed">
                    Certified Beta-HCG, Double Marker, Triple Marker, Gestational Diabetes, and prenatal routine profiles by trained female phlebotomists.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md font-caption text-caption font-semibold backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">support_agent</span>
                    Gentle Phlebotomist on Request
                  </span>
                  <span className="inline-flex items-center gap-1 bg-white/10 px-3 py-1 rounded-md font-caption text-caption font-semibold backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[14px]">lock</span>
                    Confidential Digital Delivery
                  </span>
                </div>
              </div>
              <div className="relative z-10 pt-6 mt-2 flex flex-wrap items-center justify-between gap-4">
                <a
                  href="#pregnancy-section"
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-surface-container-high transition-all px-5 py-3 rounded-lg font-label-md text-label-md font-bold shadow-md"
                >
                  <span>Explore Pregnancy Tests</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_downward</span>
                </a>
                <span className="text-on-tertiary-container font-caption text-caption flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  Trimester Specific
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 2: DEDICATED SUGAR & DIABETES TESTS SECTION              */}
        {/* ================================================================= */}
        <section className="w-full py-12 px-4 lg:px-8 bg-surface-container-low" id="sugar-section">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 bg-secondary/15 text-secondary font-label-sm text-label-sm px-3 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[15px]">vital_signs</span>
                  <span>GLYCEMIC CONTROL &amp; DIABETIC MONITORING</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                  Diabetes &amp; Blood Sugar Diagnostic Tests
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Clinically validated assays to detect prediabetes, monitor long-term glycemic control, and prevent renal &amp; vascular complications.
                </p>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant font-caption text-caption">
                <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                <span>Dual-run Hexokinase &amp; HPLC Certified</span>
              </div>
            </div>

            {/* Sugar Tests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sugarTests.slice(0, 6).map((test) => {
                const discount = formatDiscount(test.price, test.mrp)
                return (
                  <div
                    key={test.id}
                    className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden border border-surface-container/60"
                  >
                    {test.badge && (
                      <div className="absolute top-0 right-0 bg-secondary text-on-secondary font-caption text-caption px-3 py-0.5 rounded-bl-lg font-bold">
                        {test.badge}
                      </div>
                    )}
                    <div className="space-y-4 pt-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="bg-tertiary-fixed text-on-tertiary-fixed font-caption text-caption font-semibold px-2.5 py-1 rounded-md">
                          {test.method || 'HPLC Method'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-secondary font-caption text-caption font-bold">
                          <span className="material-symbols-outlined text-[15px]">timer</span>
                          TAT: {test.report_time}
                        </span>
                      </div>

                      <div>
                        <Link to={`/tests/${test.slug}`} className="hover:text-primary transition-colors">
                          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                            {test.name}
                          </h3>
                        </Link>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          {test.short_description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {test.specimen && (
                          <div className="flex items-center gap-2 font-caption text-caption text-on-surface bg-surface-container px-3 py-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                            <span className="truncate">{test.specimen}</span>
                          </div>
                        )}
                        {test.highlight && (
                          <div className="flex items-center gap-1.5 font-caption text-caption text-on-surface-variant">
                            <span className="material-symbols-outlined text-[14px] text-secondary">check</span>
                            <span>{test.highlight}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 mt-4 flex items-center justify-between gap-3 border-t border-surface-container/50">
                      <div className="flex flex-col">
                        <span className="font-caption text-caption text-outline line-through">
                          {formatPrice(test.mrp)} {discount > 0 && `(${discount}% OFF)`}
                        </span>
                        <span className="font-headline-xl text-headline-xl font-extrabold text-primary">
                          {formatPrice(test.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/tests/${test.slug}`}
                          className="px-3 py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-label-sm text-label-sm font-semibold transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/book-home-collection?test=${encodeURIComponent(test.name)}`}
                          className="bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors px-4 py-2.5 rounded-lg font-label-md text-label-md font-semibold shadow-sm inline-flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                          <span>Book Test</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: DEDICATED PREGNANCY & MATERNAL CARE TESTS SECTION     */}
        {/* ================================================================= */}
        <section className="w-full py-12 px-4 lg:px-8 bg-surface" id="pregnancy-section">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm px-3 py-0.5 rounded-full font-bold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-[15px]">child_care</span>
                  <span>MATERNAL HEALTH &amp; PRENATAL DIAGNOSTICS</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                  Pregnancy &amp; Antenatal Diagnostic Tests
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Accredited prenatal screening protocols ensuring safety for mother and developing baby at every trimester. Sample pickup by senior phlebotomists.
                </p>
              </div>

              {/* Trust Callout Card */}
              <div className="flex items-center gap-3 bg-secondary/10 text-secondary p-3.5 rounded-xl border border-secondary/20">
                <span className="material-symbols-outlined text-[24px]">female</span>
                <span className="font-label-sm text-label-sm font-semibold max-w-xs">
                  Gentle, experienced female phlebotomists available on request across Kolkata &amp; Barasat.
                </span>
              </div>
            </div>

            {/* Pregnancy Tests Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pregnancyTests.slice(0, 6).map((test) => {
                const discount = formatDiscount(test.price, test.mrp)
                return (
                  <div
                    key={test.id}
                    className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all hover:shadow-md relative overflow-hidden border border-surface-container/60"
                  >
                    {test.badge && (
                      <div className="absolute top-0 right-0 bg-primary text-on-primary font-caption text-caption px-3 py-0.5 rounded-bl-lg font-bold">
                        {test.badge}
                      </div>
                    )}
                    <div className="space-y-4 pt-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="bg-secondary/10 text-secondary font-caption text-caption font-bold px-2.5 py-1 rounded-md">
                          {test.method || 'Prenatal Screen'}
                        </span>
                        <span className="inline-flex items-center gap-1 text-secondary font-caption text-caption font-bold">
                          <span className="material-symbols-outlined text-[15px]">bolt</span>
                          TAT: {test.report_time}
                        </span>
                      </div>

                      <div>
                        <Link to={`/tests/${test.slug}`} className="hover:text-primary transition-colors">
                          <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                            {test.name}
                          </h3>
                        </Link>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          {test.short_description}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {test.specimen && (
                          <div className="flex items-center gap-2 font-caption text-caption text-on-surface bg-surface-container px-3 py-1.5 rounded-lg">
                            <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                            <span className="truncate">{test.specimen}</span>
                          </div>
                        )}
                        {test.highlight && (
                          <div className="flex items-center gap-1.5 font-caption text-caption text-on-surface-variant">
                            <span className="material-symbols-outlined text-[14px] text-secondary">verified</span>
                            <span>{test.highlight}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-6 mt-4 flex items-center justify-between gap-3 border-t border-surface-container/50">
                      <div className="flex flex-col">
                        <span className="font-caption text-caption text-outline line-through">
                          {formatPrice(test.mrp)} {discount > 0 && `(${discount}% OFF)`}
                        </span>
                        <span className="font-headline-xl text-headline-xl font-extrabold text-primary">
                          {formatPrice(test.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/tests/${test.slug}`}
                          className="px-3 py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high font-label-sm text-label-sm font-semibold transition-colors"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/book-home-collection?test=${encodeURIComponent(test.name)}`}
                          className="bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors px-4 py-2.5 rounded-lg font-label-md text-label-md font-semibold shadow-sm inline-flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                          <span>Book Test</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: ALL GENERAL ROUTINE & SPECIALIZED TESTS CATALOG        */}
        {/* ================================================================= */}
        <section className="w-full py-12 px-4 lg:px-8 bg-surface-container-low" id="routine-catalog">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Section Header & Sub-navigation Tabs */}
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-label-sm text-label-sm px-3 py-0.5 rounded-full font-bold uppercase tracking-wide">
                    <span>CORE PATHOLOGY</span>
                  </div>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                    Routine Pathology &amp; Specialty Diagnostic Tests
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Every sample run on dual automated immunoassay and biochemistry analyzers with double pathologist sign-off.
                  </p>
                </div>
              </div>

              {/* Sub-tabs */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-outline-variant/30">
                {ROUTINE_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setRoutineTab(tab.id)}
                    className={`px-4 py-2 font-label-sm text-label-sm font-semibold rounded-lg shrink-0 transition-colors ${
                      routineTab === tab.id
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-primary/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* High-Density Test Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {routineTests.map((test) => {
                return (
                  <div
                    key={test.id}
                    className="bg-surface-container-lowest rounded-xl p-5 shadow-sm flex flex-col justify-between transition-all hover:shadow-md border border-surface-container/60"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="bg-surface-container text-on-surface-variant font-caption text-caption px-2 py-0.5 rounded font-semibold">
                          {test.method || test.category?.name || 'Pathology'}
                        </span>
                        <span className="text-secondary font-caption text-caption font-bold">
                          TAT: {test.report_time}
                        </span>
                      </div>

                      <div>
                        <Link to={`/tests/${test.slug}`} className="hover:text-primary transition-colors">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight line-clamp-2">
                            {test.name}
                          </h3>
                        </Link>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1.5 line-clamp-2">
                          {test.short_description}
                        </p>
                      </div>

                      {test.specimen && (
                        <div className="font-caption text-caption text-outline bg-surface-container-low px-2 py-1 rounded truncate">
                          {test.specimen}
                        </div>
                      )}
                    </div>

                    <div className="pt-5 mt-3 flex items-center justify-between gap-2 border-t border-surface-container/50">
                      <div className="flex flex-col">
                        <span className="font-headline-md text-headline-md font-extrabold text-primary">
                          {formatPrice(test.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Link
                          to={`/tests/${test.slug}`}
                          className="px-2.5 py-1.5 rounded-md bg-surface-container text-primary hover:bg-surface-container-high font-label-sm text-label-sm font-semibold transition-colors"
                          title="View Test Details"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/book-home-collection?test=${encodeURIComponent(test.name)}`}
                          className="bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors px-3 py-1.5 rounded-md font-label-sm text-label-sm font-semibold shadow-sm inline-flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                          <span>Book</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: QUICK HOME COLLECTION BOOKING BAR                     */}
        {/* ================================================================= */}
        <section className="w-full py-8 px-4 lg:px-8 bg-surface">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-2xl p-6 lg:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-md">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-on-secondary shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[32px]">home_health</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-headline-md font-bold leading-tight">
                    Need doorstep collection in Barasat, Salt Lake or Kolkata?
                  </h3>
                  <p className="font-body-md text-body-md text-on-primary-container">
                    Our phlebotomist reaches your location in 60 mins. 100% sterile vacuum tubes, temperature-controlled cold chain dispatch.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0 w-full lg:w-auto">
                <a
                  className="flex-1 lg:flex-none text-center bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors px-6 py-3.5 rounded-xl font-label-md text-label-md font-bold shadow-sm inline-flex items-center justify-center gap-2"
                  href={`tel:${SITE_CONFIG.phone}`}
                >
                  <span className="material-symbols-outlined text-[20px]">call</span>
                  <span>Call: {SITE_CONFIG.phone}</span>
                </a>
                <a
                  className="flex-1 lg:flex-none text-center bg-surface-container-lowest text-primary hover:bg-surface-container-high transition-colors px-6 py-3.5 rounded-xl font-label-md text-label-md font-bold shadow-sm inline-flex items-center justify-center gap-2"
                  href={generateWhatsAppUrl('Hello HealthCure Diagnostics, I would like to book a blood test for home sample collection.')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>WhatsApp Booking</span>
                </a>
                <Link
                  to="/book-home-collection"
                  className="flex-1 lg:flex-none text-center bg-white/15 hover:bg-white/25 text-on-primary transition-colors px-6 py-3.5 rounded-xl font-label-md text-label-md font-bold inline-flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
                  <span>Book Online</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: FREQUENT PATIENT PREPARATION FAQs (Accordion)         */}
        {/* ================================================================= */}
        <section className="w-full py-12 px-4 lg:px-8 bg-surface-container-low border-t border-surface-container">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="bg-secondary/15 text-secondary font-label-sm text-label-sm px-3 py-1 rounded-full font-bold uppercase tracking-wide inline-block">
                Patient Guidelines
              </span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface font-extrabold tracking-tight">
                Frequent Diagnostic Preparation Questions
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
                Proper preparation guarantees peak diagnostic reliability. Review guidelines before your home phlebotomist arrives.
              </p>
            </div>

            {/* FAQ Accordion Items */}
            <div className="space-y-3">
              {/* Question 1 */}
              <details className="group bg-surface-container-lowest rounded-xl p-5 shadow-sm transition-all open:ring-1 open:ring-primary/20">
                <summary className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center justify-between cursor-pointer list-none">
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">help</span>
                    <span>Do all blood sugar tests require overnight fasting?</span>
                  </span>
                  <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="mt-4 pt-3 border-t border-surface-container font-body-md text-body-md text-on-surface-variant leading-relaxed space-y-2">
                  <p>No, each glycemic assay has distinct preparation criteria:</p>
                  <ul className="list-disc list-inside space-y-1 pl-2">
                    <li>
                      <strong>HbA1c (Glycosylated Hemoglobin):</strong> Requires <em>NO fasting</em>. You can take this test any time of the day regardless of meals.
                    </li>
                    <li>
                      <strong>Fasting Blood Sugar (FBS):</strong> Requires strict <em>10 to 12 hours</em> of overnight fasting. Only plain water is permitted.
                    </li>
                    <li>
                      <strong>Post-Prandial (PPBS):</strong> Must be drawn <em>exactly 2 hours</em> after starting your major meal.
                    </li>
                  </ul>
                </div>
              </details>

              {/* Question 2 */}
              <details className="group bg-surface-container-lowest rounded-xl p-5 shadow-sm transition-all open:ring-1 open:ring-primary/20">
                <summary className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center justify-between cursor-pointer list-none">
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">female</span>
                    <span>How should a pregnant patient prepare for home sample collection?</span>
                  </span>
                  <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="mt-4 pt-3 border-t border-surface-container font-body-md text-body-md text-on-surface-variant leading-relaxed space-y-2">
                  <p>
                    For standard Beta-HCG, Dual Marker, and Thyroid panels, no fasting is necessary. Ensure you drink sufficient water so veins are well hydrated. For antenatal fasting panels (ANC profile) or Gestational Diabetes (OGTT), 8 to 10 hours overnight fasting is required. If preferred, please let our coordinator know if you would like a senior female phlebotomist assigned to your home visit.
                  </p>
                </div>
              </details>

              {/* Question 3 */}
              <details className="group bg-surface-container-lowest rounded-xl p-5 shadow-sm transition-all open:ring-1 open:ring-primary/20">
                <summary className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center justify-between cursor-pointer list-none">
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">join_inner</span>
                    <span>Can I book home collection for both sugar and antenatal tests together?</span>
                  </span>
                  <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="mt-4 pt-3 border-t border-surface-container font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  <p>
                    Yes, absolutely. Our phlebotomists carry specialized vacuum vacutainers (Fluoride tubes for glucose, Gel clot tubes for hormones/Beta-HCG, and EDTA tubes for CBC/HbA1c). Multiple family members or multiple test profiles can be collected seamlessly in a single appointment with zero additional collection fees for orders above ₹399.
                  </p>
                </div>
              </details>

              {/* Question 4 */}
              <details className="group bg-surface-container-lowest rounded-xl p-5 shadow-sm transition-all open:ring-1 open:ring-primary/20">
                <summary className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center justify-between cursor-pointer list-none">
                  <span className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary text-[20px]">mark_chat_read</span>
                    <span>How will I receive the verified reports?</span>
                  </span>
                  <span className="material-symbols-outlined text-outline transition-transform duration-300 group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <div className="mt-4 pt-3 border-t border-surface-container font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  <p>
                    As soon as our MD Pathologists review and digitally sign your results, an official password-protected PDF is sent directly to your registered WhatsApp number and email address. Routine tests (such as CBC, Sugar, LFT, KFT, and Beta-HCG) are delivered within 4 to 8 hours on the same day. Physical printed lab copies are also available upon request at our Barasat Jessore Road center.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
