const STEPS = [
  {
    num: '01',
    title: 'BOOK',
    description: 'Select tests online or call 08327663438. Instant slot confirmed with no advance payment needed.',
    badge: 'Zero Booking Charges',
    icon: 'touch_app',
    color: 'bg-primary-container text-on-primary',
    badgeColor: 'text-primary',
  },
  {
    num: '02',
    title: 'COLLECT',
    description: 'Gentle phlebotomist arrives at your doorstep with vacuum tubes, or walk-in to our Jessore Rd center.',
    badge: 'Single-Use Sterile Kits',
    icon: 'vaccines',
    color: 'bg-secondary text-on-secondary',
    badgeColor: 'text-secondary',
  },
  {
    num: '03',
    title: 'TEST',
    description: 'Automated high-throughput barcode scanning with cold-chain control and zero sample mix-ups.',
    badge: 'NABL Aligned Lab',
    icon: 'biotech',
    color: 'bg-primary-container text-on-primary',
    badgeColor: 'text-primary-container',
  },
  {
    num: '04',
    title: 'VERIFY',
    description: 'Multi-tiered doctor review signed off by senior Kolkata MD Pathologists and biochemists.',
    badge: 'Doctor Verified',
    icon: 'approval_delegation',
    color: 'bg-tertiary text-on-tertiary',
    badgeColor: 'text-tertiary',
  },
  {
    num: '05',
    title: 'REPORT',
    description: 'Encrypted PDF link sent straight to your WhatsApp and SMS within 6 to 12 hours.',
    badge: 'WhatsApp Delivery',
    icon: 'mark_chat_read',
    color: 'bg-secondary text-on-secondary',
    badgeColor: 'text-secondary',
  },
]

export default function DiagnosticExperience() {
  return (
    <section className="w-full py-space-2xl bg-surface-container-low">
      <div className="section-container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-space-xl">
          <span className="eyebrow">Smooth & Transparent Care</span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">
            Best-in-Class Diagnostic Experience with HEALTHCURE
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            From slot reservation to verified PDF reports delivered directly on WhatsApp.
          </p>
        </div>

        {/* 5 Connected Step Cards (desktop horizontal, mobile stacked) */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-surface-container z-0"></div>

          {STEPS.map((step, index) => (
            <div
              key={step.num}
              className="bg-surface-container-lowest rounded-2xl p-space-md shadow-card flex flex-col justify-between relative group hover:shadow-card-hover transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-space-sm">
                  <span className={`w-10 h-10 rounded-full ${step.color} font-headline-sm text-headline-sm flex items-center justify-center font-bold z-10 shadow-sm`}>
                    {step.num}
                  </span>
                  <span className={`material-symbols-outlined text-[24px] ${step.color.split(' ')[1]}`}>{step.icon}</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">{step.title}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{step.description}</p>
              </div>
              <div className={`pt-space-sm mt-space-sm border-t border-surface-container text-caption font-caption ${step.badgeColor} font-semibold`}>
                {step.badge}
              </div>
              {/* Connector arrow (desktop) */}
              {index < STEPS.length - 1 && (
                <span className="hidden md:block absolute -right-2 top-10 z-20 text-primary-container">
                  <span className="material-symbols-outlined text-[18px]">arrow_forward_ios</span>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
