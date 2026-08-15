import { bookings as seedBookings } from '@/data/bookings'
import { calculatePrice } from '@/lib/currency'
import { createId } from '@/lib/utils'
import { storageService } from '../storage/storageService'
import { STORAGE_KEYS } from '../storage/storageKeys'
import type { Booking, BookingStatus, Currency, Tour, User } from '@/types'

export const bookingService = {
  list(): Booking[] {
    return storageService.get<Booking[]>(STORAGE_KEYS.bookings, seedBookings)
  },
  listForUser(email: string): Booking[] {
    return bookingService.list().filter((booking) => booking.customerEmail === email)
  },
  create(tour: Tour, user: Pick<User, 'name' | 'email'>, date: string, travelers: number, currency: Currency = 'USD'): Booking {
    const price = calculatePrice(tour.price, travelers, currency)
    const booking: Booking = { id: createId('b'), tourId: tour.id, tourTitle: tour.title, date, travelers, customerName: user.name, customerEmail: user.email, total: price.total, status: 'pending', createdAt: new Date().toISOString() }
    storageService.set(STORAGE_KEYS.bookings, [...bookingService.list(), booking])
    return booking
  },
  updateStatus(id: string, status: BookingStatus): Booking[] {
    const updated = bookingService.list().map((booking) => booking.id === id ? { ...booking, status } : booking)
    storageService.set(STORAGE_KEYS.bookings, updated)
    return updated
  },
  cancel(id: string) { return bookingService.updateStatus(id, 'cancelled') },
  remove(id: string): Booking[] {
    const updated = bookingService.list().filter((booking) => booking.id !== id)
    storageService.set(STORAGE_KEYS.bookings, updated)
    return updated
  },
  stats() {
    const all = bookingService.list()
    return { total: all.length, confirmed: all.filter((booking) => booking.status === 'confirmed').length, revenue: all.filter((booking) => booking.status !== 'cancelled').reduce((sum, booking) => sum + booking.total, 0) }
  },
}

export function exportBookingsCsv(bookings: Booking[]) {
  const header = ['Reference', 'Customer', 'Email', 'Tour', 'Date', 'Travelers', 'Total', 'Status']
  const rows = bookings.map((booking) => [booking.id, booking.customerName, booking.customerEmail, booking.tourTitle, booking.date, booking.travelers, booking.total, booking.status])
  return [header, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')).join('\n')
}

export type { BookingStatus }
