'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { tourService } from '@/services/tours/tourService'
import { useLanguage } from './useLanguage'
import type { Tour } from '@/types'

export function useTours(initial: Tour[] = []) {
  const { locale } = useLanguage()
  const [tours, setTours] = useState<Tour[]>(initial)
  const [query, setQuery] = useState('')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setTours(tourService.list())
    setIsReady(true)
  }, [])

  const refresh = useCallback((next?: Tour[]) => setTours(next ?? tourService.list()), [])

  const published = useMemo(() => tours.filter((tour) => tour.published !== false), [tours])
  const results = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return published
    return published.filter((tour) => {
      const title = locale === 'ar' ? tour.titleAr : tour.title
      const location = locale === 'ar' ? tour.locationAr : tour.location
      return `${title} ${location}`.toLowerCase().includes(term)
    })
  }, [published, query, locale])

  return { tours, published, results, query, setQuery, refresh, isReady }
}
