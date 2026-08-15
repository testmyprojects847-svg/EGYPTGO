'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { RequireRole } from '@/components/auth/RequireRole'
import { BookingTable } from '@/components/admin/BookingTable'
import { DestinationForm } from '@/components/admin/DestinationForm'
import { HotelForm } from '@/components/admin/HotelForm'
import { PaymentTable } from '@/components/admin/PaymentTable'
import { ReviewModeration } from '@/components/admin/ReviewModeration'
import { StatCards } from '@/components/admin/StatCards'
import { Tabs } from '@/components/admin/Tabs'
import { TourTable } from '@/components/admin/TourTable'
import { UserTable } from '@/components/admin/UserTable'
import { useAuth } from '@/hooks/useAuth'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { bookingService } from '@/services/bookings/bookingService'
import { tourService } from '@/services/tours/tourService'
import { users } from '@/data/users'
import { routes } from '@/lib/routes'

function AdminDashboard() {
  const { t, dir, isRtl } = useLanguage()
  const { format } = useCurrency()
  const { signOut } = useAuth()
  const router = useRouter()
  const [tab, setTab] = useState('tours')
  const stats = bookingService.stats()

  const tabs = [
    { key: 'tours', label: t('toursManagement') },
    { key: 'destinations', label: t('destinationsManagement') },
    { key: 'hotels', label: t('hotelsManagement') },
    { key: 'bookings', label: t('bookingsManagement') },
    { key: 'users', label: t('usersManagement') },
    { key: 'reviews', label: t('reviewsModeration') },
    { key: 'payments', label: t('paymentsLogs') },
  ]

  return (
    <div dir={dir} className="min-h-screen bg-muted/30 pb-20">
      <div className="mx-auto max-w-6xl px-4 py-8 lg:px-10">
        <div className={`mb-8 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">EgyptGo</p>
            <h1 className="mt-1 text-2xl font-bold">{t('adminDashboard')}</h1>
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

        <StatCards
          items={[
            { label: t('totalRevenue'), value: format(stats.revenue) },
            { label: t('totalBookings'), value: String(stats.total) },
            { label: t('toursManagement'), value: String(tourService.list().length) },
            { label: t('usersManagement'), value: String(users.length) },
          ]}
        />

        <div className="rounded-2xl border border-border bg-card p-5">
          <Tabs tabs={tabs} active={tab} onChange={setTab} />
          {tab === 'tours' && <TourTable />}
          {tab === 'destinations' && <DestinationForm />}
          {tab === 'hotels' && <HotelForm />}
          {tab === 'bookings' && <BookingTable />}
          {tab === 'users' && <UserTable />}
          {tab === 'reviews' && <ReviewModeration />}
          {tab === 'payments' && <PaymentTable />}
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <RequireRole role="admin" redirectTo={routes.adminSignIn}>
      <AdminDashboard />
    </RequireRole>
  )
}
