import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { TESTS, HEALTH_PACKAGES } from '../data/mockData'
import { formatPrice } from '../lib/constants'

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [localQuery, setLocalQuery] = useState(query)

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.toLowerCase()
    const testResults = TESTS.filter(t =>
      t.name.toLowerCase().includes(q) || t.short_description.toLowerCase().includes(q)
    ).map(t => ({ type: 'test' as const, id: t.id, name: t.name, slug: t.slug, desc: t.short_description, price: t.price }))

    const pkgResults = HEALTH_PACKAGES.filter(p =>
      p.name.toLowerCase().includes(q) || p.short_description.toLowerCase().includes(q)
    ).map(p => ({ type: 'package' as const, id: p.id, name: p.name, slug: p.slug, desc: p.short_description, price: p.price }))

    return [...testResults, ...pkgResults]
  }, [query])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (localQuery.trim()) {
      setSearchParams({ q: localQuery.trim() })
    }
  }

  return (
    <>
      <Helmet>
        <title>{query ? `Search "${query}"` : 'Search'} — HealthCure Diagnostics</title>
      </Helmet>

      <div className="bg-surface-container-low py-space-xl">
        <div className="section-container">
          <h1 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">Search Tests & Packages</h1>
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg">
            <div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg px-space-sm">
              <span className="material-symbols-outlined text-outline text-[18px] mr-2">search</span>
              <input
                className="bg-transparent flex-1 py-2.5 text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                placeholder="Blood test, thyroid, diabetes..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
              />
            </div>
            <button className="px-4 py-2.5 bg-primary-container text-on-primary rounded-lg font-label-md text-label-md">Search</button>
          </form>
        </div>
      </div>

      <div className="section-container py-space-xl">
        {query && (
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-space-md">
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </p>
        )}

        {results.length > 0 ? (
          <div className="space-y-space-sm">
            {results.map((r) => (
              <Link
                key={r.id}
                to={r.type === 'test' ? `/tests/${r.slug}` : `/health-packages/${r.slug}`}
                className="flex items-center justify-between p-space-md bg-surface-container-lowest rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start gap-space-md">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${r.type === 'test' ? 'bg-primary-container/10 text-primary-container' : 'bg-secondary/10 text-secondary'}`}>
                    <span className="material-symbols-outlined text-[20px]">{r.type === 'test' ? 'science' : 'inventory_2'}</span>
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-on-surface">{r.name}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">{r.desc}</p>
                    <span className={`font-caption text-caption font-semibold mt-1 inline-block ${r.type === 'test' ? 'text-primary-container' : 'text-secondary'}`}>
                      {r.type === 'test' ? 'Test' : 'Health Package'}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 pl-space-md">
                  <p className="font-headline-sm text-headline-sm font-bold text-on-surface">{formatPrice(r.price)}</p>
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">chevron_right</span>
                </div>
              </Link>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-space-3xl">
            <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
            <h2 className="font-headline-md text-headline-md text-on-surface mt-4">No results found for "{query}"</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">Try different keywords or browse all tests.</p>
            <Link to="/tests" className="btn-primary mt-space-md inline-flex">Browse All Tests</Link>
          </div>
        ) : (
          <div className="text-center py-space-3xl">
            <span className="material-symbols-outlined text-[48px] text-outline">manage_search</span>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4">Enter a test name, condition, or symptom to search.</p>
          </div>
        )}
      </div>
    </>
  )
}
