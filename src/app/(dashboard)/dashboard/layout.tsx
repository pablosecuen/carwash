import { hasPermission } from '@/utils/user-validate'
import './globals.css'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAdmin = await hasPermission()

  if (!isAdmin) {
    redirect('/')
  }
  return <>{children}</>
}
