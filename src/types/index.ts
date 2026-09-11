// HealthCure Diagnostics - Type Definitions

export interface TestCategory {
  id: string
  name: string
  slug: string
  description?: string
  icon: string
  is_active: boolean
  display_order: number
  test_count?: number
}

export interface Test {
  id: string
  name: string
  slug: string
  category_id: string
  category?: TestCategory
  short_description: string
  description: string
  preparation?: string
  report_time: string
  price: number
  mrp: number
  home_collection_available: boolean
  center_visit_available: boolean
  is_featured: boolean
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
  // Stitch extended attributes
  method?: string
  specimen?: string
  parameters_count?: number
  badge?: string
  tagline?: string
  highlight?: string
}

export interface HealthPackage {
  id: string
  name: string
  slug: string
  short_description: string
  description: string
  price: number
  mrp: number
  parameter_count: number
  report_time: string
  tests?: Test[]
  is_featured: boolean
  is_popular?: boolean
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
  // Extended Stitch fields
  category?: string
  gender?: 'all' | 'male' | 'female'
  age_group?: string
  key_highlights?: string[]
  preparation_note?: string
  icon?: string
}

export interface Booking {
  id?: string
  booking_reference?: string
  patient_name: string
  mobile: string
  booking_type: 'home_collection' | 'center_visit'
  test_id?: string
  test?: Test
  package_id?: string
  package?: HealthPackage
  preferred_date: string
  preferred_time: string
  address?: string
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
  created_at?: string
}

export interface Testimonial {
  id: string
  name: string
  designation?: string
  location?: string
  message: string
  service_used?: string
  rating: number
  initials: string
  is_active: boolean
  display_order: number
}

export interface Certificate {
  id: string
  title: string
  description?: string
  image_url?: string
  is_active: boolean
  display_order: number
}

export interface PromotionalBanner {
  id: string
  title: string
  subtitle?: string
  description?: string
  bullet_points?: string[]
  price_from?: number
  button_text: string
  button_url: string
  color_variant: 'primary' | 'secondary' | 'cream'
  icon?: string
  is_active: boolean
  display_order: number
}

export interface WebsiteSetting {
  id: string
  key: string
  value: string
  description?: string
}

export interface SearchResult {
  type: 'test' | 'package' | 'category'
  id: string
  name: string
  slug: string
  description?: string
  price?: number
  category?: string
}
