import { ContainerPage } from '@/components/layout/page/ContainerPage'
// import { getAllProducts } from '@/utils/getters/products'
import { TableOrders } from './ui/table/TableOrders'
import { DashboardCard } from '../../../components/DashboardCard'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const cookiesStore = cookies()
  const role = cookiesStore.get('role')?.value
  if (role === 'USER') {
    redirect('/service')
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
