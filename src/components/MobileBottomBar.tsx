import { Link } from 'react-router-dom'
import { SITE_CONFIG, generateWhatsAppUrl } from '../lib/constants'

export default function MobileBottomBar() {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/95 backdrop-blur-xl shadow-sticky xl:hidden" aria-label="Mobile quick actions">
      <div className="h-16 px-margin-mobile flex items-center justify-between gap-space-xs">
        {/* Call */}
        <a
          href={`tel:${SITE_CONFIG.phone}`}
          className="flex-1 h-11 flex flex-col items-center justify-center text-on-surface-variant hover:text-primary transition-colors min-w-0"
          aria-label="Call HealthCure Diagnostics"
        >
          <span className="material-symbols-outlined text-[20px] leading-none mb-0.5">phone_in_talk</span>
          <span className="font-caption text-caption truncate">Call Now</span>
        </a>

        {/* WhatsApp */}
        <a
          href={generateWhatsAppUrl('Hello HealthCure Diagnostics, I would like to book a diagnostic test / home collection.')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 h-11 flex flex-col items-center justify-center text-on-surface-variant hover:text-secondary transition-colors min-w-0"
          aria-label="Chat on WhatsApp"
        >
          <span className="material-symbols-outlined text-[20px] leading-none mb-0.5 text-secondary">chat</span>
          <span className="font-caption text-caption truncate">WhatsApp</span>
        </a>

        {/* Book Home Collection — Primary CTA */}
        <Link
          to="/book-home-collection"
          className="flex-[2.2] h-12 rounded-lg bg-secondary text-on-secondary flex items-center justify-center gap-space-xs px-space-sm shadow-sticky hover:bg-on-secondary-container active:scale-[0.98] transition-all min-w-0"
          aria-label="Book Home Collection"
        >
          <span className="material-symbols-outlined text-[18px]">bolt</span>
          <span className="truncate font-label-md text-label-md">Book Home Collection</span>
        </Link>
      </div>
    </nav>
  )
}
