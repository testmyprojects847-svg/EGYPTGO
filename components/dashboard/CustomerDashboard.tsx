'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Tabs } from '@/components/admin/Tabs'
import { useAuth } from '@/hooks/useAuth'
import { useBookings } from '@/hooks/useBookings'
import { useCurrency } from '@/hooks/useCurrency'
import { useFavorites } from '@/hooks/useFavorites'
import { useLanguage } from '@/hooks/useLanguage'
import { useReviews } from '@/hooks/useReviews'
import { tourService } from '@/services/tours/tourService'
import { formatDate } from '@/lib/utils'
import { routes } from '@/lib/routes'

export function CustomerDashboard() {
  const { t, locale, dir, isRtl } = useLanguage()
  const { user, signOut } = useAuth()
  const { mine, cancel } = useBookings()
  const { favorites } = useFavorites()
  const { reviews } = useReviews()
  const { format } = useCurrency()
  const router = useRouter()
  const [tab, setTab] = useState('bookings')

  const myReviews = reviews.filter((review) => review.userId === user?.id)
  const tabs = [
    { key: 'bookings', label: t('myTrips') },
    { key: 'favorites', label: t('myFavorites') },
    { key: 'reviews', label: t('myReviews') },
    { key: 'profile', label: t('myProfile') },
  ]

  return (
    <div dir={dir} className="min-h-screen bg-muted/30 pb-20">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-10">
        <div className={`mb-8 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">{t('welcomeBack')}</p>
            <h1 className="mt-1 text-2xl font-bold">{user?.name}</h1>
          </div>
          <button
            onClick={() => {
              signOut()
              router.push(routes.home)
            }}
            className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground"
          >
            {t('logout')}
          </button>
        </div>

        <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {[
            { label: t('upcomingTrips'), value: mine.filter((booking) => booking.status !== 'cancelled').length },
            { label: t('myFavorites'), value: favorites.length },
            { label: t('myReviews'), value: myReviews.length },
          ].map((card) => (
            <div key={card.label} className="rounded-2xl bg-primary p-4 text-primary-foreground">
              <p className="text-[10px] text-primary-foreground/60">{card.label}</p>
              <p className="mt-2 text-2xl font-bold">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />

          {tab === 'bookings' && (
            <div className="space-y-3">
              {mine.length === 0 && <p className="text-xs text-muted-foreground">{t('noResults')}</p>}
              {mine.map((booking) => (
                <div key={booking.id} className={`flex items-center justify-between rounded-xl border border-border p-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <p className="font-semibold">{booking.tourTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(booking.date, locale)} · {format(booking.total)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{booking.status}</span>
                    {booking.status !== 'cancelled' && (
                      <button onClick={() => cancel(booking.id)} className="rounded-lg border border-destructive/30 px-2 py-1 text-xs text-destructive">
                        {t('cancel')}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === 'favorites' && (
            <div className="space-y-3">
              {favorites.length === 0 && <p className="text-xs text-muted-foreground">{t('noResults')}</p>}
              {favorites.map((id) => {
                const tour = tourService.getById(id)
                return (
                  <div key={id} className="rounded-xl border border-border p-4 text-sm font-semibold">
                    {tour ? (locale === 'ar' ? tour.titleAr : tour.title) : id}
                  </div>
                )
              })}
            </div>
          )}

          {tab === 'reviews' && (
            <div className="space-y-3">
              {myReviews.length === 0 && <p className="text-xs text-muted-foreground">{t('noResults')}</p>}
              {myReviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-border p-4">
                  <p className="text-xs font-semibold text-accent">{'★'.repeat(review.rating)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          )}

          {tab === 'profile' && (
            <div className="space-y-2 text-sm">
              <p className="font-semibold">{user?.name}</p>
              <p className="text-muted-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground">{user?.provider === 'google' ? 'Google account' : 'Password account'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
