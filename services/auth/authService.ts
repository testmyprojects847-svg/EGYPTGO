import { DEMO_ADMIN, DEMO_CUSTOMER } from '@/lib/constants'
import { validateCredentials, validateRegistration } from '@/lib/validation'
import { createId } from '@/lib/utils'
import { sessionService } from './sessionService'
import type { AuthResult, Locale, User } from '@/types'

export const authService = {
  signIn(email: string, password: string, locale: Locale = 'en'): AuthResult {
    const error = validateCredentials(email, password, locale)
    if (error) return { success: false, error }

    const normalized = email.trim().toLowerCase()
    if (normalized === DEMO_ADMIN.email && password === DEMO_ADMIN.password) {
      const user: User = { id: 'u-3', name: DEMO_ADMIN.name, email: normalized, role: 'admin', provider: 'password' }
      sessionService.save(user)
      return { success: true, user }
    }
    if (normalized === DEMO_CUSTOMER.email && password === DEMO_CUSTOMER.password) {
      const user: User = { id: 'u-1', name: DEMO_CUSTOMER.name, email: normalized, role: 'customer', provider: 'password' }
      sessionService.save(user)
      return { success: true, user }
    }
    return { success: false, error: locale === 'ar' ? 'بيانات الدخول غير صحيحة.' : 'Invalid email or password.' }
  },

  signInAsAdmin(email: string, password: string, locale: Locale = 'en'): AuthResult {
    const result = authService.signIn(email, password, locale)
    if (result.success && result.user?.role !== 'admin') {
      sessionService.clear()
      return { success: false, error: locale === 'ar' ? 'بيانات المشرف غير صحيحة.' : 'Invalid admin credentials.' }
    }
    return result
  },

  register(name: string, email: string, password: string, confirmPassword: string, locale: Locale = 'en'): AuthResult {
    const error = validateRegistration(name, email, password, confirmPassword, locale)
    if (error) return { success: false, error }
    const user: User = {
      id: createId('u'),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'customer',
      provider: 'password',
      createdAt: new Date().toISOString(),
    }
    sessionService.save(user)
    return { success: true, user }
  },

  signOut() {
    sessionService.clear()
  },
}
