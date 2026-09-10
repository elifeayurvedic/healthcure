const PILLARS = [
  {
    icon: 'verified',
    title: 'Bio-Rad Calibrated Systems',
    description: 'Daily internal calibration using globally recognized quality control sera to guarantee reproducible results.',
    color: 'bg-primary-container text-on-primary',
  },
  {
    icon: 'schedule',
    title: 'Punctual Doorstep Pickup',
    description: 'Certified Kolkata phlebotomists trained in senior & child care arrive strictly within your chosen time window.',
    color: 'bg-secondary text-on-secondary',
  },
  {
    icon: 'health_and_safety',
    title: 'Expert MD Pathologists',
    description: 'Every abnormal value triggers automated re-run validation before sign-off by credentialed specialist doctors.',
    color: 'bg-primary-container text-on-primary',
  },
  {
    icon: 'currency_rupee',
    title: 'Fair & Transparent Pricing',
    description: 'Zero hidden convenience fees, zero home collection surcharges on eligible packages, honest Kolkata rates.',
    color: 'bg-secondary text-on-secondary',
  },
  {
    icon: 'chat',
    title: 'Instant WhatsApp Reports',
    description: 'Skip the lab counter queue. Password-protected high-res PDF reports delivered to your smartphone in hours.',
    color: 'bg-primary-container text-on-primary',
  },
  {
    icon: 'volunteer_activism',
    title: 'Senior-Citizen Friendly Support',
    description: 'Bengali & English speaking patient desk ready to guide elderly patients with clear fasting preparation instructions.',
    color: 'bg-tertiary text-on-tertiary',
  },
]

export default function WhyChooseSection() {
  return (
    <section className="w-full py-space-2xl bg-surface">
      <div className="section-container">
        {/* Header */}
        <div className="max-w-3xl mb-space-xl">
          <span className="eyebrow">Clinical Standards</span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">
            Why Doctors & Families Choose HealthCure
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Built to deliver diagnostic certainty without delays, high costs, or bureaucratic hurdles.
          </p>
        </div>

        {/* 6-Card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {PILLARS.map((pillar) => (
            <div key={pillar.title} className="p-space-lg rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors space-y-2">
              <div className={`w-12 h-12 rounded-xl ${pillar.color} flex items-center justify-center mb-2`}>
                <span className="material-symbols-outlined text-[24px]">{pillar.icon}</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface">{pillar.title}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{pillar.description}</p>
            </div>
          ))}
        </div>

        {/* Compliance Reassurance Strip */}
        <div className="mt-space-xl p-space-md rounded-2xl bg-surface-container-lowest shadow-card flex flex-wrap items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <span className="p-2 rounded-xl bg-secondary/10 text-secondary">
              <span className="material-symbols-outlined text-[28px]">shield_with_heart</span>
            </span>
            <div>
              <p className="font-headline-sm text-headline-sm text-on-surface">Rigid Cold-Chain & Barcode Custody</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Specimens sealed in 4°C chilled insulated transport units from patient vein to lab analyzer.</p>
            </div>
          </div>
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">NABL Aligned Protocols</span>
            <span className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">ISO 9001:2015 Assured</span>
          </div>
        </div>
      </div>
    </section>
  )
}
