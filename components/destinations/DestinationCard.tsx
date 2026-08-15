'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'
import type { Destination } from '@/types'

export function DestinationCard({ destination }: { destination: Destination }) {
  const { locale } = useLanguage()
  return (
    <Link href={routes.destination(destination.id)} className="group overflow-hidden rounded-2xl text-left">
      <img
        src={destination.image}
        alt={destination.name}
        className="h-48 w-full rounded-2xl object-cover transition group-hover:scale-105"
      />
      <p className="mt-2 font-bold">{locale === 'ar' ? destination.nameAr : destination.name}</p>
    </Link>
  )
}
