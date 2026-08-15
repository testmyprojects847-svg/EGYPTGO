import { EGP_PER_USD, SERVICE_FEE_RATE } from './constants'
import type { Currency, PriceBreakdown } from '@/types'

export function convertPrice(amountUsd: number, currency: Currency): number {
  return currency === 'EGP' ? amountUsd * EGP_PER_USD : amountUsd
}

export function formatPrice(amountUsd: number, currency: Currency = 'USD'): string {
  const amount = Math.round(convertPrice(amountUsd, currency))
  return currency === 'EGP' ? `${amount.toLocaleString()} EGP` : `$${amount.toLocaleString()}`
}

export function calculatePrice(pricePerPerson: number, travelers: number, currency: Currency): PriceBreakdown {
  const base = pricePerPerson * Math.max(1, travelers)
  const serviceFee = Math.round(base * SERVICE_FEE_RATE)
  return { base, serviceFee, total: base + serviceFee, currency }
}
