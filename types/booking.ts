import type { Currency } from './index'

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Booking {
  id: string
  tourId: string
  tourTitle: string
  date: string
  travelers: number
  customerName: string
  customerEmail: string
  total: number
  status: BookingStatus
  createdAt: string
}

export interface PriceBreakdown {
  base: number
  serviceFee: number
  total: number
  currency: Currency
}

export interface PaymentRecord {
  id: string
  bookingId: string
  amount: number
  method: 'card' | 'wallet'
  status: 'paid' | 'refunded' | 'failed'
  createdAt: string
}
