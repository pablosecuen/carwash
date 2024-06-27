import { DashboardNav } from '@/components/layout'
import { navItems } from '@/lib/data'
import { cn } from '@/lib/utils'
import { getUserRole } from '@/utils/user-validate'
import { HelpCircleIcon } from 'lucide-react'
import Link from 'next/link'

export async function Sidebar() {
  const role = await getUserRole()
  return (
    <nav className={cn(`relative hidden min-h-screen w-72  border-r lg:block`)}>
      <div className='flex h-full flex-col items-start justify-between space-y-4 py-4'>
        <div className='w-full px-3 py-2'>
          <div className='space-y-1'>
            <h2 className='mb-2 px-4 text-xl font-semibold tracking-tight'>Carwash</h2>
            <DashboardNav items={navItems} role={role} />
          </div>
        </div>
        <div className='w-full space-y-4 px-3'>
          <Link href={'/blog'} className={''}>
            <span
              className={
                'group flex flex-col items-start rounded-md px-3 py-2 text-sm font-medium transition-all duration-75 hover:bg-accent hover:text-accent-foreground'
              }
            >
              <div className='flex items-center'>
                <HelpCircleIcon className='mr-2 h-4 w-4' />
                <span>Ayuda</span>
              </div>
              <small>Blog sobre el sistema.</small>
            </span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
