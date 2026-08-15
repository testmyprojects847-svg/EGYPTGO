export interface Hotel {
  id: string
  name: string
  nameAr?: string
  city: string
  rating: string
  price: number
  image: string
  description?: string
  descriptionAr?: string
  /* Optional enrichment */
  reviews?: number
  stars?: number
  oldPrice?: number
  amenities?: string[]
  amenitiesAr?: string[]
  tag?: string
}
