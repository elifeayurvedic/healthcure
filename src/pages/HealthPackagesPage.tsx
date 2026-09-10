import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HEALTH_PACKAGES } from '../data/mockData'
import { formatPrice, formatDiscount, generateWhatsAppUrl, SITE_CONFIG } from '../lib/constants'

// ─── Category filter definitions ────────────────────────────────────────────
const CATEGORIES = [
  'All Packages',
  'Full Body Checkups',
  'Senior Citizen Care',
  'Diabetes & Heart',
  "Women's Wellness",
  "Men's Vitality",
]

// ─── Trust pillars (hero section) ───────────────────────────────────────────
const TRUST_PILLARS = [
  { icon: 'biotech', title: 'NABL Bi-Level QC', sub: 'Multi-level calibration' },
  { icon: 'ac_unit', title: 'Barcoded Cold-Chain', sub: 'Zero sample degradation' },
  { icon: 'send_to_mobile', title: 'Same-Day WhatsApp', sub: 'Smart PDF in 8-12 hrs' },
  { icon: 'currency_rupee', title: 'Zero Phlebotomy Fee', sub: 'Transparent package rates' },
]

// ─── FAQ data ────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How do I prepare for a fasting health package?',
    a: 'A fasting period of 10–12 hours overnight is recommended before blood drawing. You may drink plain water in normal quantities, but please avoid morning tea, coffee, milk, breakfast, or nicotine. Essential morning heart or hypertension medications may be taken with water unless instructed otherwise by your treating physician.',
  },
  {
    q: 'Is home collection completely free for all packages?',
    a: 'Yes! All HealthCure checkup packages (starting from ₹699) include 100% complimentary doorstep phlebotomy across Barasat, Jessore Road, Dum Dum, Lake Town, Salt Lake, New Town, and Greater Kolkata. There are zero equipment or travel convenience charges.',
  },
  {
    q: 'Can two or more family members book at the same time?',
    a: 'Absolutely. You can mention multiple patients during checkout or when talking to our booking assistant. The phlebotomist brings distinct, separately sealed sterile kits with individualized primary barcode identifiers for each person, preventing any mix-up.',
  },
  {
    q: 'When and how will I receive my certified reports?',
    a: 'Reports are released within 8 to 12 hours of sample intake. You will receive an encrypted PDF directly on your WhatsApp number and via an SMS download link. You can also collect hard copies from our Jessore Road Barasat diagnostic centre free of charge.',
  },
]

// ─── Flagship packages (first 4) vs Specialized (last 3) ───────────────────
const flagship = HEALTH_PACKAGES.filter(p => p.is_featured)
const specialized = HEALTH_PACKAGES.filter(p => !p.is_featured)

