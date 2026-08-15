'use client'

import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { hotels as seedHotels } from '@/data/hotels'
import { createId } from '@/lib/utils'
import { DataTable, type Column } from './DataTable'
import type { Hotel } from '@/types'

export function HotelForm() {
  const { t } = useLanguage()
  const [items, setItems] = useState<Hotel[]>(seedHotels)
  const [name, setName] = useState('')
  const [city, setCity] = useState('Cairo')
  const [price, setPrice] = useState('120')

  const columns: Column<Hotel>[] = [
    { key: 'name', header: t('hotelsManagement'), render: (hotel) => <span className="font-semibold">{hotel.name}</span> },
    { key: 'city', header: 'City', render: (hotel) => hotel.city },
    { key: 'price', header: 'USD', render: (hotel) => `$${hotel.price}` },
    {
      key: 'actions',
      header: t('actions'),
      render: (hotel) => (
        <button onClick={() => setItems(items.filter((entry) => entry.id !== hotel.id))} className="rounded-lg border border-destructive/30 px-2 py-1 text-xs text-destructive">
          {t('delete')}
        </button>
      ),
    },
  ]

  return (
    <div>
      <form
        className="mb-5 grid gap-2 rounded-xl bg-muted/50 p-4 sm:grid-cols-[1fr_1fr_140px_auto]"
        onSubmit={(event) => {
          event.preventDefault()
          if (!name.trim()) return
          setItems([...items, { id: createId('hotel'), name: name.trim(), city, rating: '4.5', price: Number(price) || 0, image: '/images/hotels/nile-view.png' }])
          setName('')
        }}
      >
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Hotel name" className="rounded-lg border border-border bg-background px-3 py-2 text-xs" />
        <input value={city} onChange={(event) => setCity(event.target.value)} placeholder="City" className="rounded-lg border border-border bg-background px-3 py-2 text-xs" />
        <input value={price} onChange={(event) => setPrice(event.target.value)} type="number" min="0" className="rounded-lg border border-border bg-background px-3 py-2 text-xs" />
        <button className="rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground">{t('addNew')}</button>
      </form>
      <DataTable columns={columns} rows={items} />
    </div>
  )
}
