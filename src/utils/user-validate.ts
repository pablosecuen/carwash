import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Branch, Roles, type TRole } from './types'

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

export const getUserBranch = async () => {
  const branch = cookies().get('branch')
  if (branch == null) throw new Error('Branch is not defined')
  if (!Object.values(Branch).includes(branch.value as Branch))
    throw new Error('Branch is not valid')
  return branch.value as Branch
}

export const getUserRole = async () => {
  const role = cookies().get('role')
  if (role == null) throw new Error('Role is required')
  if (!Object.values(Roles).includes(role.value as Roles)) throw new Error('Role is not valid')
  return role.value as Roles
}
