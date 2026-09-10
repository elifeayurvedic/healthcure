import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE_CONFIG, TIME_SLOTS, generateBookingWhatsAppMessage, generateBookingReference } from '../lib/constants'

interface HomeCollectionFormProps {
  compact?: boolean
  preselectedTest?: string
  preselectedPackage?: string
}

export default function HomeCollectionForm({ compact = false, preselectedTest, preselectedPackage }: HomeCollectionFormProps) {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    test: preselectedTest || preselectedPackage || 'Complete Health Checkup (68 Tests) — ₹1,199',
    date: '',
    time: TIME_SLOTS[0],
    address: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Patient name is required'
    if (!form.mobile.trim() || !/^[0-9]{10}$/.test(form.mobile)) errs.mobile = 'Enter valid 10-digit mobile number'
    if (!form.date) errs.date = 'Please select a date'
    if (!form.address.trim()) errs.address = 'Address is required for home collection'
    return errs
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setLoading(true)

    // Simulate API call / Supabase insert
    await new Promise(resolve => setTimeout(resolve, 800))
    const ref = generateBookingReference()
    setLoading(false)
    setSubmitted(true)

    // Navigate to confirmation after short delay
    setTimeout(() => {
      navigate('/booking-confirmation', {
        state: {
          bookingReference: ref,
          patientName: form.name,
          mobile: form.mobile,
          test: form.test,
          bookingType: 'Home Collection',
          date: form.date,
          time: form.time,
          address: form.address,
        }
      })
    }, 1200)
  }

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => { const e = {...prev}; delete e[field]; return e })
  }

  const whatsappMessage = generateBookingWhatsAppMessage({
    name: form.name,
    test: form.test,
    date: form.date,
    time: form.time,
    address: form.address,
  })

  const TEST_OPTIONS = [
    'Complete Health Checkup (68 Tests) — ₹1,199',
    'Complete Blood Count (CBC) — ₹299',
    'HbA1c Blood Sugar Profile — ₹450',
    'Lipid & Cholesterol Profile — ₹599',
    'Thyroid Profile Total (T3, T4, TSH) — ₹399',
    'Liver Function Test (LFT) — ₹699',
    'Kidney Function Test (KFT) — ₹750',
    'Senior Citizen Health Package — ₹1,899',
    'Diabetes & Cardiac Care — ₹1,499',
    'Vitamin D & B12 Duo — ₹1,299',
    'Doctor Prescription Upload / Custom',
  ]

  if (submitted) {
    return (
      <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xl relative overflow-hidden flex flex-col items-center justify-center min-h-[200px] text-center gap-4">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-container via-secondary to-primary-container"></div>
        <span className="material-symbols-outlined text-[48px] text-secondary ms-filled">task_alt</span>
        <p className="font-headline-sm text-headline-sm text-on-surface">Booking Submitted!</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Our coordinator will call you within 10 minutes to confirm your slot.</p>
        <div className="w-8 h-1 bg-secondary/30 rounded-full animate-pulse"></div>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-xl relative overflow-hidden">
      {/* Accent top line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary-container via-secondary to-primary-container"></div>

      {/* Header */}
      <div className="flex items-center justify-between pb-space-sm mb-space-sm">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-lg bg-secondary/10 text-secondary">
            <span className="material-symbols-outlined text-[24px]">home_health</span>
          </span>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Book Home Collection</h3>
            <p className="font-caption text-caption text-secondary font-medium">Doorstep sample pickup in 60 mins</p>
          </div>
        </div>
        <span className="font-caption text-caption bg-surface-container px-2 py-1 rounded text-on-surface-variant">Instant</span>
      </div>

      {/* Form */}
      <form className="space-y-space-sm" onSubmit={handleSubmit} noValidate>
        {/* Patient Name */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Patient Full Name</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-[18px]">person</span>
            <input
              className={`w-full pl-9 pr-3 py-2.5 text-body-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/30 transition-all ${errors.name ? 'ring-2 ring-error/60 border-error' : ''}`}
              placeholder="e.g. Subrata Mukherjee"
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          {errors.name && <p className="font-caption text-caption text-error mt-1">{errors.name}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Mobile Number (+91)</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-[18px]">phone_iphone</span>
            <input
              className={`w-full pl-9 pr-3 py-2.5 text-body-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/30 transition-all ${errors.mobile ? 'ring-2 ring-error/60' : ''}`}
              placeholder="98XXXXXXXX"
              type="tel"
              maxLength={10}
              pattern="[0-9]{10}"
              value={form.mobile}
              onChange={(e) => handleChange('mobile', e.target.value.replace(/\D/g, ''))}
            />
          </div>
          {errors.mobile && <p className="font-caption text-caption text-error mt-1">{errors.mobile}</p>}
        </div>

        {/* Test Selection */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Select Test or Health Package</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-[18px]">medical_services</span>
            <select
              className="w-full pl-9 pr-8 py-2.5 text-body-md rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest appearance-none transition-all cursor-pointer"
              value={form.test}
              onChange={(e) => handleChange('test', e.target.value)}
            >
              {TEST_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-outline text-[18px]">expand_more</span>
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Date</label>
            <input
              className={`w-full px-2.5 py-2.5 text-body-sm rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest ${errors.date ? 'ring-2 ring-error/60' : ''}`}
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            {errors.date && <p className="font-caption text-caption text-error mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Time Slot</label>
            <select
              className="w-full px-2.5 py-2.5 text-body-sm rounded-lg bg-surface-container-low text-on-surface focus:outline-none focus:bg-surface-container-lowest cursor-pointer"
              value={form.time}
              onChange={(e) => handleChange('time', e.target.value)}
            >
              {TIME_SLOTS.map((slot) => (
                <option key={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block font-label-sm text-label-sm text-on-surface-variant mb-1">Kolkata / Barasat Address</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-3 text-outline text-[18px]">pin_drop</span>
            <input
              className={`w-full pl-9 pr-3 py-2.5 text-body-md rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container/30 transition-all ${errors.address ? 'ring-2 ring-error/60' : ''}`}
              placeholder="Flat/House, Landmark, Area Pincode"
              type="text"
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
          {errors.address && <p className="font-caption text-caption text-error mt-1">{errors.address}</p>}
        </div>

        {/* Submit */}
        <button
          className="w-full py-3.5 px-4 rounded-lg bg-secondary hover:bg-on-secondary-container text-on-secondary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] mt-2 disabled:opacity-60"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              Processing...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">verified_user</span>
              Confirm Home Collection Booking
            </>
          )}
        </button>

        {/* Or WhatsApp */}
        <a
          href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-4 rounded-lg border-2 border-secondary text-secondary font-label-md text-label-md flex items-center justify-center gap-2 hover:bg-secondary/5 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Book via WhatsApp Instead
        </a>

        {/* Trust microcopy */}
        <div className="pt-1 flex items-center justify-center gap-3 text-caption text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-[14px]">check_circle</span>
            Sterile Phlebotomists
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-[14px]">payments</span>
            Pay Cash or UPI on Pickup
          </span>
        </div>
      </form>
    </div>
  )
}
