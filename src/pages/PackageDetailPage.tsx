import { useParams, Link, Navigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { HEALTH_PACKAGES, PACKAGE_TESTS } from '../data/mockData'
import { formatPrice, formatDiscount, generateWhatsAppUrl } from '../lib/constants'

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const pkg = HEALTH_PACKAGES.find(p => p.slug === slug)
  if (!pkg) return <Navigate to="/health-packages" replace />

  const discount = formatDiscount(pkg.price, pkg.mrp)
  const tests = PACKAGE_TESTS[pkg.id] || []
  const whatsappMsg = `Hello HealthCure Diagnostics, I'd like to book the ${pkg.name} package (₹${pkg.price}). Please confirm home collection slot availability.`

  return (
    <>
      <Helmet>
        <title>{pkg.name} — ₹{pkg.price} ({pkg.parameter_count} Tests) | HealthCure Diagnostics</title>
        <meta name="description" content={`Book ${pkg.name} at ₹${pkg.price} with ${pkg.parameter_count} parameters and home collection in Kolkata. ${pkg.short_description}`} />
      </Helmet>

      <div className="bg-surface-container-low py-space-sm">
        <div className="section-container">
          <div className="flex items-center gap-1 font-caption text-caption text-on-surface-variant">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link to="/health-packages" className="hover:text-primary">Health Packages</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold">{pkg.name}</span>
          </div>
        </div>
      </div>

      <div className="section-container py-space-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          <div className="lg:col-span-8 space-y-space-lg">
            {pkg.is_popular && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-bold">
                ★ Most Popular Package
              </span>
            )}
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">{pkg.name}</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{pkg.short_description}</p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-container/10">
                <span className="material-symbols-outlined text-primary-container text-[18px]">science</span>
                <span className="font-label-md text-label-md text-primary-container font-semibold">{pkg.parameter_count} Parameters</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/10">
                <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Reports in {pkg.report_time}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-container">
                <span className="material-symbols-outlined text-secondary text-[18px]">home_health</span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Home Collection</span>
              </div>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">About This Package</h2>
              {pkg.description.split('\n').map((para, i) =>
                para.trim() ? <p key={i} className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-3">{para.trim()}</p> : null
              )}
            </div>

            {tests.length > 0 && (
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface mb-space-sm">Tests Included</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {tests.map((test, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-surface-container-low rounded-lg">
                      <span className="material-symbols-outlined text-secondary text-[18px]">done_all</span>
                      <span className="font-body-sm text-body-sm text-on-surface">{test}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-4">
            <div className="card p-space-lg sticky top-24">
              <div className="pb-space-sm border-b border-surface-container mb-space-md">
                <span className="font-headline-xl text-headline-xl font-extrabold text-on-surface">{formatPrice(pkg.price)}</span>
                <span className="font-body-sm text-body-sm text-outline line-through ml-2">{formatPrice(pkg.mrp)}</span>
                {discount > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm font-bold">{discount}% OFF</span>
                )}
                <p className="font-caption text-caption text-on-surface-variant mt-1">Includes {pkg.parameter_count} tests</p>
              </div>
              <div className="space-y-3">
                <Link
                  to={`/book-home-collection?package=${encodeURIComponent(pkg.name)}`}
                  className="w-full py-3.5 rounded-lg bg-secondary hover:opacity-90 text-on-secondary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md"
                >
                  <span className="material-symbols-outlined text-[20px]">home_health</span>
                  Book Home Collection
                </Link>
                <a
                  href={generateWhatsAppUrl(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">chat</span>
                  Book via WhatsApp
                </a>
              </div>
              <div className="mt-space-md space-y-2">
                {['All parameters in a single collection', 'Home collection at no extra charge', 'Report on WhatsApp in ' + pkg.report_time].map((p) => (
                  <div key={p} className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{p}</span>
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
