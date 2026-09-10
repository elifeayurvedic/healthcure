import { Link } from 'react-router-dom'
import { TESTS } from '../data/mockData'
import TestCard from './TestCard'

export default function FrequentlyBookedTests() {
  const featuredTests = TESTS.filter(t => t.is_featured)

  return (
    <section id="frequently-booked" className="w-full py-space-2xl bg-surface">
      <div className="section-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="eyebrow">Most Popular</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">
              Frequently Booked Tests
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Your most essential diagnostic tests — ordered, processed, and delivered the same day.
            </p>
          </div>
          <Link
            to="/tests"
            className="inline-flex items-center gap-2 font-label-sm text-label-sm text-primary-container hover:text-primary font-semibold whitespace-nowrap transition-colors"
          >
            View All Tests
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>

        {/* Mobile: horizontal scroll, Desktop: 5-col grid */}
        <div className="flex gap-space-md overflow-x-auto pb-space-sm -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0 no-scrollbar md:grid md:grid-cols-3 lg:grid-cols-5 md:overflow-visible">
          {featuredTests.map((test) => (
            <div key={test.id} className="snap-start md:snap-none shrink-0 md:shrink w-[260px] md:w-auto">
              <TestCard test={test} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
