import { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import { TESTS, CATEGORIES } from '../data/mockData'
import TestCard from '../components/TestCard'

export default function AllTestsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '')

  const filteredTests = useMemo(() => {
    let tests = [...TESTS]
    if (activeCategory) {
      tests = tests.filter(t => {
        const cat = CATEGORIES.find(c => c.slug === activeCategory)
        return cat ? t.category_id === cat.id : true
      })
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      tests = tests.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.short_description.toLowerCase().includes(q)
      )
    }
    return tests
  }, [searchQuery, activeCategory])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params: Record<string, string> = {}
    if (searchQuery) params.q = searchQuery
    if (activeCategory) params.category = activeCategory
    setSearchParams(params)
  }

  return (
    <>
      <Helmet>
        <title>All Diagnostic Tests — HealthCure Diagnostics, Kolkata</title>
        <meta name="description" content="Browse all available blood tests, pathology tests, and diagnostic tests with home collection option in Kolkata. Accurate, affordable, fast results." />
      </Helmet>

      {/* Page Header */}
      <div className="bg-primary-container py-space-2xl">
        <div className="section-container">
          <span className="eyebrow text-primary-fixed-dim">Diagnostic Tests</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mt-1">
            All Diagnostic Tests
          </h1>
          <p className="font-body-md text-body-md text-primary-fixed-dim mt-2 max-w-xl">
            Comprehensive pathology and biochemistry tests with home collection across Kolkata.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2 mt-space-lg max-w-md">
            <div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg px-space-sm">
              <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
              <input
                className="bg-transparent flex-1 text-body-md text-on-surface placeholder:text-outline focus:outline-none py-2.5"
                placeholder="Search test name or symptom..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 bg-secondary text-on-secondary rounded-lg font-label-md text-label-md"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="section-container py-space-2xl">
        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2 mb-space-lg">
          <button
            onClick={() => setActiveCategory('')}
            className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${
              !activeCategory ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
            }`}
          >
            All Tests
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(activeCategory === cat.slug ? '' : cat.slug)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-sm text-label-sm transition-colors ${
                activeCategory === cat.slug ? 'bg-primary-container text-on-primary' : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">{cat.icon}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-md">
          Showing {filteredTests.length} test{filteredTests.length !== 1 ? 's' : ''}
          {activeCategory && ` in "${CATEGORIES.find(c => c.slug === activeCategory)?.name || activeCategory}"`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* Tests Grid */}
        {filteredTests.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-md">
            {filteredTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <div className="text-center py-space-3xl">
            <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
            <h3 className="font-headline-md text-headline-md text-on-surface mt-space-md">No tests found</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Try a different search term or browse all categories.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('') }}
              className="mt-space-md btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </>
  )
}
