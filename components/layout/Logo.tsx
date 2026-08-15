'use client'

import Link from 'next/link'
import { Plane } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { useSettings } from '@/hooks/useSettings'
import { routes } from '@/lib/routes'

export function Logo() {
  const { t, locale } = useLanguage()
  const settings = useSettings()
  return (
    <Link href={routes.home} className="flex items-center gap-2 text-[17px] font-bold tracking-tight">
      <span className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
        <Plane className="size-4 -rotate-12" />
      </span>
      {locale === 'ar' ? settings.siteNameAr : settings.siteName}
    </Link>
  )
}
