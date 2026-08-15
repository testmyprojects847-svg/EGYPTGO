'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import type { MessageKey } from '@/providers/LanguageProvider'
import { useAuth } from '@/hooks/useAuth'
import { mainNav, routes } from '@/lib/routes'
import { Logo } from './Logo'
import { LanguageToggle } from './LanguageToggle'
import { CurrencyToggle } from './CurrencyToggle'

export function Topbar() {
  const { t, isRtl } = useLanguage()
  const { role, signOut } = useAuth()
  const router = useRouter()

  return (
    <header
      className={`flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:px-10 ${isRtl ? 'flex-row-reverse' : ''}`}
    >
      <Logo />
      <nav className="hidden items-center gap-7 text-xs font-medium text-muted-foreground md:flex">
        {mainNav.map((item) => (
          <Link key={item.href} href={item.href} className="hover:text-foreground">
            {t(item.key as MessageKey)}
          </Link>
        ))}
      </nav>
      <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
        <CurrencyToggle />
        <LanguageToggle />
        {role === 'guest' ? (
          <>
            <Link href={routes.signIn} className="hidden text-xs font-medium sm:block">
              {t('signIn')}
            </Link>
            <Link href={routes.signUp} className="rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground">
              {t('signUp')}
            </Link>
          </>
        ) : (
          <>
            <Link href={routes.dashboard} className="hidden text-xs font-medium sm:block">
              {t('myProfile')}
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut()
                router.push(routes.home)
              }}
              className="rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground"
            >
              {t('logout')}
            </button>
          </>
        )}
      </div>
    </header>
  )
}
