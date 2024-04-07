'use server'

import { USERS } from '@/utils/constants'
import { type Roles } from '@/utils/types'
import { cookies } from 'next/headers'

export async function loginForm(formData: FormData) {
  const role = formData.get('role') as keyof typeof Roles
  const password = formData.get('password') as string

  const user = USERS[role]
  if (user == null) {
    return {
      ok: false,
      message: 'Las credenciales son incorrectas'
    }
  }
  if (password !== user.pass) {
    return {
      ok: false,
      message: 'Las credenciales son incorrectas'
    }
  }

  cookies().set('role', role)

  return {
    ok: true
  }
}
