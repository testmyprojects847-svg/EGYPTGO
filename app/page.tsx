import { Hero } from '@/components/home/Hero'
import { PopularDestinations } from '@/components/home/PopularDestinations'
import { FeaturedTours } from '@/components/home/FeaturedTours'

export default function HomePage() {
  return (
    <>
      <Hero />
      <PopularDestinations />
      <FeaturedTours />
    </>
  )
}
