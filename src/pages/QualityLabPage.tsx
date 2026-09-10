import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { SITE_CONFIG, generateWhatsAppUrl } from '../lib/constants'

const LAB_STANDARDS = [
  {
    icon: 'verified',
    title: 'NABL Aligned Protocols',
    desc: 'All laboratory procedures follow NABL (National Accreditation Board for Testing and Calibration Laboratories) standard operating protocols for maximum accuracy.',
    color: 'bg-primary-container text-on-primary',
  },
  {
    icon: 'science',
    title: 'Bio-Rad QC Sera',
    desc: 'Daily quality control using Bio-Rad Lyphocheck QC material to validate analyzer performance before processing patient samples.',
    color: 'bg-secondary text-on-secondary',
  },
  {
    icon: 'qr_code_2',
    title: 'Barcode Chain of Custody',
    desc: 'Every specimen is barcoded at the point of collection. Zero sample mix-ups with electronic chain of custody from patient to analyzer.',
    color: 'bg-primary-container text-on-primary',
  },
  {
    icon: 'local_shipping',
    title: 'Cold Chain Logistics',
    desc: 'All blood specimens transported in 4°C insulated cold chain units. Temperature logged throughout transport to guarantee pre-analytical integrity.',
    color: 'bg-secondary text-on-secondary',
  },
  {
    icon: 'health_and_safety',
    title: 'MD Pathologist Sign-Off',
    desc: 'All results are reviewed by senior MD Pathologists. Abnormal values are mandatorily re-run and independently reviewed before report release.',
    color: 'bg-tertiary text-on-tertiary',
  },
  {
    icon: 'workspace_premium',
    title: 'ISO 9001:2015 Assured',
    desc: 'Our quality management system conforms to ISO 9001:2015 international standards ensuring consistent, reliable service delivery.',
    color: 'bg-primary-container text-on-primary',
  },
]

const EQUIPMENT = [
  { name: 'Hematology Analyzer', desc: '5-part automated CBC with 24 parameters', icon: 'bloodtype' },
  { name: 'Biochemistry Analyzer', desc: 'Fully automated photometric with ISE module', icon: 'science' },
  { name: 'Immunoassay System', desc: 'ECLIA for hormones, cardiac, thyroid markers', icon: 'monitoring' },
  { name: 'HPLC System', desc: 'High-precision HbA1c, hemoglobin fractionation', icon: 'biotech' },
  { name: 'Urine Analyzer', desc: 'Automated 12-parameter dipstick + microscopy', icon: 'water_drop' },
  { name: 'Coagulation Analyzer', desc: 'PT, APTT, D-Dimer clot detection', icon: 'favorite' },
]

export default function QualityLabPage() {
  return (
    <>
      <Helmet>
        <title>Quality & Lab Standards — HealthCure Diagnostics, Kolkata</title>
        <meta name="description" content="HealthCure Diagnostics operates under NABL-aligned protocols with Bio-Rad QC systems, MD Pathologist oversight, and cold-chain specimen logistics in Kolkata." />
      </Helmet>

      {/* Hero */}
      <div className="bg-primary-container py-space-2xl">
        <div className="section-container text-on-primary">
          <span className="eyebrow text-primary-fixed-dim">Our Clinical Standards</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary mt-1">
            Quality & Lab Excellence
          </h1>
          <p className="font-body-lg text-body-lg text-primary-fixed-dim mt-2 max-w-2xl leading-relaxed">
            Every HealthCure test result passes through a multi-tier quality validation process before it reaches your WhatsApp.
          </p>
        </div>
      </div>

      {/* Quality Standards Grid */}
      <section className="py-space-2xl bg-surface">
        <div className="section-container">
          <div className="mb-space-xl">
            <span className="eyebrow">Rigorous Standards</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">
              Clinical Quality Controls
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {LAB_STANDARDS.map((item) => (
              <div key={item.title} className="p-space-lg rounded-2xl bg-surface-container-low space-y-3 hover:bg-surface-container transition-colors">
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                  <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface">{item.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section style={{ backgroundColor: '#F4F3DF' }} className="py-space-2xl">
        <div className="section-container">
          <div className="mb-space-xl">
            <span className="eyebrow">State-of-the-Art Instruments</span>
            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">
              Diagnostic Equipment at HealthCure
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-2xl">
              Calibrated precision instruments with certified performance validation, operated by trained biomedical laboratory scientists.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {EQUIPMENT.map((item) => (
              <div key={item.name} className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-card flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-xl bg-primary-container/10 text-primary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{item.name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-analytical Safety */}
      <section className="py-space-2xl bg-surface">
        <div className="section-container">
          <div className="bg-surface-container-lowest rounded-3xl p-space-xl shadow-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-center">
              <div className="space-y-space-md">
                <span className="eyebrow">Phlebotomy Safety</span>
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight">
                  Single-Prick Precision.<br />100% Sterile. Zero Cross-Infection.
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  All home collection phlebotomists carry BD Vacutainer® single-use vacuum collection tubes, pre-labelled with barcodes, sealed in sterile pouches. Every collection kit is opened in front of the patient. Needles are disposed of in sealed sharps containers immediately post-collection.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['BD Vacutainer® Tubes', 'Sterile Single-Use Lancets', 'Sealed Sharps Containers', 'PPE Gloves & Mask', 'Clinical Hand Sanitization'].map((item) => (
                    <span key={item} className="px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
                      ✓ {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {['Zero sample mix-up with barcode traceability', 'Cold-chain maintained from home to lab', 'Report re-run protocol for all abnormal values', 'Pediatric-trained phlebotomists available', 'Female phlebotomist on request'].map((point) => (
                  <div key={point} className="flex items-center gap-3 p-3 bg-surface-container-low rounded-xl">
                    <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">check_circle</span>
                    <span className="font-body-md text-body-md text-on-surface">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="section-container text-center">
          <h2 className="font-headline-xl text-headline-xl text-on-surface mb-space-md">Book Your Diagnostic Test Today</h2>
          <div className="flex flex-wrap justify-center gap-space-sm">
            <Link to="/book-home-collection" className="btn-secondary">
              Book Home Collection
            </Link>
            <a href={`tel:${SITE_CONFIG.phone}`} className="btn-primary">
              Call {SITE_CONFIG.phone}
            </a>
            <a href={generateWhatsAppUrl('Hello HealthCure Diagnostics!')} target="_blank" rel="noopener noreferrer" className="btn-outline">
              WhatsApp Chat
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
