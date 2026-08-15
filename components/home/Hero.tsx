'use client'

import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { routes } from '@/lib/routes'

export function Hero() {
  const { t, locale, isRtl } = useLanguage()
  return (
    <section className="relative mx-4 mt-4 overflow-hidden rounded-[26px] lg:mx-10">
      <img src="/images/hero/hero.png" alt="Egypt landscape" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-primary/55" />
      <div className={`relative flex min-h-[390px] flex-col justify-center px-6 py-16 lg:min-h-[455px] lg:px-14 ${isRtl ? 'text-right' : 'text-left'}`}>
        <span className={`mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 ${isRtl ? 'flex-row-reverse' : ''}`}>
          <Sparkles className="size-3.5" /> {locale === 'ar' ? 'رحلات مختارة' : 'Curated journeys'}
        </span>
        <h1 className="max-w-xl text-balance text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white md:text-6xl">
          {t('welcome')}
          <br />
          <span className="text-accent">{t('tagline')}</span>
        </h1>
        <p className="mt-5 max-w-md text-sm leading-6 text-white/80">
          {locale === 'ar'
            ? 'اكتشف أفضل الجولات والفنادق والتجارب - ثم احجز رحلتك التالية بثقة.'
            : 'Find the best tours, hotels and experiences — then book your next journey.'}
        </p>
        <Link href={routes.tours} className="mt-8 w-fit rounded-xl bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-white/90">
          {t('exploreMore')}
        </Link>
      </div>
    </section>
  )
}
