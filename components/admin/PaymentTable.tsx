'use client'

import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { payments } from '@/data/bookings'
import { formatDate } from '@/lib/utils'
import { DataTable, type Column } from './DataTable'
import type { PaymentRecord } from '@/types'

export function PaymentTable() {
  const { t, locale } = useLanguage()
  const { format } = useCurrency()

  const columns: Column<PaymentRecord>[] = [
    { key: 'id', header: 'ID', render: (payment) => <span className="font-semibold">{payment.id}</span> },
    { key: 'booking', header: t('bookingsManagement'), render: (payment) => payment.bookingId },
    { key: 'amount', header: t('total'), render: (payment) => format(payment.amount) },
    { key: 'method', header: 'Method', render: (payment) => payment.method },
    { key: 'status', header: t('status'), render: (payment) => payment.status },
    { key: 'date', header: t('travelDate'), render: (payment) => formatDate(payment.createdAt, locale) },
  ]

  return <DataTable columns={columns} rows={payments} />
}
