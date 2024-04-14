'use server'

import { USERS } from '@/utils/users'
import { type Roles } from '@/utils/types'
import { cookies } from 'next/headers'

export async function loginForm(formData: FormData) {
  const role = formData.get('role') as keyof typeof Roles
  const password = formData.get('password') as string
  const branch = formData.get('branch') as string
  const user = USERS[role]
  if (user == null) {
    return {
      ok: false,
      message: 'Las credenciales son incorrectas'
    }
  }
  if (branch == null || branch === '') {
    return {
      ok: false,
      message: 'Por favor selecciona una sucursal'
    }
  }
  if (password !== user.pass) {
    return {
      ok: false,
      message: 'Las credenciales son incorrectas'
    }
  }

  cookies().set('role', role)
  cookies().set('branch', branch)

  console.log({
    role,
    branch
  })
  return {
    ok: true
  }
}
