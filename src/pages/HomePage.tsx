import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/HeroSection'
import TrustStrip from '../components/TrustStrip'
import FrequentlyBookedTests from '../components/FrequentlyBookedTests'
import HealthPackages from '../components/HealthPackages'
import PromotionalSection from '../components/PromotionalSection'
import SearchByRelevance from '../components/SearchByRelevance'
import DiagnosticExperience from '../components/DiagnosticExperience'
import WhyChooseSection from '../components/WhyChooseSection'
import WhoWeAre from '../components/WhoWeAre'
import TestimonialsSection from '../components/TestimonialsSection'
import LocationContact from '../components/LocationContact'

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>HealthCure Diagnostics — Trusted Pathology & Home Blood Collection, Kolkata</title>
        <meta name="description" content="HealthCure Diagnostics offers accurate diagnostic testing, affordable health packages, and gentle home blood collection in Kolkata. Book online or call 08327663438." />
      </Helmet>
      <HeroSection />
      <TrustStrip />
      <FrequentlyBookedTests />
      <HealthPackages />
      <PromotionalSection />
      <SearchByRelevance />
      <DiagnosticExperience />
      <WhyChooseSection />
      <WhoWeAre />
      <TestimonialsSection />
      <LocationContact />
    </>
  )
}
