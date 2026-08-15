'use client'

import { useEffect, useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { tourService } from '@/services/tours/tourService'
import type { Tour } from '@/types'

export function TourForm({ editing, onSaved, onCancel }: { editing?: Tour | null; onSaved: (tours: Tour[]) => void; onCancel: () => void }) {
  const { t } = useLanguage()
  const [title, setTitle] = useState('')
  const [titleAr, setTitleAr] = useState('')
  const [price, setPrice] = useState('150')

  useEffect(() => {
    setTitle(editing?.title ?? '')
    setTitleAr(editing?.titleAr ?? '')
    setPrice(String(editing?.price ?? 150))
  }, [editing])

  return (
    <form
      className="mb-5 grid gap-2 rounded-xl bg-muted/50 p-4 sm:grid-cols-[1fr_1fr_140px_auto_auto]"
      onSubmit={(event) => {
        event.preventDefault()
        if (!title.trim()) return
        onSaved(tourService.save({ title: title.trim(), titleAr: titleAr.trim(), price: Number(price) || 0 }, editing?.id))
        onCancel()
      }}
    >
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Tour title" className="rounded-lg border border-border bg-background px-3 py-2 text-xs" />
      <input value={titleAr} onChange={(event) => setTitleAr(event.target.value)} placeholder="اسم الجولة" className="rounded-lg border border-border bg-background px-3 py-2 text-xs" />
      <input value={price} onChange={(event) => setPrice(event.target.value)} type="number" min="0" placeholder="Price" className="rounded-lg border border-border bg-background px-3 py-2 text-xs" />
      <button className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">{editing ? t('save') : t('addNew')}</button>
      <button type="button" onClick={onCancel} className="rounded-lg border border-border px-3 py-2 text-xs">
        {t('cancel')}
      </button>
    </form>
  )
}
