'use client'

import Link from 'next/link'
import { Star } from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import type { Hotel } from '@/types'

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const { locale } = useLanguage()
  const { format } = useCurrency()
  return (
    <Link href={routes.hotel(hotel.id)} className="flex overflow-hidden rounded-2xl border border-border bg-card text-left transition hover:shadow-lg">
      <img src={hotel.image} alt={hotel.name} className="h-40 w-40 object-cover" />
      <div className="p-4">
        <h2 className="font-bold">{locale === 'ar' ? hotel.nameAr ?? hotel.name : hotel.name}</h2>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {hotel.city} · <Star className="inline size-3 fill-accent text-accent" /> {hotel.rating}
        </p>
        <p className="mt-7 text-lg font-bold">
          {format(hotel.price)}
          <span className="text-xs font-normal text-muted-foreground">/night</span>
        </p>
      </div>
    </Link>
  )
}