// ─── Component ───────────────────────────────────────────────────────────────
export default function HealthPackagesPage() {
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState('All Packages')
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // Quick booking form state
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    selectedPackage: `${HEALTH_PACKAGES[0].name} (${HEALTH_PACKAGES[0].parameter_count} Tests) — ${formatPrice(HEALTH_PACKAGES[0].price)}`,
    slot: 'Tomorrow: 6:30 AM – 7:30 AM (Fasting Ideal)',
    address: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [formError, setFormError] = useState('')

  // Filtered packages for "all" view
  const filteredPackages = useMemo(() => {
    if (activeCategory === 'All Packages') return HEALTH_PACKAGES
    return HEALTH_PACKAGES.filter(p => p.category === activeCategory)
  }, [activeCategory])

  const discountPct = (p: typeof HEALTH_PACKAGES[0]) => formatDiscount(p.price, p.mrp)

  const handleBookNow = (slug: string) => {
    navigate(`/book-home-collection?package=${slug}`)
  }

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name.trim()) { setFormError('Please enter patient name'); return }
    if (!/^\d{10}$/.test(form.mobile.replace(/\s/g, ''))) { setFormError('Enter valid 10-digit mobile number'); return }
    if (!form.address.trim()) { setFormError('Please enter pickup address'); return }
    setFormError('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 7000)
  }

  return (
    <>
      <Helmet>
        <title>Health Packages | HEALTHCURE DIAGNOSTICS — Kolkata</title>
        <meta name="description" content="Doctor-curated full body checkup packages with free home collection in Kolkata. Basic ₹699 → Senior ₹1,899. 36–75 parameters. NABL-aligned lab, MD-verified reports in 8–12 hrs." />
        <meta property="og:title" content="Health Packages — HealthCure Diagnostics" />
        <meta property="og:description" content="Full body health checkup packages starting at ₹699. Free home collection across Kolkata & Barasat." />
        <link rel="canonical" href="https://healthcurediagnostics.in/health-packages" />
      </Helmet>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 1 · HERO — Breadcrumb + Headline + Trust + Filters
      ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-gradient-to-b from-surface-container-high/60 via-surface to-surface pb-space-2xl">
        <div className="section-container pt-space-md">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1 font-caption text-caption text-on-surface-variant mb-space-sm">
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">home</span> Home
            </Link>
            <span className="text-outline-variant mx-1">/</span>
            <span className="text-primary font-label-sm">Health Packages</span>
          </nav>

          {/* Headline row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            <div className="lg:col-span-8 space-y-space-xs">
              <div className="inline-flex items-center gap-1 px-space-sm py-1 bg-secondary/10 rounded-full text-secondary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                NABL Aligned Protocol • Barcode-Tracked Cold Chain
              </div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight leading-tight">
                Comprehensive Preventive{' '}
                <br className="hidden sm:inline" />
                <span className="text-primary-container">Health Packages</span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Doctor-curated full body checkups with free certified phlebotomist home sample collection across Kolkata &amp; Barasat within 60 mins.
              </p>
            </div>

            {/* Live availability mini-card */}
            <div className="lg:col-span-4 bg-surface-container-lowest shadow-md rounded-xl p-space-md space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping inline-block"></span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Phlebotomists On Route</span>
                </div>
                <span className="font-caption text-caption text-outline">Live Availability</span>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface font-semibold">60-Min Doorstep Slot</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Barasat, Salt Lake, New Town, Jessore Rd &amp; Greater Kolkata</p>
              <div className="pt-space-xs flex items-center justify-between font-caption text-caption text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-secondary">check_circle</span>
                  100% Sterile Kit
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-primary-container">schedule</span>
                  6:30 AM First Slot
                </span>
              </div>
            </div>
          </div>

          {/* 4-pillar trust strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm mt-space-xl">
            {TRUST_PILLARS.map(p => (
              <div key={p.title} className="bg-surface-container-lowest shadow-sm rounded-lg p-space-sm flex items-start gap-space-xs">
                <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary-container shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{p.icon}</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-label-md text-label-md text-on-surface font-semibold">{p.title}</h4>
                  <p className="font-caption text-caption text-on-surface-variant">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Category filter pills */}
          <div className="flex items-center gap-space-xs overflow-x-auto py-space-sm mt-space-lg no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-space-md py-space-xs rounded-full font-label-md text-label-md whitespace-nowrap transition-all shadow-sm ${
                  activeCategory === cat
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:text-primary-container hover:bg-surface-container-high'
                }`}
              >
                {cat}{cat === 'All Packages' ? ` (${HEALTH_PACKAGES.length})` : ''}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 2 · FLAGSHIP 4-COL COMPARISON CARDS
      ═══════════════════════════════════════════════════════════════ */}
      {(activeCategory === 'All Packages' || ['Full Body Checkups', 'Senior Citizen Care', 'Diabetes & Heart'].includes(activeCategory)) && (
        <section className="w-full section-container -mt-6">
          <div className="flex items-center justify-between mb-space-md">
            <div>
              <span className="font-caption text-caption text-primary-container uppercase font-bold tracking-wider">Flagship Offerings</span>
              <h2 className="font-headline-xl text-headline-xl text-on-surface">Most Recommended Checkup Packages</h2>
            </div>
            <div className="hidden md:flex items-center gap-space-xs font-caption text-caption text-on-surface-variant bg-surface-container-low px-space-sm py-1 rounded-full">
              <span className="material-symbols-outlined text-[15px] text-secondary">bolt</span>
              Free Fasting Blood Glucose Check during collection
            </div>
          </div>

          {/* 4 comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md items-stretch">
            {flagship
              .filter(p => activeCategory === 'All Packages' || p.category === activeCategory)
              .map(pkg => {
                const isHero = pkg.is_popular
                const disc = discountPct(pkg)
                return (
                  <div
                    key={pkg.id}
                    className={`bg-surface-container-lowest rounded-xl p-space-md flex flex-col justify-between relative transition-all ${
                      isHero
                        ? 'shadow-xl lg:-translate-y-2 bg-gradient-to-b from-surface-container-low/40 via-surface-container-lowest to-surface-container-lowest'
                        : 'shadow-md hover:shadow-lg'
                    }`}
                  >
                    {isHero && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-secondary text-on-secondary font-label-sm text-label-sm px-3 py-1 rounded-full shadow-md whitespace-nowrap">
                        <span className="material-symbols-outlined text-[14px]">workspace_premium</span>
                        Most Popular
                      </div>
                    )}

                    <div>
                      {/* Badge row */}
                      <div className={`flex items-center justify-between ${isHero ? 'mt-3' : ''} mb-space-xs`}>
                        <span className={`px-2.5 py-0.5 rounded-full font-caption text-caption font-semibold ${
                          isHero ? 'bg-secondary/15 text-secondary font-bold' : 'bg-surface-container text-on-surface-variant'
                        }`}>
                          {pkg.parameter_count} Parameters
                        </span>
                        <span className={`font-caption text-caption ${isHero ? 'text-secondary font-medium' : 'text-outline'}`}>
                          {isHero ? 'Free Doctor Consult' : `Turnaround ${pkg.report_time}`}
                        </span>
                      </div>

                      {/* Title + desc */}
                      <h3 className={`font-headline-md text-headline-md text-on-surface leading-snug ${isHero ? 'font-bold' : 'font-semibold'}`}>
                        {pkg.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-space-sm">{pkg.short_description}</p>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2 mb-space-sm">
                        <span className={`font-headline-xl text-headline-xl font-bold ${isHero ? 'text-secondary' : 'text-primary-container'}`}>
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="font-caption text-caption text-outline line-through">{formatPrice(pkg.mrp)}</span>
                        <span className="font-caption text-caption text-secondary font-bold bg-secondary/10 px-1.5 py-0.5 rounded">
                          {disc}% OFF
                        </span>
                      </div>

                      {/* Highlights */}
                      <div className="space-y-space-xs pt-space-xs border-t border-surface-container">
                        <p className="font-label-sm text-label-sm text-on-surface font-semibold">
                          {isHero ? 'Includes Everything in Basic +' : pkg.id === 'p3' ? 'Geriatric-Specific Focus:' : pkg.id === 'p4' ? 'Specialized Diagnostics:' : 'What is Covered:'}
                        </p>
                        <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface-variant">
                          {(pkg.key_highlights ?? []).map(item => (
                            <li key={item} className="flex items-start gap-1.5">
                              <span className="material-symbols-outlined text-secondary text-[16px] shrink-0 mt-0.5">check_circle</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Prep note */}
                      {pkg.preparation_note && (
                        <div className={`mt-space-md p-space-xs rounded-lg font-caption text-caption flex items-center gap-1.5 ${
                          isHero ? 'bg-secondary/10 text-secondary' : 'bg-surface-container-low text-on-surface-variant'
                        }`}>
                          <span className="material-symbols-outlined text-[15px]">
                            {isHero ? 'medical_services' : 'water_drop'}
                          </span>
                          <span>{isHero ? 'Includes 15-Min Physician Video Review' : pkg.preparation_note}</span>
                        </div>
                      )}
                    </div>

                    {/* CTAs */}
                    <div className="pt-space-md space-y-space-xs">
                      <button
                        onClick={() => handleBookNow(pkg.slug)}
                        className={`w-full flex items-center justify-center gap-1.5 py-2.5 px-space-sm rounded-md font-label-md text-label-md transition-colors shadow-sm ${
                          isHero
                            ? 'bg-secondary hover:bg-on-secondary-container text-on-secondary font-semibold shadow-md py-3'
                            : 'bg-primary-container hover:opacity-90 text-on-primary'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{isHero ? 'bolt' : 'home_health'}</span>
                        {isHero ? 'Book Instant Collection' : 'Book Home Pickup'}
                      </button>
                      <Link
                        to={`/health-packages/${pkg.slug}`}
                        className="w-full py-1.5 text-center font-caption text-caption hover:underline block"
                        style={{ color: isHero ? '#006c4e' : '#25559d' }}
                      >
                        View All {pkg.parameter_count} Parameters →
                      </Link>
                    </div>
                  </div>
                )
              })}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 3 · SPECIALIZED 3-COL PACKAGES
      ═══════════════════════════════════════════════════════════════ */}
      {(activeCategory === 'All Packages' || ["Women's Wellness", "Men's Vitality"].includes(activeCategory)) && (
        <section className="w-full bg-surface-container-low/70 py-space-2xl mt-space-xl">
          <div className="section-container">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
              <div>
                <span className="font-caption text-caption text-primary-container uppercase font-bold tracking-wider">Targeted Clinical Panels</span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">Specialized Preventive Packages</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Focus-specific evaluations curated for women's hormonal balance, men's prostate health, and cardiovascular risk.
                </p>
              </div>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-space-xs font-label-md text-label-md text-primary-container hover:underline self-start shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                Need custom tests? Call {SITE_CONFIG.phone}
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {specialized
                .filter(p => activeCategory === 'All Packages' || p.category === activeCategory)
                .map(pkg => {
                  const disc = discountPct(pkg)
                  return (
                    <div key={pkg.id} className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg flex flex-col justify-between hover:shadow-lg transition-all">
                      <div>
                        {/* Icon */}
                        <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container mb-space-md">
                          <span className="material-symbols-outlined text-[26px]">{pkg.icon ?? 'inventory_2'}</span>
                        </div>

                        {/* Badge row */}
                        <div className="flex items-center justify-between mb-1">
                          <span className="px-2 py-0.5 rounded font-caption text-caption bg-surface-container text-primary-container font-semibold">
                            {pkg.parameter_count} Parameters
                          </span>
                          <span className="font-caption text-caption text-secondary font-medium">Results in {pkg.report_time}</span>
                        </div>

                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">{pkg.name}</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 mb-space-md">{pkg.short_description}</p>

                        {/* Key highlights */}
                        <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant border-t border-surface-container pt-space-sm mb-space-md">
                          {(pkg.key_highlights ?? []).map(item => (
                            <li key={item} className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-secondary text-[16px] shrink-0">check</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer: price + CTA */}
                      <div className="pt-space-md border-t border-surface-container flex items-center justify-between">
                        <div>
                          <span className="font-caption text-caption text-outline line-through">{formatPrice(pkg.mrp)}</span>
                          <p className="font-headline-md text-headline-md text-primary-container font-bold">{formatPrice(pkg.price)}</p>
                          <span className="font-caption text-caption text-secondary font-bold">{disc}% OFF</span>
                        </div>
                        <button
                          onClick={() => handleBookNow(pkg.slug)}
                          className="py-2 px-space-md bg-primary-container hover:opacity-90 text-on-primary font-label-md text-label-md rounded-md shadow-sm transition-all"
                        >
                          Book Home Pickup
                        </button>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </section>
      )}

      {/* Empty state when filtered category has no packages */}
      {filteredPackages.length === 0 && (
        <div className="section-container py-space-3xl text-center">
          <span className="material-symbols-outlined text-[48px] text-outline">inventory_2</span>
          <h2 className="font-headline-md text-headline-md text-on-surface mt-4">No packages in this category yet</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">Please call us or WhatsApp — we can create custom panels for your needs.</p>
          <div className="flex justify-center gap-3 mt-space-md">
            <a href={`tel:${SITE_CONFIG.phone}`} className="btn-primary">Call {SITE_CONFIG.phone}</a>
            <a href={generateWhatsAppUrl('Hello HealthCure, I need a custom health package')} target="_blank" rel="noopener noreferrer" className="btn-secondary">WhatsApp</a>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 4 · HOW HOME COLLECTION WORKS (3-STEP)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-space-3xl section-container">
        <div className="text-center max-w-2xl mx-auto mb-space-2xl">
          <span className="font-caption text-caption text-secondary uppercase font-bold tracking-wider">Frictionless Experience</span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">How Home Sample Collection Works</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Safe, accredited, and hygienic diagnostics brought right to your living room in three steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-6 left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-0.5 bg-surface-container-high -z-0" />

          {[
            {
              num: 1,
              color: 'bg-primary-container text-on-primary',
              title: 'Select Package & Time Slot',
              body: `Choose your package online or WhatsApp us at ${SITE_CONFIG.phone}. Select a convenient morning slot between 6:30 AM and 11:30 AM.`,
              note: 'Immediate WhatsApp confirmation',
              icon: 'schedule',
            },
            {
              num: 2,
              color: 'bg-secondary text-on-secondary',
              title: 'Certified Phlebotomist Visit',
              body: 'Our certified technician arrives with single-use BD Vacutainer® needles and vacuum tubes. Samples are barcoded instantly and stored in a cold-chain container.',
              note: '100% Sterile & painless draw',
              icon: 'verified_user',
            },
            {
              num: 3,
              color: 'bg-primary-container text-on-primary',
              title: 'Verified MD Report in 8–12 Hrs',
              body: 'Automated bi-level quality test in our central lab, verified by Senior MD Pathologists. Receive your encrypted PDF directly on WhatsApp and SMS.',
              note: 'Digital copy + free doctor review',
              icon: 'chat',
            },
          ].map(step => (
            <div key={step.num} className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-sm relative z-10">
              <div className={`w-12 h-12 rounded-full ${step.color} font-bold font-headline-md text-headline-md flex items-center justify-center`}>
                {step.num}
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">{step.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{step.body}</p>
              <div className="flex items-center gap-1.5 font-caption text-caption text-secondary font-medium">
                <span className="material-symbols-outlined text-[16px]">{step.icon}</span>
                {step.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 5 · QUICK BOOKING FORM + LAB HIGHLIGHTS SIDEBAR
      ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full bg-surface-container py-space-2xl" id="booking-form">
        <div className="section-container">
          <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-space-xl grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">

            {/* Left: form */}
            <div className="lg:col-span-7 space-y-space-md">
              <div>
                <span className="font-caption text-caption text-secondary uppercase font-bold tracking-wider">Fast Booking Dispatch</span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">Schedule Your Home Collection Slot</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Fill in basic details. Our Kolkata &amp; Barasat phlebotomy desk will confirm your slot within 10 minutes.
                </p>
              </div>

              <form onSubmit={handleQuickSubmit} className="space-y-space-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="block font-caption text-caption text-on-surface-variant uppercase font-semibold mb-1">Patient Full Name</label>
                    <input
                      className="form-input"
                      placeholder="e.g. Sourav Mukherjee"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block font-caption text-caption text-on-surface-variant uppercase font-semibold mb-1">WhatsApp Mobile Number</label>
                    <input
                      className="form-input"
                      placeholder="10-digit mobile number"
                      type="tel"
                      value={form.mobile}
                      onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                  <div>
                    <label className="block font-caption text-caption text-on-surface-variant uppercase font-semibold mb-1">Select Package</label>
                    <select
                      className="form-input"
                      value={form.selectedPackage}
                      onChange={e => setForm(f => ({ ...f, selectedPackage: e.target.value }))}
                    >
                      {HEALTH_PACKAGES.map(p => (
                        <option key={p.id} value={`${p.name} (${p.parameter_count} Tests) — ${formatPrice(p.price)}`}>
                          {p.name} ({p.parameter_count} Tests) — {formatPrice(p.price)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-caption text-caption text-on-surface-variant uppercase font-semibold mb-1">Preferred Time Slot</label>
                    <select
                      className="form-input"
                      value={form.slot}
                      onChange={e => setForm(f => ({ ...f, slot: e.target.value }))}
                    >
                      {['Tomorrow: 6:30 AM – 7:30 AM (Fasting Ideal)', 'Tomorrow: 7:30 AM – 8:30 AM (Fasting Ideal)', 'Tomorrow: 8:30 AM – 9:30 AM', 'Tomorrow: 9:30 AM – 10:30 AM', 'Today: Immediate Within 60 Mins'].map(s => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-caption text-caption text-on-surface-variant uppercase font-semibold mb-1">Pickup Address (Kolkata / Barasat area)</label>
                  <input
                    className="form-input"
                    placeholder="Flat/House No., Street, Landmark, Pin code"
                    value={form.address}
                    onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
                  />
                </div>

                {formError && (
                  <p className="font-caption text-caption text-error font-semibold">{formError}</p>
                )}

                <div className="pt-space-xs flex flex-col sm:flex-row items-stretch gap-space-sm">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-space-md bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">calendar_today</span>
                    Confirm Doorstep Booking
                  </button>
                  <a
                    href={generateWhatsAppUrl(`Hello HealthCure, I want to book: ${form.selectedPackage}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-space-md bg-surface-container-high hover:bg-surface-container text-primary-container font-label-md text-label-md font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    Book on WhatsApp
                  </a>
                </div>

                {submitted && (
                  <div className="p-space-sm rounded-lg bg-secondary/15 text-secondary font-label-md text-label-md flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                    Thank you! Your pickup request has been logged. Our dispatch phlebotomist will call you shortly.
                  </div>
                )}
              </form>
            </div>

            {/* Right: lab highlights */}
            <div className="lg:col-span-5 bg-surface-container-low rounded-xl p-space-lg space-y-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary">
                  <span className="material-symbols-outlined text-[24px]">verified</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface">HealthCure Central Lab</h4>
                  <p className="font-caption text-caption text-on-surface-variant">Jessore Rd, Barasat • ISO 9001:2015</p>
                </div>
              </div>

              <div className="space-y-space-xs font-body-sm text-body-sm text-on-surface-variant">
                {[
                  { strong: 'Free Cancellation:', text: 'Reschedule or cancel anytime prior to phlebotomist departure.' },
                  { strong: 'No Home Visiting Fee:', text: 'Doorstep collection is 100% free across entire Kolkata & Barasat.' },
                  { strong: 'Multiple Family Members:', text: 'Add spouse or parents with dedicated sterile vials and split bills.' },
                ].map(item => (
                  <div key={item.strong} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">check_circle</span>
                    <span><strong>{item.strong}</strong> {item.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm">
                <p className="font-caption text-caption text-outline uppercase tracking-wider font-semibold">Doctor On Call</p>
                <p className="font-label-md text-label-md text-on-surface mt-0.5">
                  Free 1-on-1 report explanation with our Medical Director if any parameter is critical.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 6 · FAQ ACCORDION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="w-full max-w-5xl mx-auto px-4 md:px-8 lg:px-12 py-space-3xl">
        <div className="text-center max-w-xl mx-auto mb-space-xl">
          <span className="font-caption text-caption text-primary-container uppercase font-bold tracking-wider">Patient Guidance</span>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-1">Frequently Asked Questions</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Guidelines to ensure exact diagnostic accuracy for fasting and home collection.
          </p>
        </div>

        <div className="space-y-space-sm">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all">
              <button
                className="w-full flex items-center justify-between p-space-md text-left font-headline-sm text-headline-sm text-on-surface hover:text-primary-container focus:outline-none"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
              >
                <span>{faq.q}</span>
                <span className={`material-symbols-outlined text-[20px] shrink-0 ml-4 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>
              {openFaq === i && (
                <div className="px-space-md pb-space-md pt-1 font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SECTION 7 · STICKY CONSULTATION STRIP (desktop)
      ═══════════════════════════════════════════════════════════════ */}
      <div className="hidden xl:block sticky bottom-0 left-0 right-0 z-40 bg-inverse-surface text-inverse-on-surface shadow-2xl py-space-sm px-margin-desktop">
        <div className="max-w-content mx-auto flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-on-secondary shrink-0">
              <span className="material-symbols-outlined text-[20px]">medical_services</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm font-semibold">Unsure which checkup suits your health history?</p>
              <p className="font-caption text-caption text-primary-fixed-dim">Speak directly to our Chief Medical Counselor • Free guidance</p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="flex items-center justify-center gap-1.5 px-space-md py-2 rounded-md bg-surface-container-lowest text-primary-container hover:bg-surface-container-high transition-colors font-label-md text-label-md font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              {SITE_CONFIG.phone}
            </a>
            <a
              href={generateWhatsAppUrl('Hello HealthCure, help me choose a health package')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-space-md py-2 rounded-md bg-secondary hover:bg-on-secondary-container text-on-secondary transition-colors font-label-md text-label-md font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              WhatsApp Advice
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
