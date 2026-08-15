'use client'

import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { currencyService } from '@/services/currency/currencyService'
import { DEFAULT_CURRENCY } from '@/lib/constants'
import type { Currency, PriceBreakdown } from '@/types'

interface CurrencyContextValue {
  currency: Currency
  setCurrency: (currency: Currency) => void
  toggleCurrency: () => void
  format: (amountUsd: number) => string
  breakdown: (pricePerPerson: number, travelers: number) => PriceBreakdown
}

export const CurrencyContext = createContext<CurrencyContextValue | null>(null)

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(DEFAULT_CURRENCY)

  useEffect(() => {
    setCurrencyState(currencyService.read())
  }, [])

  const setCurrency = useCallback((next: Currency) => {
    currencyService.save(next)
    setCurrencyState(next)
  }, [])

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      toggleCurrency: () => setCurrency(currency === 'USD' ? 'EGP' : 'USD'),
      format: (amountUsd: number) => currencyService.format(amountUsd, currency),
      breakdown: (pricePerPerson: number, travelers: number) => currencyService.breakdown(pricePerPerson, travelers, currency),
    }),
    [currency, setCurrency],
  )

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}
