import { Link } from 'react-router-dom'

const LAB_IMAGE = 'https://lh3.googleusercontent.com/aida/AEtjO1VdfdnV87Bc8JKlMxCjFP6ZiuFhr3RnriIQ5tjbmatkfKyZHd9s5sPvhedFU1TN-Z2YMFAuCOHtOTHZ2IJitTRm77lDb0eDA4UNEFnNUaTw-1lVzfh-5alAnDsNup-wMINJBBFNijK4mmFZl7VO6D_EZcEXj5uNnZxpPWWUuuJP3iS95xgi-gT4UQgSc7d7fK7vj4DsV_FOreYG77OQ_u_F-11AxH87tbt_MU9ITkOeXGiQ7QCExmKqmaA'

const STATS = [
  { value: '25,000+', label: 'Kolkata Patients Served', color: 'text-primary-container' },
  { value: '99.8%', label: 'On-Time Report Delivery', color: 'text-secondary' },
  { value: '60 Min', label: 'Avg Home Arrival', color: 'text-on-surface' },
]

export default function WhoWeAre() {
  return (
    <section className="w-full py-space-3xl" style={{ backgroundColor: '#F4F3DF' }}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          {/* Left: Lab photo */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={LAB_IMAGE}
                alt="Authentic healthcare practitioner in clean lab collecting specimen with precision"
                className="w-full h-[460px] object-cover object-center"
              />
            </div>
            {/* Floating Credibility Tag */}
            <div className="absolute -bottom-6 right-4 md:-right-6 bg-surface-container-lowest p-space-md rounded-2xl shadow-xl max-w-[240px]">
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
                <span className="font-headline-sm text-headline-sm font-bold text-on-surface">25,000+</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Patients served across Kolkata & North 24 Parganas.</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-6 space-y-space-md pt-8 lg:pt-0">
            <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase tracking-widest bg-tertiary-container/10 px-3 py-1 rounded-full">
              WHO WE ARE — HEALTHCURE DIAGNOSTICS
            </span>

            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface font-extrabold tracking-tight leading-tight">
              Healthcare You Can Trust.<br />Diagnostics You Can Rely On.
            </h2>

            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Founded with a singular mission: to eliminate clinical ambiguity and long waiting queues for North Kolkata families. At HealthCure Diagnostics, we treat every single blood vial not as a number, but as a human life demanding utmost clinical accountability.
            </p>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Located conveniently on Jessore Road, Barasat, our facility is equipped with cutting-edge automated immunoassays, hematology counters, and biochemistry platforms operated by certified technicians and guided by veteran pathologists.
            </p>

            {/* 3 Stats */}
            <div className="grid grid-cols-3 gap-space-sm pt-2">
              {STATS.map((stat) => (
                <div key={stat.label} className="p-3 bg-surface-container-lowest rounded-xl">
                  <p className={`font-headline-xl text-headline-xl font-black ${stat.color}`}>{stat.value}</p>
                  <p className="font-caption text-caption text-on-surface-variant mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-container text-on-primary hover:opacity-90 font-label-md text-label-md transition-all shadow-md"
              >
                <span>Learn More About Our Centre</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
