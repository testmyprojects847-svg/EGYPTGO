'use client'

import { useState } from 'react'
import { notFound, useParams } from 'next/navigation'
import { ShieldCheck, Star } from 'lucide-react'
import { BackLink } from '@/components/layout/BackLink'
import { getGuideById } from '@/data/guides'
import { useCurrency } from '@/hooks/useCurrency'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export default function GuideDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { locale, dir } = useLanguage()
  const { format } = useCurrency()
  const [booked, setBooked] = useState(false)
  const guide = getGuideById(id)
  if (!guide) notFound()

  return (
    <div dir={dir} className="mx-auto mb-20 max-w-5xl px-4 py-8 lg:px-10">
      <BackLink href={routes.guides} />
      <div className="grid gap-6 md:grid-cols-[0.8fr_1.2fr]">
        <img src={guide.image} alt={guide.name} className="h-72 w-full rounded-3xl object-cover" />
        <div className="rounded-3xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-accent" />
            <span className="text-xs font-semibold text-accent">{locale === 'ar' ? 'دليل موثق' : 'Verified guide'}</span>
          </div>
          <h1 className="mt-3 text-3xl font-bold">{locale === 'ar' ? guide.nameAr : guide.name}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {guide.city} · {guide.language}
          </p>
          <p className="mt-6 text-sm leading-6 text-muted-foreground">
            {locale === 'ar'
              ? 'دليل محلي شغوف يشارك القصص الخفية والثقافة الأصيلة في كل مدينة.'
              : `A passionate local expert specializing in ${guide.specialty.toLowerCase()}, with a warm, personal approach to every itinerary.`}
          </p>
          <div className="mt-6 flex items-center justify-between border-y border-border py-4">
            <span className="flex items-center gap-1 text-sm">
              <Star className="size-4 fill-accent text-accent" />
              {guide.rating} · {guide.reviews} reviews
            </span>
            <span className="text-lg font-bold">{format(guide.price)}/hr</span>
          </div>
          {booked ? (
            <div className="mt-6 rounded-xl bg-accent/10 p-4 text-sm font-semibold text-accent">
              {locale === 'ar' ? 'تم طلب الحجز. سيتواصل معك الدليل قريباً.' : 'Request sent. Your guide will contact you shortly.'}
            </div>
          ) : (
            <button onClick={() => setBooked(true)} className="mt-6 w-full rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground">
              {locale === 'ar' ? 'احجز هذا الدليل' : 'Request this guide'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
