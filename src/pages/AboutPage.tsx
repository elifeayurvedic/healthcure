import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { SITE_CONFIG, generateWhatsAppUrl } from '../lib/constants'

const LAB_IMAGE = 'https://lh3.googleusercontent.com/aida/AEtjO1VdfdnV87Bc8JKlMxCjFP6ZiuFhr3RnriIQ5tjbmatkfKyZHd9s5sPvhedFU1TN-Z2YMFAuCOHtOTHZ2IJitTRm77lDb0eDA4UNEFnNUaTw-1lVzfh-5alAnDsNup-wMINJBBFNijK4mmFZl7VO6D_EZcEXj5uNnZxpPWWUuuJP3iS95xgi-gT4UQgSc7d7fK7vj4DsV_FOreYG77OQ_u_F-11AxH87tbt_MU9ITkOeXGiQ7QCExmKqmaA'

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us — HealthCure Diagnostics, Kolkata</title>
        <meta name="description" content="Learn about HealthCure Diagnostics — Kolkata's trusted pathology and home diagnostic laboratory on Jessore Road, Barasat. Quality care, expert pathologists." />
      </Helmet>

      {/* Hero */}
      <div className="bg-primary-container py-space-2xl">
        <div className="section-container text-on-primary">
          <span className="eyebrow text-primary-fixed-dim">Our Story</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mt-1">
            About HealthCure Diagnostics
          </h1>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim mt-2 max-w-2xl leading-relaxed">
            Kolkata's compassionate diagnostic laboratory — where every test is treated with clinical urgency and human warmth.
          </p>
        </div>
      </div>

      {/* Who We Are */}
      <section style={{ backgroundColor: '#F4F3DF' }} className="py-space-3xl">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-center">
            <div>
              <img src={LAB_IMAGE} alt="HealthCure Diagnostics laboratory" className="w-full h-[400px] object-cover rounded-3xl shadow-2xl" />
            </div>
            <div className="space-y-space-md">
              <span className="eyebrow">Who We Are</span>
              <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">
                Healthcare You Can Trust. Diagnostics You Can Rely On.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Founded with a singular mission: to eliminate clinical ambiguity and long waiting queues for North Kolkata families. At HealthCure Diagnostics, we treat every single blood vial not as a number, but as a human life demanding utmost clinical accountability.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Located conveniently on Jessore Road, Barasat, our facility is equipped with cutting-edge automated immunoassays, hematology counters, and biochemistry platforms operated by certified technicians and guided by veteran pathologists.
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                From specialized pediatric sample collections to elderly mobility support, our phlebotomists treat every patient with dignity and genuine warmth.
              </p>
              <div className="grid grid-cols-3 gap-space-sm pt-2">
                {[
                  { v: '25,000+', l: 'Patients Served', c: 'text-primary-container' },
                  { v: '99.8%', l: 'On-Time Reports', c: 'text-secondary' },
                  { v: '60 Min', l: 'Home Arrival', c: 'text-on-surface' },
                ].map(s => (
                  <div key={s.l} className="p-3 bg-surface-container-lowest rounded-xl shadow-sm">
                    <p className={`font-headline-xl text-headline-xl font-black ${s.c}`}>{s.v}</p>
                    <p className="font-caption text-caption text-on-surface-variant mt-0.5">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-space-2xl bg-surface">
        <div className="section-container">
          <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mb-space-xl text-center">
            Our Quality Standards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {[
              { icon: 'verified', title: 'NABL Aligned Protocols', desc: 'All procedures comply with NABL (National Accreditation Board for Testing and Calibration Laboratories) quality standards.' },
              { icon: 'biotech', title: 'Bio-Rad QC Systems', desc: 'Daily internal quality control using Bio-Rad Lyphocheck sera to ensure consistent, reproducible results.' },
              { icon: 'local_shipping', title: 'Cold Chain Logistics', desc: 'Specimens transported in 4°C insulated cold chain units to maintain sample integrity from collection to analysis.' },
              { icon: 'qr_code_2', title: 'Barcode Tracking', desc: 'Every sample barcoded at point of collection. Zero sample mix-ups with real-time digital chain of custody.' },
              { icon: 'health_and_safety', title: 'MD Pathologist Review', desc: 'Every abnormal result is reviewed and signed off by credentialed senior MD Pathologists before report release.' },
              { icon: 'workspace_premium', title: 'ISO 9001:2015 Assured', desc: 'Laboratory quality management system conforms to international ISO 9001:2015 standards for consistent service delivery.' },
            ].map((item) => (
              <div key={item.title} className="p-space-lg rounded-2xl bg-surface-container-low space-y-2">
                <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-space-2xl bg-surface-container-low">
        <div className="section-container text-center">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">Ready to book a test?</h2>
          <div className="flex flex-wrap justify-center gap-space-sm">
            <Link to="/book-home-collection" className="btn-secondary">
              Book Home Collection
            </Link>
            <a href={`tel:${SITE_CONFIG.phone}`} className="btn-outline">
              Call {SITE_CONFIG.phone}
            </a>
            <a href={generateWhatsAppUrl('Hello HealthCure, I would like to book a test.')} target="_blank" rel="noopener noreferrer" className="btn-primary">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
