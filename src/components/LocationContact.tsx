import { SITE_CONFIG, generateWhatsAppUrl } from '../lib/constants'

const MAP_IMAGE = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRHNQ9Iz2XLJgF3UTvMyW2kchushdySEoeHqphGrPsFXbtw4CYfdBN6ru1mOg5O49Zw3Zg9pMTMPXl1z_BchQ8tHQGycubmYCLltq98suKIWDjd7s3lDOCsVqhCqr440LFzUxnDZ-EgxRSzMYyOqlCcWdr5OY5YbyZWzakOHySuVqt4P58CfC-7936eaxsgg20QHKA-7-1xCLvND7nn_fM8eODuL1f806h_L341BGCGcAByZyuA7Hy'

export default function LocationContact() {
  return (
    <section className="w-full py-space-2xl bg-surface-container-high/60" id="location-contact">
      <div className="section-container">
        <div className="bg-surface-container-lowest rounded-3xl p-space-xl shadow-sticky">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
            {/* Left: Address & Hours */}
            <div className="lg:col-span-7 space-y-space-md">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                Flagship Diagnostic Center
              </span>

              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight font-bold">
                Visit Our Diagnostic Centre on Jessore Road
              </h2>

              <p className="font-body-md text-body-md text-on-surface-variant">
                Walk in anytime for fasting blood sample pickup, doctor consultations, ECG, or drop by to collect laminated physical report printouts.
              </p>

              <div className="space-y-space-sm pt-2">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5">location_on</span>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-on-surface">122/5, Jessore Rd, Bara6, Banamalipur</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Kolkata, West Bengal 700124 (Near Barasat Junction area)</p>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[22px] shrink-0">schedule</span>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-on-surface">Open All 7 Days: 06:30 AM – 08:30 PM</p>
                    <p className="font-caption text-caption text-secondary font-medium">Sunday Early Morning Sample Collection Active</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-space-sm pt-space-sm">
                <a
                  href={`tel:${SITE_CONFIG.phone}`}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-primary-container hover:opacity-90 text-on-primary font-label-md text-label-md transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  Call {SITE_CONFIG.phone}
                </a>
                <a
                  href={generateWhatsAppUrl('Hello HealthCure Diagnostics!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  Chat on WhatsApp
                </a>
                <a
                  href={SITE_CONFIG.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  Driving Directions
                </a>
              </div>
            </div>

            {/* Right: Map */}
            <div className="lg:col-span-5">
              <div className="p-space-sm rounded-2xl bg-surface-container-low shadow-inner">
                <div
                  className="w-full h-72 rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-space-md shadow-sm"
                  style={{ backgroundImage: `url('${MAP_IMAGE}')` }}
                >
                  <div className="bg-surface-container-lowest/95 backdrop-blur-md p-space-sm rounded-xl w-full flex items-center justify-between">
                    <div>
                      <p className="font-label-md text-label-md font-bold text-on-surface">HealthCure Central Lab</p>
                      <p className="font-caption text-caption text-on-surface-variant">Jessore Rd, Barasat</p>
                    </div>
                    <a
                      href={SITE_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-primary-container text-on-primary hover:opacity-90 transition-all"
                      aria-label="Open in Google Maps"
                    >
                      <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                    </a>
                  </div>
                </div>
                <p className="text-center font-caption text-caption text-on-surface-variant pt-2">
                  Ample parking available for patients & emergency access.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
