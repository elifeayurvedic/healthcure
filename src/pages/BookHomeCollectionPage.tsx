import { Helmet } from 'react-helmet-async'
import { useSearchParams } from 'react-router-dom'
import HomeCollectionForm from '../components/HomeCollectionForm'
import { SITE_CONFIG } from '../lib/constants'

export default function BookHomeCollectionPage() {
  const [searchParams] = useSearchParams()
  const preselectedTest = searchParams.get('test') || undefined
  const preselectedPackage = searchParams.get('package') || undefined

  return (
    <>
      <Helmet>
        <title>Book Home Blood Collection — HealthCure Diagnostics, Kolkata</title>
        <meta name="description" content="Book doorstep blood sample collection in Kolkata. Certified phlebotomist arrives in 60 minutes. Call 08327663438 or book online." />
      </Helmet>

      <div className="min-h-screen bg-surface-container-low">
        {/* Header Banner */}
        <div className="bg-secondary py-space-2xl">
          <div className="section-container text-on-secondary">
            <span className="inline-flex items-center gap-1.5 mb-space-sm px-3 py-1 rounded-full bg-secondary-fixed/20 text-secondary-fixed font-label-sm text-label-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-fixed"></span>
              </span>
              Phlebotomists Active Now
            </span>
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-secondary mt-1">
              Book Home Collection
            </h1>
            <p className="font-body-md text-body-md text-secondary-fixed-dim mt-2 max-w-xl">
              Gentle, sterile blood sample pickup at your doorstep. Our certified phlebotomists serve all Kolkata and Barasat zones.
            </p>

            <div className="flex flex-wrap gap-space-md mt-space-lg">
              <div className="flex items-center gap-2 text-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">timer</span>
                <span className="font-label-md text-label-md">Arrives in 60 minutes</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">payments</span>
                <span className="font-label-md text-label-md">Cash or UPI on pickup</span>
              </div>
              <div className="flex items-center gap-2 text-secondary-fixed">
                <span className="material-symbols-outlined text-[18px]">mark_chat_read</span>
                <span className="font-label-md text-label-md">Report on WhatsApp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form + Info Grid */}
        <div className="section-container py-space-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
            {/* Form */}
            <div className="lg:col-span-7 xl:col-span-6">
              <HomeCollectionForm preselectedTest={preselectedTest} preselectedPackage={preselectedPackage} />
            </div>

            {/* Info panel */}
            <div className="lg:col-span-5 xl:col-span-6 space-y-space-lg">
              {/* How It Works */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-card">
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-md">How Home Collection Works</h2>
                <div className="space-y-space-sm">
                  {[
                    { step: '1', title: 'Submit the booking form', desc: 'Fill in your details and preferred time slot above.', color: 'bg-primary-container text-on-primary' },
                    { step: '2', title: 'Get a confirmation call', desc: 'Our coordinator calls within 10 minutes to confirm.', color: 'bg-secondary text-on-secondary' },
                    { step: '3', title: 'Phlebotomist arrives', desc: 'Certified technician arrives at your address on time.', color: 'bg-primary-container text-on-primary' },
                    { step: '4', title: 'Receive your report', desc: 'Encrypted PDF on WhatsApp in 6–12 hours.', color: 'bg-secondary text-on-secondary' },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-space-sm">
                      <span className={`w-7 h-7 rounded-full ${item.color} font-caption text-caption flex items-center justify-center font-bold shrink-0`}>{item.step}</span>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-semibold">{item.title}</p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Prefer to Call? */}
              <div className="bg-primary-container/10 rounded-2xl p-space-lg">
                <p className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">Prefer to Call or WhatsApp?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="flex-1 py-3 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">call</span>
                    {SITE_CONFIG.phone}
                  </a>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent('Hello HealthCure Diagnostics, I would like to book a home collection.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 rounded-lg bg-secondary text-on-secondary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    WhatsApp Us
                  </a>
                </div>
              </div>

              {/* Service Area */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-card">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">map</span>
                  Our Home Collection Service Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Barasat', 'Jessore Road', 'Banamalipur', 'Madhyamgram', 'Birati', 'Dum Dum', 'Rajarhat', 'New Town', 'Kalyani', 'Airport Gate 2'].map((area) => (
                    <span key={area} className="px-2.5 py-1 rounded-full bg-surface-container font-caption text-caption text-on-surface">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
