'use client'

import { useCallback, useEffect, useState } from 'react'
import { bookingService } from '@/services/bookings/bookingService'
import { useAuth } from './useAuth'
import type { Booking, Currency, Tour } from '@/types'

export function useBookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setBookings(bookingService.list())
    setIsReady(true)
  }, [])

  const mine = user ? bookings.filter((booking) => booking.customerEmail === user.email) : []

  const create = useCallback(
    (tour: Tour, date: string, travelers: number, currency: Currency = 'USD') => {
      const customer = { name: user?.name ?? 'Guest', email: user?.email ?? 'guest@egyptgo.com' }
      const booking = bookingService.create(tour, customer, date, travelers, currency)
      setBookings(bookingService.list())
      return booking
    },
    [user],
  )

  const cancel = useCallback((id: string) => setBookings(bookingService.cancel(id)), [])

  return { bookings, mine, create, cancel, isReady }
}
