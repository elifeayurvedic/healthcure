import { Link } from 'react-router-dom'
import { PROMOTIONAL_BANNERS } from '../data/mockData'
import { formatPrice } from '../lib/constants'

export default function PromotionalSection() {
  return (
    <section className="w-full py-space-xl bg-surface">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          {PROMOTIONAL_BANNERS.map((banner) => {
            const isPrimary = banner.color_variant === 'primary'
            return (
              <div
                key={banner.id}
                className={`rounded-3xl p-space-xl flex flex-col justify-between relative overflow-hidden group shadow-lg
                  ${isPrimary
                    ? 'bg-gradient-to-br from-primary-container to-primary'
                    : 'bg-gradient-to-br from-[#00513a] to-secondary'
                  } text-on-primary`}
              >
                <div className="space-y-space-sm relative z-10">
                  {/* Tag */}
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-primary-fixed font-label-sm text-label-sm">
                    {banner.icon && <span className="material-symbols-outlined text-[16px]">{banner.icon}</span>}
                    {banner.subtitle}
                  </span>

                  {/* Headline */}
                  <h3 className="font-display-lg text-headline-xl md:text-display-lg font-bold text-on-primary leading-tight max-w-sm">
                    {banner.title}
                  </h3>

                  {/* Description */}
                  <p className="font-body-md text-body-md text-primary-fixed-dim max-w-md">
                    {banner.description}
                  </p>

                  {/* Bullet Points */}
                  {banner.bullet_points && (
                    <ul className="space-y-1.5 pt-2 text-body-sm font-body-sm text-primary-fixed">
                      {banner.bullet_points.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-secondary-fixed">done</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* CTA + Price */}
                <div className="pt-space-lg relative z-10 flex items-center justify-between flex-wrap gap-3 mt-4">
                  <Link
                    to={banner.button_url}
                    className={`inline-flex items-center gap-2 px-5 py-3 rounded-lg font-label-md text-label-md font-semibold shadow-md transition-colors
                      ${isPrimary
                        ? 'bg-surface-container-lowest text-primary hover:bg-surface-container-high'
                        : 'bg-surface-container-lowest text-secondary hover:bg-secondary-fixed'
                      }`}
                  >
                    {banner.button_text}
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>

                  {banner.price_from && (
                    <span className="font-headline-md text-headline-md text-secondary-fixed font-bold">
                      From {formatPrice(banner.price_from)}
                    </span>
                  )}
                </div>

                {/* Decorative watermark icon */}
                <div className="absolute -bottom-6 -right-6 text-surface-container-lowest/5 pointer-events-none group-hover:scale-110 transition-transform">
                  {banner.icon && (
                    <span className="material-symbols-outlined text-[180px]">{isPrimary ? 'cardiology' : 'vital_signs'}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
