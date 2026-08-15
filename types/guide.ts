export interface Guide {
  id: string
  name: string
  nameAr: string
  city: string
  language: string
  specialty: string
  rating: string
  reviews: number
  price: number
  image: string
  verified: boolean
  bio?: string
  bioAr?: string
  availability?: boolean
  assignedTours?: number
  active?: boolean
}
