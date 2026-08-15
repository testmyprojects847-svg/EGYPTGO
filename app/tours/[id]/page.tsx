'use client'

import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { Calendar, Heart, MapPin, Star } from 'lucide-react'
import { BackLink } from '@/components/layout/BackLink'
import { TourReviews } from '@/components/reviews/TourReviews'
import { useCurrency } from '@/hooks/useCurrency'
import { useFavorites } from '@/hooks/useFavorites'
import { useLanguage } from '@/hooks/useLanguage'
import { getTourById } from '@/data/tours'
import { routes } from '@/lib/routes'

export default function TourDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { t, locale, dir } = useLanguage()
  const { format } = useCurrency()
  const { isFavorite, toggle } = useFavorites()
  const tour = getTourById(id)
  if (!tour) notFound()

  const title = locale === 'ar' ? tour.titleAr : tour.title
  const location = locale === 'ar' ? tour.locationAr : tour.location
  const description = locale === 'ar' ? tour.descriptionAr ?? tour.description : tour.description

  return (
    <div dir={dir} className="mx-auto mb-20 max-w-6xl px-4 py-5 lg:px-10">
      <BackLink href={routes.tours} />
      <div className="grid gap-5 lg:grid-cols-[1.5fr_0.8fr]">
        <div>
          <div className="relative overflow-hidden rounded-3xl">
            <img src={tour.image} alt={title} className="h-72 w-full object-cover md:h-[390px]" />
            <button onClick={() => toggle(tour.id)} className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-card/90">
              <Heart className={`size-4 ${isFavorite(tour.id) ? 'fill-accent text-accent' : ''}`} />
            </button>
          </div>
          <div className="py-5">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3.5 text-accent" />
              {location}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 border-y border-border py-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="size-3.5 fill-accent text-accent" /> {tour.rating} ({tour.reviews})
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="size-3.5" /> {tour.days} {t('days')}, {tour.nights} {t('nights')}
            </span>
          </div>
          <div className="py-5">
            <h2 className="text-sm font-bold">{t('aboutThisTour')}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{description}</p>
            <TourReviews tourId={tour.id} />
          </div>
        </div>
        <div className="h-fit rounded-3xl border border-border bg-card p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">{t('bookNow')}</p>
          <p className="mt-4 text-3xl font-bold">{format(tour.price)}</p>
          <p className="text-xs text-muted-foreground">{t('perPerson')}</p>
          <Link href={routes.booking(tour.id)} className="mt-6 block w-full rounded-xl bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground">
            {t('bookNow')}
          </Link>
        </div>
      </div>
    </div>
  )
}
