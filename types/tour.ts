export interface ItineraryDay {
  day: number
  title: string
  titleAr?: string
  details: string
  detailsAr?: string
}

export interface Tour {
  id: string
  title: string
  titleAr: string
  location: string
  locationAr: string
  price: number
  days: number
  nights: number
  rating: string
  reviews: number
  image: string
  tag: string
  description: string
  descriptionAr?: string
  published?: boolean
  /* Rich, optional fields — safe to omit on legacy/admin-created tours */
  images?: string[]
  category?: string
  tourType?: string
  tourTypeAr?: string
  language?: string
  languageAr?: string
  groupSize?: string
  destinationId?: string
  oldPrice?: number
  discount?: number
  availableSeats?: number
  featured?: boolean
  highlights?: string[]
  highlightsAr?: string[]
  itinerary?: ItineraryDay[]
  included?: string[]
  includedAr?: string[]
  excluded?: string[]
  excludedAr?: string[]
  meetingPoint?: string
  meetingPointAr?: string
  cancellation?: string
  cancellationAr?: string
}

export type TourDraft = Pick<Tour, 'title' | 'titleAr' | 'price'> & Partial<Tour>
