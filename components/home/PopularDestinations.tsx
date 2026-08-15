'use client'

import { destinations } from '@/data/destinations'
import { DestinationCard } from '@/components/destinations/DestinationCard'
import { useLanguage } from '@/hooks/useLanguage'

export function PopularDestinations() {
  const { t, isRtl } = useLanguage()
  return (
    <section className="mx-4 mt-10 lg:mx-10">
      <h2 className={`text-2xl font-bold ${isRtl ? 'text-right' : 'text-left'}`}>{t('popularDestinations')}</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  )
}
