import { DashboardCard } from '@/components/DashboardCard'
import { ContainerPage } from '@/components/layout/page/ContainerPage'

import { TableInfoDay } from './ui/table-info-day'
import { getBranch, getUserRole, hasPermission } from '@/utils/user-validate'

import { Roles } from '@/utils/types'
import { redirect } from 'next/navigation'

export default async function ManagerPage() {
  const branch = getBranch()
  const isAdmin = await hasPermission()
  const role = await getUserRole()
  if (role === Roles.USER) {
    redirect('/')
  }

  return (
    <ContainerPage>
      <div className='grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        {/* left */}
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3'>
          {/* Cards */}
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6'>
            <p className='sm:col-span-2 md:col-span-4 lg:col-span-2 xl:col-span-6'>
              {' '}
              Sucursal {branch}
            </p>
            <DashboardCard
              className='sm:col-span-2'
              title='Facturas'
              description='Esta sección te permite administrar las facturas que se ofrecen en el sistema.'
              href='/manager/invoices'
              linkLabel='Ir a facturas'
            />
            <DashboardCard
              className='sm:col-span-2'
              title='Servicios'
              description='Esta sección te permite administrar los servicios que se ofrecen en el sistema.'
              href='/manager/services'
              linkLabel='Ir a servicios'
            />
            <DashboardCard
              className='sm:col-span-2'
              title='Productos'
              description='Esta sección te permite administrar los productos que se ofrecen en el sistema.'
              href='/manager/products'
              linkLabel='Ir a productos'
            />
          </div>
          {isAdmin && (
            <>
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6'>
                <DashboardCard
                  className='sm:col-span-2'
                  title='Facturas'
                  description='Esta sección te permite administrar las facturas que se ofrecen en el sistema.'
                  href='/manager/invoices'
                  linkLabel='Ir a facturas'
                />
                <DashboardCard
                  className='sm:col-span-2'
                  title='Servicios'
                  description='Esta sección te permite administrar los servicios que se ofrecen en el sistema.'
                  href='/manager/services'
                  linkLabel='Ir a servicios'
                />
                <DashboardCard
                  className='sm:col-span-2'
                  title='Productos'
                  description='Esta sección te permite administrar los productos que se ofrecen en el sistema.'
                  href='/manager/products'
                  linkLabel='Ir a productos'
                />
              </div>
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6'>
                <DashboardCard
                  className='sm:col-span-2'
                  title='Facturas'
                  description='Esta sección te permite administrar las facturas que se ofrecen en el sistema.'
                  href='/manager/invoices'
                  linkLabel='Ir a facturas'
                />
                <DashboardCard
                  className='sm:col-span-2'
                  title='Servicios'
                  description='Esta sección te permite administrar los servicios que se ofrecen en el sistema.'
                  href='/manager/services'
                  linkLabel='Ir a servicios'
                />
                <DashboardCard
                  className='sm:col-span-2'
                  title='Productos'
                  description='Esta sección te permite administrar los productos que se ofrecen en el sistema.'
                  href='/manager/products'
                  linkLabel='Ir a productos'
                />
              </div>
            </>
          )}

          {/* <div className='grid gap-4 lg:grid-cols-2 xl:grid-cols-6'>
            <Suspense fallback={<TableSkeleton />}>
              <CardInfoDay />
            </Suspense>
          </div> */}
          <div>
            <TableInfoDay />
          </div>
        </div>
      </div>
    </ContainerPage>
  )
}
