'use client'

import Link from 'next/link'
import { Search } from 'lucide-react'
import { TourGrid } from '@/components/tours/TourGrid'
import { useLanguage } from '@/hooks/useLanguage'
import { useTours } from '@/hooks/useTours'
import { routes } from '@/lib/routes'

export function FeaturedTours() {
  const { t, isRtl } = useLanguage()
  const { results, query, setQuery } = useTours()
  const featuredTours = results.filter((tour) => tour.featured === true)
  const displayTours = (featuredTours.length ? featuredTours : results).slice(0, 6)

  return (
    <section className="mx-4 mb-20 mt-10 lg:mx-10">
      <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
        <h2 className="text-2xl font-bold">{t('featuredTours')}</h2>
        <Link href={routes.tours} className="text-xs font-semibold text-accent">
          {t('viewAll')}
        </Link>
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
        <Search className="size-4 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('searchPlaceholder')}
          className="w-full bg-transparent text-sm outline-none"
        />
      </div>
      <TourGrid tours={displayTours} />
    </section>
  )
}
