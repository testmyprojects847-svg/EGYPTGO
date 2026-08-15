'use client'

import { useEffect, useState } from 'react'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { bookingService } from '@/services/bookings/bookingService'
import { formatDate } from '@/lib/utils'
import { DataTable, type Column } from './DataTable'
import type { Booking } from '@/types'

export function BookingTable() {
  const { t, locale } = useLanguage()
  const { format } = useCurrency()
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => setBookings(bookingService.list()), [])

  const columns: Column<Booking>[] = [
    { key: 'tour', header: t('toursManagement'), render: (booking) => <span className="font-semibold">{booking.tourTitle}</span> },
    { key: 'customer', header: t('usersManagement'), render: (booking) => booking.customerName },
    { key: 'date', header: t('travelDate'), render: (booking) => formatDate(booking.date, locale) },
    { key: 'total', header: t('total'), render: (booking) => format(booking.total) },
    {
      key: 'status',
      header: t('status'),
      render: (booking) => (
        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{booking.status}</span>
      ),
    },
    {
      key: 'actions',
      header: t('actions'),
      render: (booking) => (
        <button onClick={() => setBookings(bookingService.cancel(booking.id))} className="rounded-lg border border-destructive/30 px-2 py-1 text-xs text-destructive">
          {t('cancel')}
        </button>
      ),
    },
  ]

  return <DataTable columns={columns} rows={bookings} />
}
