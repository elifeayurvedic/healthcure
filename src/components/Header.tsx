import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SITE_CONFIG, generateWhatsAppUrl } from '../lib/constants'

const NAV_LINKS = [
  { label: 'Tests', path: '/tests' },
  { label: 'Health Packages', path: '/health-packages' },
  { label: 'Home Collection', path: '/book-home-collection' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Quality & Lab', path: '/quality-and-lab' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-shadow duration-200 ${isScrolled ? 'shadow-header' : 'shadow-[0_1px_4px_rgba(0,0,0,0.04)]'}`}>
      {/* Top Info Strip */}
      <div className="bg-surface-container-high text-on-surface px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-2xs text-caption">
        <div className="max-w-content mx-auto flex flex-wrap items-center justify-between gap-y-1">
          <div className="flex flex-wrap items-center gap-x-space-md gap-y-1 text-on-surface-variant">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-space-2xs hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[14px] text-primary">call</span>
              <span className="font-label-sm text-label-sm text-on-surface">{SITE_CONFIG.phone}</span>
            </a>
            <span className="hidden sm:inline text-outline-variant">|</span>
            <span className="flex items-center gap-space-2xs">
              <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
              <span>{SITE_CONFIG.openingHours}</span>
            </span>
            <span className="hidden md:inline text-outline-variant">|</span>
            <span className="hidden md:flex items-center gap-space-2xs">
              <span className="material-symbols-outlined text-[14px] text-primary">location_on</span>
              <span>{SITE_CONFIG.addressShort}</span>
            </span>
          </div>
          <div className="flex items-center gap-space-md ml-auto">
            <a
              href={generateWhatsAppUrl('Hello HealthCure Diagnostics, I need assistance.')}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-space-2xs text-secondary hover:text-on-secondary-container transition-colors font-label-sm text-label-sm"
            >
              <span className="material-symbols-outlined text-[15px]">chat</span>
              <span>WhatsApp Support</span>
            </a>
            <span className="text-outline-variant hidden sm:inline">|</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline">NABL & NABH Aligned</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-surface-container-lowest/95 backdrop-blur-md px-margin-mobile md:px-margin-tablet lg:px-margin-desktop">
        <div className="h-16 max-w-content mx-auto flex items-center justify-between gap-space-md">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 py-1" aria-label="HealthCure Diagnostics Home">
            <img
              src="/logo.png"
              alt="HealthCure Diagnostics - Accuracy You Can Trust"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-space-lg">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-space-sm shrink-0">
            {/* Search (desktop) */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-surface-container-low rounded-lg px-space-sm py-space-xs">
              <span className="material-symbols-outlined text-outline text-[18px] mr-space-2xs">search</span>
              <input
                className="bg-transparent text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none w-36 xl:w-44"
                placeholder="Search tests, packages..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {/* Call button (desktop) */}
            <a
              href={`tel:${SITE_CONFIG.phone}`}
              className="hidden sm:flex items-center justify-center h-10 w-10 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container-high transition-colors"
              title={`Call Us: ${SITE_CONFIG.phone}`}
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
            </a>

            {/* Book Home Collection CTA */}
            <Link
              to="/book-home-collection"
              className="flex items-center gap-space-2xs bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md px-space-md py-space-xs rounded-lg transition-colors shadow-card"
            >
              <span className="material-symbols-outlined text-[18px]">home_health</span>
              <span className="whitespace-nowrap hidden sm:inline">Book Home Collection</span>
              <span className="whitespace-nowrap sm:hidden">Book</span>
            </Link>

            {/* Hamburger (mobile) */}
            <button
              className="xl:hidden w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-[20px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="xl:hidden absolute top-full left-0 right-0 bg-surface-container-lowest shadow-sticky border-t border-surface-container animate-fade-in"
        >
          <div className="px-margin-mobile py-space-md space-y-space-xs">
            {/* Mobile search */}
            <form onSubmit={handleSearch} className="flex items-center bg-surface-container-low rounded-lg px-space-sm py-space-xs mb-space-sm">
              <span className="material-symbols-outlined text-outline text-[18px] mr-space-2xs">search</span>
              <input
                className="bg-transparent text-body-md font-body-md text-on-surface placeholder:text-outline focus:outline-none flex-1"
                placeholder="Search tests, packages..."
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-space-sm py-space-sm px-space-xs rounded-lg hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="material-symbols-outlined text-primary text-[18px]">chevron_right</span>
                {link.label}
              </Link>
            ))}

            <div className="pt-space-sm border-t border-surface-container flex gap-space-sm">
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex-1 h-11 flex items-center justify-center gap-2 bg-primary-container text-on-primary rounded-lg font-label-sm text-label-sm"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                Call Now
              </a>
              <a
                href={generateWhatsAppUrl('Hello HealthCure Diagnostics, I would like to book a test.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 flex items-center justify-center gap-2 bg-secondary text-on-secondary rounded-lg font-label-sm text-label-sm"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
