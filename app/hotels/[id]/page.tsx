'use client'

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { BackLink } from '@/components/layout/BackLink'
import { getHotelById } from '@/data/hotels'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export default function HotelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { locale, dir } = useLanguage()
  const { format } = useCurrency()
  const [booked, setBooked] = useState(false)
  const hotel = getHotelById(id)
  if (!hotel) notFound()

  return (
    <div dir={dir} className="mx-auto mb-20 max-w-4xl px-4 py-8 lg:px-10">
      <BackLink href={routes.hotels} />
      <img src={hotel.image} alt={hotel.name} className="h-72 w-full rounded-3xl object-cover" />
      <h1 className="mt-6 text-3xl font-bold">{locale === 'ar' ? hotel.nameAr ?? hotel.name : hotel.name}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {hotel.city} · {hotel.rating} ★ · {format(hotel.price)}/night
      </p>
      {hotel.description && <p className="mt-4 text-sm leading-6 text-muted-foreground">{hotel.description}</p>}
      {booked ? (
        <p className="mt-6 rounded-xl bg-accent/10 p-4 text-sm font-semibold text-accent">
          {locale === 'ar' ? 'تم حفظ طلب الإقامة.' : 'Stay request saved to your account.'}
        </p>
      ) : (
        <button onClick={() => setBooked(true)} className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">
          {locale === 'ar' ? 'احجز الغرفة' : 'Reserve room'}
        </button>
      )}
    </div>
  )
}
