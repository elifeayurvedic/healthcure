import { Link } from 'react-router-dom'
import { HEALTH_PACKAGES } from '../data/mockData'
import PackageCard from './PackageCard'

export default function HealthPackages() {
  const featuredPackages = HEALTH_PACKAGES.filter(p => p.is_featured)

  return (
    <section id="health-packages" className="w-full py-space-2xl bg-surface-container-low">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="eyebrow">Preventive Wellness</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">
              Popular Health Packages
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-xl">
              Thoughtfully curated multi-parameter packages. More diagnostics at significantly lower cost than individual tests.
            </p>
          </div>
          <Link
            to="/health-packages"
            className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary-container hover:text-primary font-semibold whitespace-nowrap transition-colors"
          >
            Explore All Packages
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {featuredPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  )
}
