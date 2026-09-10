import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { TESTS } from '../data/mockData'
import { formatPrice, formatDiscount, generateWhatsAppUrl } from '../lib/constants'

export default function TestDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const test = TESTS.find(t => t.slug === slug)

  if (!test) return <Navigate to="/tests" replace />

  const discount = formatDiscount(test.price, test.mrp)
  const whatsappMsg = `Hello HealthCure Diagnostics, I'd like to book the ${test.name} test (₹${test.price}). Please help me with slot availability.`

  return (
    <>
      <Helmet>
        <title>{test.name} — ₹{test.price} | HealthCure Diagnostics, Kolkata</title>
        <meta name="description" content={`Book ${test.name} at ₹${test.price} with home collection in Kolkata. ${test.short_description}`} />
      </Helmet>

      {/* Breadcrumb */}
      <div className="bg-surface-container-low py-space-sm">
        <div className="section-container">
          <div className="flex items-center gap-1 font-caption text-caption text-on-surface-variant">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link to="/tests" className="hover:text-primary">Tests</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">{test.name}</span>
          </div>
        </div>
      </div>

      <div className="section-container py-space-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-space-lg">
            <div>
              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">{test.name}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">{test.short_description}</p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-space-sm">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container-low">
                <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
                <div>
                  <p className="font-caption text-caption text-on-surface-variant">Report Time</p>
                  <p className="font-label-md text-label-md text-on-surface font-semibold">{test.report_time}</p>
                </div>
              </div>
              {test.home_collection_available && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/10">
                  <span className="material-symbols-outlined text-secondary text-[18px]">home_health</span>
                  <div>
                    <p className="font-caption text-caption text-on-surface-variant">Collection</p>
                    <p className="font-label-md text-label-md text-secondary font-semibold">Home Pickup Available</p>
                  </div>
                </div>
              )}
              {test.center_visit_available && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-container/10">
                  <span className="material-symbols-outlined text-primary text-[18px]">corporate_fare</span>
                  <div>
                    <p className="font-caption text-caption text-on-surface-variant">Collection</p>
                    <p className="font-label-md text-label-md text-primary font-semibold">Center Visit Available</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm max-w-none">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">About This Test</h2>
              {test.description.split('\n').map((para, i) => (
                para.trim() && (
                  <p key={i} className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-3">{para.trim()}</p>
                )
              ))}
            </div>

            {/* Preparation */}
            {test.preparation && (
              <div className="p-space-lg bg-surface-container-low rounded-2xl border-l-4 border-secondary">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[20px]">restaurant</span>
                  Test Preparation
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">{test.preparation}</p>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="card p-space-lg sticky top-24">
              <div className="pb-space-sm border-b border-surface-container mb-space-md">
                <span className="font-headline-xl text-headline-xl font-extrabold text-on-surface">{formatPrice(test.price)}</span>
                <span className="font-body-sm text-body-sm text-outline line-through ml-2">{formatPrice(test.mrp)}</span>
                {discount > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm font-bold">{discount}% OFF</span>
                )}
              </div>

              <div className="space-y-3">
                <Link
                  to={`/book-home-collection?test=${encodeURIComponent(test.name)}`}
                  className="w-full py-3.5 rounded-lg bg-secondary hover:opacity-90 text-on-secondary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">home_health</span>
                  Book Home Collection
                </Link>
                <Link
                  to={`/book-home-collection?test=${encodeURIComponent(test.name)}&type=center`}
                  className="w-full py-3 rounded-lg border-2 border-primary-container text-primary-container font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-primary-container/5 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
                  Visit Our Center
                </Link>
                <a
                  href={generateWhatsAppUrl(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">chat</span>
                  WhatsApp Us
                </a>
              </div>

              {/* Trust points */}
              <div className="mt-space-md space-y-2">
                {['Report on WhatsApp in 6–12 Hours', 'Single-use sterile equipment', 'MD Pathologist verified results', 'Pay Cash or UPI on collection'].map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
