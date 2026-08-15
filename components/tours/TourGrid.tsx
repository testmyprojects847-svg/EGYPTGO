'use client'

import { TourCard } from './TourCard'
import { useLanguage } from '@/hooks/useLanguage'
import type { Tour } from '@/types'

export function TourGrid({ tours }: { tours: Tour[] }) {
  const { t } = useLanguage()
  if (!tours.length) return <p className="mt-8 text-sm text-muted-foreground">{t('noResults')}</p>
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  )
}
