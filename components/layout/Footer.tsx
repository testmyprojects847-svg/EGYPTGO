'use client'

import Link from 'next/link'
import { useLanguage } from '@/hooks/useLanguage'
import { SUPPORT_EMAIL, SUPPORT_PHONE } from '@/lib/constants'
import { routes } from '@/lib/routes'

export function Footer() {
  const { t, isRtl } = useLanguage()
  return (
    <footer className="border-t border-border bg-card px-4 py-8 lg:px-10">
      <div className={`mx-auto flex max-w-6xl flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between ${isRtl ? 'md:flex-row-reverse' : ''}`}>
        <p className="font-semibold text-foreground">{t('appName')}</p>
        <div className="flex flex-wrap gap-4">
          <Link href={routes.about}>{t('about')}</Link>
          <Link href={routes.contact}>{t('contact')}</Link>
          <Link href={routes.adminSignIn}>{t('adminDashboard')}</Link>
        </div>
        <p>
          {SUPPORT_EMAIL} · {SUPPORT_PHONE}
        </p>
      </div>
    </footer>
  )
}
