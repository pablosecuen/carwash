'use server'

import { USERS } from '@/utils/constants'
import { type Roles } from '@/utils/types'
import { redirect } from 'next/navigation'

export async function loginForm(formData: FormData) {
  const role = formData.get('role') as keyof typeof Roles
  const password = formData.get('password') as string

  const user = USERS[role]
  if (user == null) {
    throw new Error('Invalid role')
  }
  if (password !== user.pass) {
    throw new Error('Invalid password')
  }

  redirect(`/home`)
}
