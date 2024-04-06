import { Header } from '@/components/layout/header/Header'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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
