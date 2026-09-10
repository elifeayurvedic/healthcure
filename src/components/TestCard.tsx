import { Link } from 'react-router-dom'
import { Test } from '../types'
import { formatPrice, formatDiscount } from '../lib/constants'

interface TestCardProps {
  test: Test
  onBook?: () => void
}

const CATEGORY_COLORS: Record<string, string> = {
  c1: 'bg-error-container/30 text-error',
  c2: 'bg-error-container/40 text-error',
  c3: 'bg-primary-container/10 text-primary',
  c4: 'bg-primary-container/15 text-primary',
  c5: 'bg-tertiary-fixed text-tertiary',
  c6: 'bg-secondary/10 text-secondary',
  c7: 'bg-primary-container/10 text-primary',
  c8: 'bg-secondary-fixed text-on-secondary-fixed',
  c9: 'bg-primary-container/10 text-primary',
  c10: 'bg-error-container/30 text-error',
  c14: 'bg-secondary-fixed text-on-secondary-fixed',
  c15: 'bg-primary-container/10 text-primary',
  c16: 'bg-secondary/10 text-secondary',
}

export default function TestCard({ test, onBook }: TestCardProps) {
  const discount = formatDiscount(test.price, test.mrp)
  const colorClass = CATEGORY_COLORS[test.category_id] || 'bg-surface-container text-on-surface'

  return (
    <div className="card card-hover flex flex-col p-space-md min-w-[220px] max-w-[260px] md:min-w-0 md:max-w-none">
      {/* Category Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-space-sm ${colorClass}`}>
        <span className="material-symbols-outlined text-[24px]">
          {test.category?.icon || 'science'}
        </span>
      </div>

      {/* Test name */}
      <h3 className="font-headline-sm text-headline-sm text-on-surface line-clamp-2 flex-1">{test.name}</h3>
      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">{test.short_description}</p>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 mt-space-sm">
        <span className="flex items-center gap-1 font-caption text-caption text-on-surface-variant">
          <span className="material-symbols-outlined text-[14px] text-secondary">schedule</span>
          {test.report_time}
        </span>
        {test.home_collection_available && (
          <span className="flex items-center gap-1 font-caption text-caption text-secondary font-semibold">
            <span className="material-symbols-outlined text-[14px]">home_health</span>
            Home Pickup
          </span>
        )}
      </div>

      {/* Price + Actions */}
      <div className="mt-space-sm pt-space-sm border-t border-surface-container">
        <div className="flex items-center justify-between mb-space-xs">
          <div>
            <span className="font-headline-xl text-headline-xl font-extrabold text-on-surface">{formatPrice(test.price)}</span>
            <span className="font-body-sm text-body-sm text-outline line-through ml-2">{formatPrice(test.mrp)}</span>
          </div>
          {discount > 0 && (
            <span className="px-2 py-1 rounded bg-secondary/10 text-secondary font-label-sm text-label-sm font-bold">{discount}% OFF</span>
          )}
        </div>
        <div className="flex gap-2">
          <Link
            to={`/tests/${test.slug}`}
            className="flex-1 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container text-primary font-label-md text-label-md text-center transition-colors font-semibold text-sm"
          >
            View Details
          </Link>
          <Link
            to={`/book-home-collection?test=${encodeURIComponent(test.name)}`}
            onClick={onBook}
            className="flex-1 py-2.5 rounded-lg bg-primary-container hover:opacity-90 text-on-primary font-label-md text-label-md text-center transition-all font-semibold text-sm"
          >
            Book Test
          </Link>
        </div>
      </div>
    </div>
  )
}
