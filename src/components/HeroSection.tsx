import { useState } from 'react'
import HomeCollectionForm from './HomeCollectionForm'
import { Link } from 'react-router-dom'

const SLIDER_TABS = [
  { id: '01', label: '01 Your Health. Our Priority', active: true },
  { id: '02', label: '02 Stay Ahead of Health Risks', active: false },
  { id: '03', label: '03 Diagnostic Care at Doorstep', active: false },
]

const HERO_CONTENT = [
  {
    headline: <>Your Health. Our Priority.<br /><span className="text-primary-container">Trusted Diagnostics</span> & <span className="text-secondary">Gentle Home Care.</span></>,
    subtext: 'Precision automated pathology testing with certified phlebotomists providing gentle doorstep sample pickup across Kolkata and Barasat within 60 minutes.',
  },
  {
    headline: <>Stay Ahead of<br /><span className="text-primary-container">Health Risks</span> with <span className="text-secondary">Early Detection.</span></>,
    subtext: 'Our comprehensive preventive health packages catch subtle metabolic and organ deviations early, giving you and your family the best chance of optimal health.',
  },
  {
    headline: <>Diagnostic Care<br /><span className="text-primary-container">at Your Doorstep</span> — <span className="text-secondary">Same Day Results.</span></>,
    subtext: 'Gentle, sterile home sample collection with temperature-controlled transport to our NABL-aligned lab. Reports delivered directly on WhatsApp in 6–12 hours.',
  },
]

const LAB_IMAGE = 'https://lh3.googleusercontent.com/aida/AEtjO1VdfdnV87Bc8JKlMxCjFP6ZiuFhr3RnriIQ5tjbmatkfKyZHd9s5sPvhedFU1TN-Z2YMFAuCOHtOTHZ2IJitTRm77lDb0eDA4UNEFnNUaTw-1lVzfh-5alAnDsNup-wMINJBBFNijK4mmFZl7VO6D_EZcEXj5uNnZxpPWWUuuJP3iS95xgi-gT4UQgSc7d7fK7vj4DsV_FOreYG77OQ_u_F-11AxH87tbt_MU9ITkOeXGiQ7QCExmKqmaA'

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const content = HERO_CONTENT[activeSlide]

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/40 via-surface to-surface pb-space-3xl pt-space-md">
      <div className="section-container">
        {/* Reassurance Badge Strip */}
        <div className="flex flex-wrap items-center gap-space-sm mb-space-md">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px]">verified</span>
            NABL Calibrated Diagnostic Protocols
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/10 text-primary-container font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px]">health_and_safety</span>
            100% Sterile Single-Use Vacutainers
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-tertiary font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            Reports in 6–12 Hrs via WhatsApp
          </span>
        </div>

        {/* Main 80/20 Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left: Hero Showcase (~70% desktop) */}
          <div className="lg:col-span-8 flex flex-col space-y-space-lg">
            {/* Slider Tabs */}
            <div className="flex items-center gap-space-xs overflow-x-auto pb-1 no-scrollbar">
              {SLIDER_TABS.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSlide(index)}
                  className={`px-4 py-2 rounded-full font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all whitespace-nowrap ${
                    index === activeSlide
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {index === activeSlide && (
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
                  )}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Hero Typography */}
            <div className="space-y-space-sm animate-fade-in">
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight leading-tight">
                {content.headline}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                {content.subtext}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-space-md pt-1">
              <Link
                to="/tests"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-primary-container hover:opacity-90 text-on-primary font-label-md text-label-md transition-all shadow-md active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[20px]">science</span>
                Explore Diagnostic Tests
              </Link>
              <Link
                to="/health-packages"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-primary font-label-md text-label-md transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                View Preventive Packages
              </Link>
              <div className="flex items-center gap-2 text-on-surface-variant pl-2">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
                </span>
                <span className="font-label-sm text-label-sm font-medium">Phlebotomists on duty now</span>
              </div>
            </div>

            {/* Featured Lab & Phlebotomy Visual Banner */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-lg mt-space-sm group">
              <img
                src={LAB_IMAGE}
                alt="Professional Indian phlebotomist carefully collecting blood sample in immaculate clean Kolkata diagnostic laboratory"
                className="w-full h-[300px] md:h-[360px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent flex flex-col justify-end p-space-lg text-on-primary">
                <div className="flex flex-wrap items-center justify-between gap-space-md">
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed mb-1 block">Patient-First Pathology</span>
                    <p className="font-headline-md text-headline-md text-on-primary font-semibold">Gentle Pediatric & Senior Phlebotomy</p>
                    <p className="font-body-sm text-body-sm text-primary-fixed-dim">Single-prick precision techniques with BD Vacutainer® vacuum safety tubes.</p>
                  </div>
                  <div className="flex items-center gap-space-md bg-surface-container-lowest/20 backdrop-blur-md px-4 py-2.5 rounded-xl">
                    <div className="text-center">
                      <p className="font-headline-sm text-headline-sm font-bold text-on-primary">60 Min</p>
                      <p className="font-caption text-caption text-primary-fixed-dim">Home Arrival</p>
                    </div>
                    <div className="w-px h-8 bg-surface-container-lowest/30"></div>
                    <div className="text-center">
                      <p className="font-headline-sm text-headline-sm font-bold text-secondary-fixed">0 Pain</p>
                      <p className="font-caption text-caption text-primary-fixed-dim">Comfort Tech</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Quick Booking Sticky Card (~30% desktop) */}
          <div className="lg:col-span-4 w-full">
            <HomeCollectionForm compact />
          </div>
        </div>
      </div>
    </section>
  )
}
