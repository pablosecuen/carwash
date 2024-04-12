import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Roles, type TRole } from './types'

export const validateUserRole = (permisionRole?: TRole) => {
  const role = cookies().get('role')
  // if role is null, redirect to login
  if (role == null) redirect('/')

  const { value } = role as { value: Roles; name: 'role' }

  // if role is not a valid role, delete the cookie and redirect to login
  if (!Object.values(Roles).includes(value)) {
    cookies().delete('role')
    redirect('/')
  }

  // if the permisionRole is null or USER, permit the access
  if (permisionRole == null) return
  if (permisionRole === Roles.USER) return

  // if the user role is ADMIN, permit the access
  if (value === Roles.ADMIN) return

  // if the user role is the same as the permisionRole, permit the access
  if (value === permisionRole) return

  redirect('/')
}
