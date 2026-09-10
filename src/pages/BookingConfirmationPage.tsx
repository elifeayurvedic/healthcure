import { useLocation, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { SITE_CONFIG, generateWhatsAppUrl } from '../lib/constants'

interface BookingState {
  bookingReference: string
  patientName: string
  mobile: string
  test: string
  bookingType: string
  date: string
  time: string
  address?: string
}

export default function BookingConfirmationPage() {
  const location = useLocation()
  const state = location.state as BookingState | null

  const whatsappMsg = state
    ? `Hello HealthCure Diagnostics! My booking reference is ${state.bookingReference}. Patient: ${state.patientName}. Test: ${state.test}. Date: ${state.date} at ${state.time}.`
    : 'Hello HealthCure Diagnostics, I need help with my booking.'

  if (!state) {
    return (
      <div className="section-container py-space-3xl text-center">
        <span className="material-symbols-outlined text-[48px] text-outline">error_outline</span>
        <h1 className="font-headline-md text-headline-md text-on-surface mt-4">No booking found</h1>
        <Link to="/book-home-collection" className="btn-secondary mt-space-md inline-flex">
          Book a Test
        </Link>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Booking Confirmed — HealthCure Diagnostics</title>
      </Helmet>

      <div className="min-h-screen bg-surface-container-low flex items-center justify-center py-space-2xl px-4">
        <div className="w-full max-w-lg">
          <div className="bg-surface-container-lowest rounded-3xl p-space-xl shadow-sticky relative overflow-hidden">
            {/* Green accent top */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-primary-container to-secondary"></div>

            {/* Success icon */}
            <div className="flex justify-center mb-space-lg">
              <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[48px] text-secondary ms-filled">task_alt</span>
              </div>
            </div>

            {/* Headline */}
            <div className="text-center mb-space-xl">
              <h1 className="font-display-lg text-display-lg-mobile text-on-surface font-extrabold">Booking Confirmed!</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Our phlebotomist coordinator will call within 10 minutes to confirm your exact arrival time.
              </p>
            </div>

            {/* Reference Card */}
            <div className="bg-primary-container/10 rounded-2xl p-space-md mb-space-lg text-center">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Your Booking Reference</p>
              <p className="font-headline-xl text-headline-xl font-extrabold text-primary-container tracking-widest">{state.bookingReference}</p>
              <p className="font-caption text-caption text-on-surface-variant mt-1">Keep this for your records</p>
            </div>

            {/* Booking Details */}
            <div className="space-y-space-sm mb-space-lg">
              {[
                { icon: 'person', label: 'Patient', value: state.patientName },
                { icon: 'phone_iphone', label: 'Mobile', value: state.mobile },
                { icon: 'medical_services', label: 'Test / Package', value: state.test },
                { icon: 'calendar_today', label: 'Date', value: state.date },
                { icon: 'schedule', label: 'Time Slot', value: state.time },
                ...(state.address ? [{ icon: 'pin_drop', label: 'Address', value: state.address }] : []),
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-xl">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-caption text-caption text-on-surface-variant">{item.label}</p>
                    <p className="font-label-md text-label-md text-on-surface font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Next steps */}
            <div className="space-y-3">
              <a
                href={generateWhatsAppUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                Track on WhatsApp
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone}`}
                className="w-full py-3 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-primary-container">call</span>
                Call {SITE_CONFIG.phone}
              </a>
              <Link
                to="/"
                className="w-full py-3 rounded-xl border-2 border-surface-container-high text-on-surface-variant font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">home</span>
                Back to Home
              </Link>
            </div>

            {/* Footer note */}
            <p className="text-center font-caption text-caption text-on-surface-variant mt-space-md">
              📋 Fasting tests require 8–10 hrs fast. Water is allowed. Please be ready 15 mins before your slot.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
