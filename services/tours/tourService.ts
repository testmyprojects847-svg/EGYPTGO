import { tours as seedTours } from '@/data/tours'
import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import { createId } from '@/lib/utils'
import type { Locale, Tour } from '@/types'

export const tourService = {
  list(): Tour[] {
    return storageService.get<Tour[]>(STORAGE_KEYS.adminTours, seedTours)
  },
  listPublished(): Tour[] {
    return tourService.list().filter((tour) => tour.published !== false)
  },
  listFeatured(): Tour[] {
    const published = tourService.listPublished()
    const featured = published.filter((tour) => tour.featured === true)
    return featured.length ? featured : published.slice(0, 6)
  },
  getById(id: string): Tour | undefined {
    return tourService.list().find((tour) => tour.id === id)
  },
  search(query: string, locale: Locale = 'en'): Tour[] {
    const term = query.trim().toLowerCase()
    if (!term) return tourService.listPublished()
    return tourService.listPublished().filter((tour) => {
      const title = locale === 'ar' ? tour.titleAr : tour.title
      const location = locale === 'ar' ? tour.locationAr : tour.location
      return `${title} ${location}`.toLowerCase().includes(term)
    })
  },
  save(draft: Partial<Tour> & { title: string; price: number }, editingId?: string): Tour[] {
    const current = tourService.list()
    const id = editingId ?? createId('tour')
    const next: Tour = {
      id,
      title: draft.title,
      titleAr: draft.titleAr || draft.title,
      location: draft.location ?? 'Cairo',
      locationAr: draft.locationAr ?? 'القاهرة',
      price: draft.price,
      days: draft.days ?? 1,
      nights: draft.nights ?? 0,
      rating: draft.rating ?? '5.0',
      reviews: draft.reviews ?? 0,
      image: draft.image ?? '/images/tours/giza.png',
      tag: draft.tag ?? 'New',
      description: draft.description ?? 'A new EgyptGo experience.',
      published: draft.published ?? true,
    }
    const updated = editingId ? current.map((tour) => (tour.id === editingId ? { ...tour, ...next } : tour)) : [...current, next]
    storageService.set(STORAGE_KEYS.adminTours, updated)
    return updated
  },
  togglePublished(id: string): Tour[] {
    const updated = tourService.list().map((tour) => (tour.id === id ? { ...tour, published: !(tour.published ?? true) } : tour))
    storageService.set(STORAGE_KEYS.adminTours, updated)
    return updated
  },
  remove(id: string): Tour[] {
    const updated = tourService.list().filter((tour) => tour.id !== id)
    storageService.set(STORAGE_KEYS.adminTours, updated)
    return updated
  },
}
