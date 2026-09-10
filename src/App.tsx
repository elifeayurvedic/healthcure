import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import MobileBottomBar from './components/MobileBottomBar'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import AllTestsPage from './pages/AllTestsPage'
import TestDetailPage from './pages/TestDetailPage'
import HealthPackagesPage from './pages/HealthPackagesPage'
import PackageDetailPage from './pages/PackageDetailPage'
import BookHomeCollectionPage from './pages/BookHomeCollectionPage'
import BookingConfirmationPage from './pages/BookingConfirmationPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SearchResultsPage from './pages/SearchResultsPage'
import NotFoundPage from './pages/NotFoundPage'
import QualityLabPage from './pages/QualityLabPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Header />
      {/* Push content below fixed header (top info strip ~38px + main nav ~64px = ~102px) */}
      <main className="flex-1 pt-[102px] pb-16 xl:pb-0">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tests" element={<AllTestsPage />} />
          <Route path="/tests/:slug" element={<TestDetailPage />} />
          <Route path="/health-packages" element={<HealthPackagesPage />} />
          <Route path="/health-packages/:slug" element={<PackageDetailPage />} />
          <Route path="/book-home-collection" element={<BookHomeCollectionPage />} />
          <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/quality-and-lab" element={<QualityLabPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      {/* Mobile bottom navigation (hidden on xl+) */}
      <MobileBottomBar />
      {/* Floating WhatsApp button */}
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
