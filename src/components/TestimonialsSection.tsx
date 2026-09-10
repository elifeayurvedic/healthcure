import { TESTIMONIALS } from '../data/mockData'

const STARS = [1, 2, 3, 4, 5]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5 text-[#faaf00]">
      {STARS.map((s) => (
        <span key={s} className="material-symbols-outlined text-[16px] ms-filled">star</span>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="w-full py-space-2xl bg-surface">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
          <div>
            <span className="eyebrow">Patient Stories</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">
              What Our Patients Say
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Authentic experiences shared by families trusting HealthCure Diagnostics.
            </p>
          </div>

          {/* Google Rating Badge */}
          <div className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-2xl shadow-card self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-on-surface font-bold text-headline-sm">
              G
            </div>
            <div>
              <div className="flex items-center gap-1 text-[#faaf00]">
                {STARS.map((s) => (
                  <span key={s} className="material-symbols-outlined text-[18px] ms-filled">star</span>
                ))}
                <span className="font-bold text-on-surface font-headline-sm text-headline-sm ml-1.5">4.9 / 5</span>
              </div>
              <a
                href="https://maps.app.goo.gl/wNYQHpn1sEkdjngZA"
                target="_blank"
                rel="noopener noreferrer"
                className="font-caption text-caption text-primary hover:underline"
              >
                Read 240+ Verified Reviews on Google
              </a>
            </div>
          </div>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {TESTIMONIALS.map((testimonial) => (
            <div key={testimonial.id} className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-card flex flex-col justify-between">
              <div>
                <StarRating rating={testimonial.rating} />
                <p className="font-body-md text-body-md text-on-surface leading-relaxed mt-space-sm italic">
                  {testimonial.message}
                </p>
              </div>
              <div className="mt-space-lg pt-space-sm border-t border-surface-container flex items-center justify-between">
                <div>
                  <p className="font-headline-sm text-headline-sm font-semibold text-on-surface">{testimonial.name}</p>
                  <p className="font-caption text-caption text-on-surface-variant">{testimonial.location}</p>
                </div>
                {testimonial.service_used && (
                  <span className="font-caption text-caption text-secondary font-medium text-right max-w-[120px]">{testimonial.service_used}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA to Google Reviews */}
        <div className="text-center mt-space-xl">
          <a
            href="https://maps.app.goo.gl/wNYQHpn1sEkdjngZA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors"
          >
            <span className="text-[#faaf00]">★</span>
            Read All 240+ Patient Reviews on Google
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  )
}
