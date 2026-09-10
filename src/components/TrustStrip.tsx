// Trust Strip — 4 pillars matching Stitch design
const TRUST_PILLARS = [
  {
    icon: 'home_health',
    title: 'Home Sample Pickup',
    subtitle: 'Kolkata-wide in 60 mins',
    color: 'text-secondary bg-secondary/10',
  },
  {
    icon: 'verified',
    title: 'NABL Aligned Lab',
    subtitle: 'Bio-Rad calibrated systems',
    color: 'text-primary-container bg-primary-container/10',
  },
  {
    icon: 'mark_chat_read',
    title: 'WhatsApp Reports',
    subtitle: 'PDF delivered in 6–12 hrs',
    color: 'text-secondary bg-secondary/10',
  },
  {
    icon: 'currency_rupee',
    title: 'Transparent Pricing',
    subtitle: 'Zero hidden charges',
    color: 'text-primary-container bg-primary-container/10',
  },
]

export default function TrustStrip() {
  return (
    <section className="w-full bg-surface-container-lowest border-y border-surface-container py-space-lg">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
          {TRUST_PILLARS.map((pillar) => (
            <div key={pillar.title} className="flex items-center gap-space-sm">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${pillar.color}`}>
                <span className="material-symbols-outlined text-[22px]">{pillar.icon}</span>
              </div>
              <div>
                <p className="font-headline-sm text-headline-sm text-on-surface leading-snug">{pillar.title}</p>
                <p className="font-caption text-caption text-on-surface-variant leading-snug mt-0.5">{pillar.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
