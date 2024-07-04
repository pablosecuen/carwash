import { DashboardCard } from '@/components/DashboardCard'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { TableInfoDay } from './ui/table-info-day'
import { getBranch, getUserRole, hasPermission } from '@/utils/user-validate'
import { Roles } from '@/utils/types'
import { DashboardCardProducts } from '@/components/DashboardCardProducts'
import { Suspense } from 'react'
import { TableSkeleton } from '@/components/skeletons/table-skeleton'
import { Title } from '@/components/layout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function ManagerPage() {
  const isAdmin = await hasPermission()
  const role = await getUserRole()
  const branch = getBranch()

  const isManager = role === Roles.EDITOR

  return (
    <ContainerPage>
      <div className='grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-3'>
          {/* Cards */}
          {isManager && (
            <>
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-6'>
                <DashboardCard
                  className='sm:col-span-2'
                  title='Facturas'
                  description='Esta sección te permite administrar las facturas que se ofrecen en el sistema.'
                  href={`/manager/invoices?branch=${branch}`}
                  linkLabel='Ir a facturas'
                />
                <DashboardCard
                  className='sm:col-span-2'
                  title='Servicios'
                  description='Esta sección te permite administrar los servicios que se ofrecen en el sistema.'
                  href={`/manager/services?branch=${branch}`}
                  linkLabel='Ir a servicios'
                />
                <DashboardCardProducts
                  className='sm:col-span-2 md:col-span-full lg:col-span-2'
                  title='Productos'
                  description='Esta sección te permite administrar los productos que se ofrecen en el sistema.'
                />
              </div>
              <div>
                <Suspense fallback={<TableSkeleton />}>
                  <TableInfoDay />
                </Suspense>
                <div className='flex items-center justify-end'>
                  <Button asChild variant={'secondary'} size={'lg'} className='mt-5'>
                    <Link href={'/cash-closure'}>Cierre de caja</Link>
                  </Button>
                </div>
              </div>
            </>
          )}

          {isAdmin && (
            <>
              {/* Sucursal 1 */}
              <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8'>
                <div className='space-y-4 sm:col-span-2'>
                  <Title title='Sucursal 1' />
                  <DashboardCard
                    className='sm:col-span-2'
                    title='Facturas'
                    description='Esta sección te permite administrar las facturas de la sucursal uno.'
                    href={`/manager/invoices?branch=ONE`}
                    linkLabel='Ir a facturas'
                  />
                </div>
                <div className='space-y-4 sm:col-span-2'>
                  <Title title='Sucursal 2' />
                  <DashboardCard
                    className='sm:col-span-2'
                    title='Facturas'
                    description='Esta sección te permite administrar las facturas de la sucursal dos.'
                    href={`/manager/invoices?branch=TWO`}
                    linkLabel='Ir a facturas'
                  />
                </div>
                <div className='space-y-4 sm:col-span-2'>
                  <Title title='Sucursal 3' />
                  <DashboardCard
                    className='sm:col-span-2'
                    title='Facturas'
                    description='Esta sección te permite administrar las facturas de la sucursal tres.'
                    href={`/manager/invoices?branch=THREE`}
                    linkLabel='Ir a facturas'
                  />
                </div>
                <div className='space-y-4 sm:col-span-2'>
                  <Title title='Productos' />
                  <DashboardCardProducts
                    title='Productos'
                    description='Ver lista de los productos que se ofrecen en el sistema.'
                  />
                </div>
              </div>

              <Suspense fallback={<TableSkeleton />}>
                <TableInfoDay />
              </Suspense>
              <div className='flex items-center justify-end'>
                <Button asChild variant={'secondary'} size={'lg'} className='mt-5'>
                  <Link href={'/cash-closure'}>Cierre de caja</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </ContainerPage>
  )
}
