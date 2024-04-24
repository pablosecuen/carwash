import { DashboardNav } from '@/components/layout'
import { navItems } from '@/lib/data'
import { cn } from '@/lib/utils'
import { getUserRole } from '@/utils/user-validate'

export async function Sidebar() {
  const role = await getUserRole()
  return (
    <nav className={cn(`relative hidden min-h-screen w-72  border-r lg:block`)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <div className='space-y-1 fade-in'>
            <h2 className='mb-2 px-4 text-xl font-semibold tracking-tight'>Carwash</h2>
            <DashboardNav items={navItems} role={role} />
          </div>
        </div>
      </div>
    </nav>
  )
}
