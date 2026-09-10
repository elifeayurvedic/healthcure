import { Link } from 'react-router-dom'
import { SITE_CONFIG, generateWhatsAppUrl } from '../lib/constants'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-primary-container text-on-primary">
      <div className="max-w-content mx-auto px-margin-mobile md:px-margin-tablet lg:px-margin-desktop py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl">
          {/* Brand */}
          <div className="space-y-space-md">
            <Link to="/" className="inline-block bg-white px-3.5 py-2.5 rounded-lg shadow-sm hover:opacity-95 transition-opacity" aria-label="HealthCure Diagnostics Home">
              <img
                src="/logo.png"
                alt="HealthCure Diagnostics - Accuracy You Can Trust"
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="font-body-sm text-body-sm text-primary-fixed-dim leading-relaxed">
              HealthCure Diagnostics delivers high-precision pathology and diagnostic care across Kolkata and Barasat. Operating under stringent NABL and NABH quality benchmarks with compassionate patient-first support.
            </p>
            <div className="flex items-center gap-space-xs flex-wrap pt-space-xs">
              <span className="inline-flex items-center gap-1 bg-primary px-space-xs py-space-2xs rounded text-caption text-on-primary-container font-semibold">
                <span className="material-symbols-outlined text-[12px]">verified</span> NABL Aligned
              </span>
              <span className="inline-flex items-center gap-1 bg-primary px-space-xs py-space-2xs rounded text-caption text-on-primary-container font-semibold">
                <span className="material-symbols-outlined text-[12px]">verified_user</span> ISO 9001:2015
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-primary">Quick Links</h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-primary-fixed-dim">
              {[
                { label: 'Home', path: '/' },
                { label: 'Diagnostic Tests', path: '/tests' },
                { label: 'Health Packages', path: '/health-packages' },
                { label: 'Home Collection', path: '/book-home-collection' },
                { label: 'About Us', path: '/about' },
                { label: 'Contact', path: '/contact' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-on-primary transition-colors flex items-center gap-space-2xs"
                  >
                    <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tests */}
          <div className="space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-primary">Popular Tests</h3>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-primary-fixed-dim">
              {[
                { label: 'Complete Blood Count', path: '/tests/complete-blood-count-cbc' },
                { label: 'HbA1c Blood Sugar', path: '/tests/hba1c-glycated-hemoglobin' },
                { label: 'Lipid Profile Total', path: '/tests/lipid-profile-total' },
                { label: 'Thyroid Profile (T3,T4,TSH)', path: '/tests/thyroid-profile-total' },
                { label: 'Liver Function Test', path: '/tests/liver-function-test' },
                { label: 'Kidney Function Test', path: '/tests/kidney-function-test' },
                { label: 'Vitamin D & B12 Duo', path: '/tests/vitamin-d-b12-duo' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="hover:text-on-primary transition-colors flex items-center gap-space-2xs"
                  >
                    <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-space-md">
            <h3 className="font-headline-sm text-headline-sm text-on-primary">Contact & Hours</h3>
            <div className="space-y-space-sm font-body-sm text-body-sm text-primary-fixed-dim">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed shrink-0 mt-0.5">location_on</span>
                <p className="leading-relaxed">{SITE_CONFIG.address}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed shrink-0">schedule</span>
                <p>{SITE_CONFIG.openingHours}</p>
              </div>
              <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-2 hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed shrink-0">call</span>
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a
                href={generateWhatsAppUrl('Hello HealthCure Diagnostics!')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-on-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed shrink-0">chat</span>
                <span>WhatsApp Support</span>
              </a>
              <a
                href={SITE_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-on-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed shrink-0">directions</span>
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-space-xl pt-space-md border-t border-primary/40 flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <p className="font-caption text-caption text-primary-fixed-dim text-center md:text-left">
            Diagnostic tests conducted under strict standard operating procedures. Home collection phlebotomy governed by clinical hygiene safety norms.
          </p>
          <p className="font-caption text-caption text-primary-fixed/80 font-semibold whitespace-nowrap">
            © {currentYear} HealthCure Diagnostics. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
