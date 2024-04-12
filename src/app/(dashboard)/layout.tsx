import { Header } from '@/components/layout/header/Header'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const role = cookies().get('role')
  if (role == null) redirect('/')

  return (
    <>
      <Header />
      <div className='container flex min-h-screen overflow-hidden px-0'>
        <Sidebar />
        <main className='w-full pt-16'>{children}</main>
      </div>
    </>
  )
}
