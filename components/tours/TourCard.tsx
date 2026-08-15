'use client'

import Link from 'next/link'
import { Heart, MapPin, Star } from 'lucide-react'
import { useCurrency } from '@/hooks/useCurrency'
import { useFavorites } from '@/hooks/useFavorites'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import type { Tour } from '@/types'

export function TourCard({ tour }: { tour: Tour }) {
  const { locale, t } = useLanguage()
  const { format } = useCurrency()
  const { isFavorite, toggle } = useFavorites()
  const title = locale === 'ar' ? tour.titleAr : tour.title
  const location = locale === 'ar' ? tour.locationAr : tour.location

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative h-40 overflow-hidden">
        <Link href={routes.tour(tour.id)}>
          <img src={tour.image} alt={title} className="size-full object-cover transition duration-500 group-hover:scale-105" />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-card/90 px-2.5 py-1 text-[10px] font-semibold text-primary">{tour.tag}</span>
        <button
          type="button"
          aria-label={t('myFavorites')}
          onClick={() => toggle(tour.id)}
          className="absolute right-3 top-3 grid size-7 place-items-center rounded-full bg-card/85 text-primary"
        >
          <Heart className={`size-3.5 ${isFavorite(tour.id) ? 'fill-accent text-accent' : ''}`} />
        </button>
      </div>
      <Link href={routes.tour(tour.id)} className="flex flex-col gap-2 p-3.5">
        <div>
          <p className="text-sm font-bold">{title}</p>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
            <MapPin className="size-3" />
            {location}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-2.5">
          <span className="flex items-center gap-1 text-[11px] font-medium">
            <Star className="size-3 fill-accent text-accent" />
            {tour.rating} <span className="text-muted-foreground">({tour.reviews})</span>
          </span>
          <span className="text-sm font-bold">
            {format(tour.price)}
            <small className="font-normal text-muted-foreground">/{t('perPerson')}</small>
          </span>
        </div>
      </Link>
    </div>
  )
}
