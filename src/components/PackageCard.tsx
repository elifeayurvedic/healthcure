import { Link } from 'react-router-dom'
import { HealthPackage } from '../types'
import { formatPrice, formatDiscount } from '../lib/constants'
import { PACKAGE_TESTS } from '../data/mockData'

const PACKAGE_ICONS: Record<string, string> = {
  'p1': 'inventory_2',
  'p2': 'health_and_safety',
  'p3': 'elderly',
  'p4': 'cardiology',
}

interface PackageCardProps {
  pkg: HealthPackage
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const discount = formatDiscount(pkg.price, pkg.mrp)
  const tests = PACKAGE_TESTS[pkg.id] || []
  const icon = PACKAGE_ICONS[pkg.id] || 'inventory_2'

  return (
    <div className={`card flex flex-col p-space-lg relative overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 ${pkg.is_popular ? 'ring-2 ring-primary-container' : ''}`}>
      {/* Most Popular Badge */}
      {pkg.is_popular && (
        <div className="absolute top-0 right-0 bg-primary-container text-on-primary font-label-sm text-label-sm px-space-sm py-space-2xs rounded-bl-xl font-bold">
          ★ Most Popular
        </div>
      )}

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center mb-space-sm">
        <span className="material-symbols-outlined text-[26px]">{icon}</span>
      </div>

      {/* Name */}
      <h3 className="font-headline-md text-headline-md text-on-surface">{pkg.name}</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">{pkg.short_description}</p>

      {/* Key stats */}
      <div className="flex items-center gap-space-md mt-space-sm flex-wrap">
        <span className="flex items-center gap-1 font-label-sm text-label-sm font-bold text-primary-container">
          <span className="material-symbols-outlined text-[16px]">science</span>
          {pkg.parameter_count} Tests
        </span>
        <span className="flex items-center gap-1 font-caption text-caption text-on-surface-variant">
          <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span>
          Reports in {pkg.report_time}
        </span>
      </div>

      {/* Included items */}
      {tests.length > 0 && (
        <ul className="mt-space-sm space-y-1.5">
          {tests.slice(0, 4).map((t) => (
            <li key={t} className="flex items-start gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[14px] mt-0.5 shrink-0">done</span>
              <span>{t}</span>
            </li>
          ))}
          {tests.length > 4 && (
            <li className="font-caption text-caption text-on-surface-variant pl-5">
              +{tests.length - 4} more parameters
            </li>
          )}
        </ul>
      )}

      {/* Price + CTA */}
      <div className="mt-space-lg pt-space-sm border-t border-surface-container">
        <div className="flex items-center justify-between mb-space-sm">
          <div>
            <span className="font-headline-xl text-headline-xl font-extrabold text-on-surface">{formatPrice(pkg.price)}</span>
            <span className="font-body-sm text-body-sm text-outline line-through ml-2">{formatPrice(pkg.mrp)}</span>
          </div>
          {discount > 0 && (
            <span className="px-2 py-1 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm font-bold">{discount}% OFF</span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            to={`/health-packages/${pkg.slug}`}
            className="flex-1 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary font-label-md text-label-md text-center transition-colors font-semibold text-sm"
          >
            View Details
          </Link>
          <Link
            to={`/book-home-collection?package=${encodeURIComponent(pkg.name)}`}
            className="flex-1 py-2.5 rounded-lg bg-primary-container hover:opacity-90 text-on-primary font-label-md text-label-md text-center transition-all font-semibold text-sm"
          >
            Book Package
          </Link>
        </div>
      </div>
    </div>
  )
}
