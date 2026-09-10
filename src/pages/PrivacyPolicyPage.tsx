import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG } from '../lib/constants'

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy — HealthCure Diagnostics</title>
        <meta name="description" content="HealthCure Diagnostics privacy policy regarding patient data, test results, and information handling." />
      </Helmet>

      <div className="bg-surface-container-low py-space-xl">
        <div className="section-container">
          <span className="eyebrow">Legal</span>
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface tracking-tight mt-1">Privacy Policy</h1>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">Last updated: September 2026</p>
        </div>
      </div>

      <div className="section-container py-space-2xl max-w-3xl">
        <div className="space-y-space-lg font-body-md text-body-md text-on-surface-variant leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">1. Information We Collect</h2>
            <p>HealthCure Diagnostics collects the following personal information when you book a test or use our services:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Full name and contact number for booking coordination</li>
              <li>Home address for home collection services</li>
              <li>Test preferences and medical history provided voluntarily</li>
              <li>Payment method selection (cash/UPI — we do not store card details)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">2. How We Use Your Information</h2>
            <p>Your information is used strictly for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Scheduling and confirming your test bookings</li>
              <li>Dispatching our certified phlebotomists to your location</li>
              <li>Sending test reports via WhatsApp and SMS</li>
              <li>Internal quality audit and compliance reporting</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">3. Data Security</h2>
            <p>All test reports are sent via end-to-end encrypted WhatsApp messages. Patient data is stored securely and is never sold to third-party commercial entities. Access to patient records is restricted to authorized laboratory staff only.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">4. Report Retention</h2>
            <p>Test results are retained in our system for a period of 3 years to facilitate re-upload requests. Physical report copies are available at our center on request.</p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline-md text-headline-md text-on-surface">5. Contact Us</h2>
            <p>For any privacy concerns, data requests, or report deletion requests, contact us at:</p>
            <div className="p-4 bg-surface-container-low rounded-xl">
              <p className="font-label-md text-label-md text-on-surface">{SITE_CONFIG.name}</p>
              <p>{SITE_CONFIG.address}</p>
              <p>Phone: <a href={`tel:${SITE_CONFIG.phone}`} className="text-primary hover:underline">{SITE_CONFIG.phone}</a></p>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
