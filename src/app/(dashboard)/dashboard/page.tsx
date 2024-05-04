import { ContainerPage } from '@/components/layout/page/ContainerPage'

import { DashboardCard } from '@/components/DashboardCard'

import { redirect } from 'next/navigation'
import { hasPermission } from '@/utils/user-validate'

export default async function DashboardPage() {
  const isAdmin = await hasPermission()
  if (!isAdmin) {
    redirect('/')
  }
  // const products = await getAllProducts()
  return (
    <ContainerPage>
      <div className='grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        {/* left */}
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3'>
          {/* Cards */}
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6'>
            <DashboardCard
              className='sm:col-span-2 '
              title='Facturas'
              description='Esta sección te permite administrar las facturas que se ofrecen en el sistema.'
              href='/dashboard/invoices'
              linkLabel='Ir a facturas'
            />
            <DashboardCard
              className='sm:col-span-2 '
              title='Servicios'
              description='Esta sección te permite administrar los servicios que se ofrecen en el sistema.'
              href='/dashboard/services'
              linkLabel='Ir a servicios'
            />
            <DashboardCard
              className='sm:col-span-2 '
              title='Productos'
              description='Esta sección te permite administrar los productos que se ofrecen en el sistema.'
              href='/dashboard/products'
              linkLabel='Ir a productos'
            />
          </div>
        </div>
      </div>
    </ContainerPage>
  )
}
