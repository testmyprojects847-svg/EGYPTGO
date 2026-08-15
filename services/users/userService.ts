import { users as seedUsers } from '@/data/users'
import type { User, UserProfileUpdate } from '@/types'

export const userService = {
  list(): User[] {
    return seedUsers
  },
  getById(id: string): User | undefined {
    return seedUsers.find((user) => user.id === id)
  },
  updateProfile(user: User, update: UserProfileUpdate): User {
    return { ...user, ...update }
  },
  stats() {
    return {
      total: seedUsers.length,
      customers: seedUsers.filter((user) => user.role === 'customer').length,
      admins: seedUsers.filter((user) => user.role === 'admin').length,
    }
  },
}
