import { getUserRole } from '@/utils/user-validate'
import './globals.css'
import { redirect } from 'next/navigation'
import { Roles } from '@/utils/types'

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const role = await getUserRole()

  if (role === Roles.USER) {
    redirect('/')
  }

  return <>{children}</>
}
