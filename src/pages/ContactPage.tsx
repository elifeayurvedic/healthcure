import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG, generateWhatsAppUrl } from '../lib/constants'

const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRHNQ9Iz2XLJgF3UTvMyW2kchushdySEoeHqphGrPsFXbtw4CYfdBN6ru1mOg5O49Zw3Zg9pMTMPXl1z_BchQ8tHQGycubmYCLltq98suKIWDjd7s3lDOCsVqhCqr440LFzUxnDZ-EgxRSzMYyOqlCcWdr5OY5YbyZWzakOHySuVqt4P58CfC-7936eaxsgg20QHKA-7-1xCLvND7nn_fM8eODuL1f806h_L341BGCGcAByZyuA7Hy'

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact HealthCure Diagnostics — Call, WhatsApp, Visit | Kolkata</title>
        <meta name="description" content="Contact HealthCure Diagnostics. Call 08327663438, WhatsApp for home collection booking, or visit 122/5 Jessore Rd, Banamalipur, Kolkata 700124." />
      </Helmet>

      <div className="bg-surface-container-high/60 py-space-2xl">
        <div className="section-container">
          <span className="eyebrow">Get In Touch</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">Contact Us</h1>
        </div>
      </div>

      <div className="section-container py-space-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Contact Cards */}
          <div className="lg:col-span-5 space-y-space-md">
            {/* Phone */}
            <div className="card p-space-lg">
              <div className="flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">call</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Phone / Call</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-2">Available all 7 days during lab hours</p>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="btn-primary text-sm px-4 py-2 inline-flex">
                    Call {SITE_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="card p-space-lg">
              <div className="flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">chat</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">WhatsApp</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-2">Quick queries, slot confirmation, report download links</p>
                  <a
                    href={generateWhatsAppUrl('Hello HealthCure Diagnostics!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary text-sm px-4 py-2 inline-flex"
                  >
                    Open WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="card p-space-lg">
              <div className="flex items-start gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">location_on</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Visit Our Centre</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{SITE_CONFIG.address}</p>
                  <p className="font-caption text-caption text-secondary font-semibold mt-1">Open All 7 Days: 06:30 AM – 08:30 PM</p>
                  <a
                    href={SITE_CONFIG.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 font-label-sm text-label-sm text-primary-container hover:underline"
                  >
                    <span className="material-symbols-outlined text-[14px]">directions</span>
                    Get Directions on Google Maps
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl overflow-hidden shadow-lg h-full min-h-[400px] relative">
              <img
                src={MAP_IMAGE}
                alt="Map showing HealthCure Diagnostics location on Jessore Road, Kolkata"
                className="w-full h-full object-cover"
                style={{ minHeight: '400px' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-space-md bg-surface-container-lowest/95 backdrop-blur-md flex items-center justify-between">
                <div>
                  <p className="font-label-md text-label-md font-bold text-on-surface">HealthCure Diagnostics Central Lab</p>
                  <p className="font-caption text-caption text-on-surface-variant">Jessore Rd, Barasat, Kolkata 700124</p>
                </div>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary-container text-on-primary hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
