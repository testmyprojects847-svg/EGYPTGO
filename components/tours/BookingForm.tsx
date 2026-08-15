'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { useBookings } from '@/hooks/useBookings'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { validateBooking } from '@/lib/validation'
import { routes } from '@/lib/routes'
import type { Tour } from '@/types'

export function BookingForm({ tour }: { tour: Tour }) {
  const { t, locale, dir } = useLanguage()
  const { format, breakdown } = useCurrency()
  const { create } = useBookings()
  const [travelers, setTravelers] = useState(2)
  const [date, setDate] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const price = breakdown(tour.price, travelers)

  if (done)
    return (
      <div dir={dir} className="grid min-h-[560px] place-items-center px-4">
        <div className="max-w-sm text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-accent-foreground">
            <Check className="size-7" />
          </div>
          <h1 className="mt-5 text-3xl font-bold">{t('bookingConfirmed')}</h1>
          <Link href={routes.dashboard} className="mt-7 inline-block rounded-xl bg-primary px-5 py-3 text-xs font-bold text-primary-foreground">
            {t('goToDashboard')}
          </Link>
        </div>
      </div>
    )

  return (
    <div dir={dir} className="rounded-3xl border border-border bg-card p-6">
      <h1 className="text-2xl font-bold">{t('personalInfo')}</h1>
      {error && <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-xs font-semibold text-destructive">{error}</p>}
      <form
        className="mt-6 grid gap-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault()
          const message = validateBooking(travelers, date, locale)
          if (message) return setError(message)
          create(tour, date, travelers)
          setDone(true)
        }}
      >
        <label className="block">
          <p className="mb-2 text-xs font-semibold">{t('travelDate')}</p>
          <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs" />
        </label>
        <label className="block">
          <p className="mb-2 text-xs font-semibold">{t('travelers')}</p>
          <input type="number" min={1} max={20} value={travelers} onChange={(event) => setTravelers(Number(event.target.value))} className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs" />
        </label>

        <div className="mt-6 border-t border-border pt-6 sm:col-span-2">
          <h2 className="mb-4 text-sm font-bold">{t('paymentDetails')}</h2>
          <label className="mb-4 block">
            <p className="mb-2 text-xs font-semibold">{t('cardNumber')}</p>
            <input defaultValue="4532 1234 5678 9010" className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label>
              <p className="mb-2 text-xs font-semibold">{t('expiry')}</p>
              <input defaultValue="12/25" className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs" />
            </label>
            <label>
              <p className="mb-2 text-xs font-semibold">{t('cvv')}</p>
              <input defaultValue="123" className="w-full rounded-xl border border-border bg-background px-3 py-3 text-xs" />
            </label>
          </div>
        </div>

        <div className="mt-6 space-y-1 border-t border-border pt-6 text-sm sm:col-span-2">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>{tour.title}</span>
            <span>{format(price.base)}</span>
          </div>
          <div className="flex items-center justify-between text-muted-foreground">
            <span>Service fee</span>
            <span>{format(price.serviceFee)}</span>
          </div>
          <div className="flex items-center justify-between pt-2 font-semibold">
            <span>{t('total')}</span>
            <span className="text-2xl font-bold">{format(price.total)}</span>
          </div>
        </div>

        <button type="submit" className="mt-4 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground sm:col-span-2">
          {t('continueToPayment')}
        </button>
      </form>
    </div>
  )
}
