'use server'

import { USERS } from '@/utils/users'
import { Branch, type Roles } from '@/utils/types'
import { cookies } from 'next/headers'

export async function loginForm(formData: FormData) {
  const role = formData.get('role') as keyof typeof Roles
  const password = formData.get('password') as string
  const branch = formData.get('branch') as Branch | string
  const user = USERS[role]
  if (user == null) {
    return {
      ok: false,
      message: 'Las credenciales son incorrectas',
      role: null
    }
  }
  if (branch == null || branch === '' || !Object.values(Branch).includes(branch as Branch)) {
    return {
      ok: false,
      message: 'Por favor selecciona una sucursal',
      role: null
    }
  }
  if (password !== user.pass[branch as Branch]) {
    return {
      ok: false,
      message: 'Las credenciales son incorrectas',
      role: null
    }
  }

  cookies().set('role', role)
  cookies().set('branch', branch)

  return {
    ok: true,
    role: cookies().get('role')?.value
  }
}
