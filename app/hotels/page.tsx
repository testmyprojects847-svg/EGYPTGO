'use client'

import { PageHeader } from '@/components/layout/PageHeader'
import { HotelCard } from '@/components/hotels/HotelCard'
import { hotels } from '@/data/hotels'
import { useLanguage } from '@/hooks/useLanguage'

export default function HotelsPage() {
  const { t, dir, locale } = useLanguage()
  return (
    <div dir={dir} className="mx-auto mb-20 max-w-6xl px-4 py-8 lg:px-10">
      <PageHeader
        eyebrow={locale === 'ar' ? 'إقامة مختارة' : 'Handpicked stays'}
        title={t('hotels')}
        description={locale === 'ar' ? 'إقامات مريحة قرب أهم المعالم.' : 'Stay close to the stories, temples, and river views.'}
      />
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  )
}
