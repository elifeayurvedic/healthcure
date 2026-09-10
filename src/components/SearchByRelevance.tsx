import { CATEGORIES } from '../data/mockData'

const CATEGORY_COLORS: Record<string, string> = {
  'blood': 'bg-error-container/30 text-error',
  'heart': 'bg-error-container/40 text-error',
  'lungs': 'bg-primary-container/10 text-primary',
  'brain': 'bg-primary-container/15 text-primary',
  'bones': 'bg-tertiary-fixed text-tertiary',
  'thyroid': 'bg-secondary/10 text-secondary',
  'kidney': 'bg-primary-container/10 text-primary',
  'liver': 'bg-secondary-fixed text-on-secondary-fixed',
  'hormones': 'bg-primary-container/10 text-primary',
  'infection': 'bg-error-container/30 text-error',
  'mens-care': 'bg-primary-container/10 text-primary',
  'womens-health': 'bg-secondary/10 text-secondary',
  'senior': 'bg-tertiary-fixed text-tertiary',
  'diabetes': 'bg-secondary-fixed text-on-secondary-fixed',
  'vitamins': 'bg-primary-container/10 text-primary',
  'immunity': 'bg-secondary/10 text-secondary',
}

export default function SearchByRelevance() {
  return (
    <section className="w-full py-space-2xl bg-surface">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <span className="eyebrow">Targeted Diagnostics</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">
              Search by Relevance
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Browse lab investigations mapped directly to organ systems and specific symptoms.
            </p>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant">16 Clinical Categories</span>
        </div>

        {/* 8-Column Responsive Icon Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-space-sm">
          {CATEGORIES.map((cat) => {
            const colorClass = CATEGORY_COLORS[cat.slug] || 'bg-surface-container text-on-surface'
            return (
              <a
                key={cat.id}
                href={`/tests?category=${cat.slug}`}
                className="p-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-center flex flex-col items-center justify-center group shadow-card transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform ${colorClass}`}>
                  <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold text-center leading-tight">{cat.name}</span>
                <span className="font-caption text-caption text-on-surface-variant mt-0.5">{cat.test_count} Tests</span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
