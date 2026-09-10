// HealthCure Diagnostics — Site Constants

export const SITE_CONFIG = {
  name: 'HealthCure Diagnostics',
  tagline: 'Your Health. Our Priority.',
  phone: '08327663438',
  phoneFormatted: '+91 83276 63438',
  whatsappNumber: '918327663438',
  address: '122/5, Jessore Rd, Bara6, Banamalipur, Kolkata, West Bengal 700124',
  addressShort: 'Jessore Rd, Barasat & Kolkata',
  googleMapsUrl: 'https://maps.app.goo.gl/wNYQHpn1sEkdjngZA',
  openingHours: 'Mon – Sun: 6:30 AM – 8:30 PM',
  email: 'info@healthcurediagnostics.in',
  website: 'https://healthcurediagnostics.in',
}

export const TIME_SLOTS = [
  '06:30 AM – 08:00 AM (Fasting)',
  '08:00 AM – 10:00 AM',
  '10:00 AM – 12:00 PM',
  '04:00 PM – 07:00 PM',
]

export const BOOKING_TYPES = {
  HOME_COLLECTION: 'home_collection' as const,
  CENTER_VISIT: 'center_visit' as const,
}

export function generateWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}

export function generateBookingWhatsAppMessage(data?: {
  name?: string
  test?: string
  date?: string
  time?: string
  address?: string
}): string {
  if (!data) {
    return 'Hello HealthCure Diagnostics, I would like to book a diagnostic test / home collection.'
  }
  const lines = ['Hello HealthCure Diagnostics, I would like to book a diagnostic test.']
  if (data.name) lines.push(`Patient Name: ${data.name}`)
  if (data.test) lines.push(`Test/Package: ${data.test}`)
  if (data.date) lines.push(`Preferred Date: ${data.date}`)
  if (data.time) lines.push(`Preferred Time: ${data.time}`)
  if (data.address) lines.push(`Address: ${data.address}`)
  return lines.join('\n')
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString('en-IN')}`
}

export function formatDiscount(price: number, mrp: number): number {
  return Math.round(((mrp - price) / mrp) * 100)
}

export function generateBookingReference(): string {
  const prefix = 'HC'
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 5).toUpperCase()
  return `${prefix}${timestamp}${random}`
}
