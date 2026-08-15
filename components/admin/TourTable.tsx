'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { tourService } from '@/services/tours/tourService'
import { DataTable, type Column } from './DataTable'
import { TourForm } from './TourForm'
import type { Tour } from '@/types'

export function TourTable() {
  const { t, locale } = useLanguage()
  const [tours, setTours] = useState<Tour[]>([])
  const [editing, setEditing] = useState<Tour | null>(null)

  useEffect(() => setTours(tourService.list()), [])

  const columns: Column<Tour>[] = [
    { key: 'title', header: t('toursManagement'), render: (tour) => <span className="font-semibold">{locale === 'ar' ? tour.titleAr : tour.title}</span> },
    { key: 'price', header: 'USD', render: (tour) => `$${tour.price}` },
    { key: 'status', header: t('status'), render: (tour) => (tour.published === false ? t('unpublish') : t('publish')) },
    {
      key: 'actions',
      header: t('actions'),
      render: (tour) => (
        <div className="flex gap-2">
          <button onClick={() => setEditing(tour)} className="rounded-lg border border-border px-2 py-1 text-xs">
            {t('edit')}
          </button>
          <button onClick={() => setTours(tourService.togglePublished(tour.id))} className="rounded-lg border border-border px-2 py-1 text-xs">
            {tour.published === false ? t('publish') : t('unpublish')}
          </button>
          <button onClick={() => setTours(tourService.remove(tour.id))} className="rounded-lg border border-destructive/30 px-2 py-1 text-xs text-destructive">
            {t('delete')}
          </button>
        </div>
      ),
    },
  ]

  return (
    <div>
      <TourForm editing={editing} onSaved={setTours} onCancel={() => setEditing(null)} />
      <DataTable columns={columns} rows={tours} />
    </div>
  )
}
