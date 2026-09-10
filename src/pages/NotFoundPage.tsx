import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function NotFoundPage() {
  return (
    <>
      <Helmet><title>Page Not Found — HealthCure Diagnostics</title></Helmet>
      <div className="min-h-screen bg-surface flex items-center justify-center py-space-3xl px-4">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-space-lg">
            <span className="material-symbols-outlined text-[48px] text-outline">error_outline</span>
          </div>
          <h1 className="font-display-lg text-display-lg-mobile text-on-surface">Page Not Found</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-4">
            The page you're looking for doesn't exist. Please check the URL or navigate back to the homepage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-space-xl">
            <Link to="/" className="btn-primary">Go to Homepage</Link>
            <Link to="/tests" className="btn-outline">Browse All Tests</Link>
          </div>
        </div>
      </div>
    </>
  )
}
