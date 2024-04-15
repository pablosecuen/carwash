import { ContainerPage } from '@/components/layout/page/ContainerPage'

import { Suspense } from 'react'
import { DashboardCard } from '../dashboard/ui/cards/DashboardCard'
import { TableCustomers } from './ui/server/TableCustomers'

export default function ServicePage() {
  return (
    <ContainerPage>
      <div className='grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        {/* left */}
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
          {/* Cards */}
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
            <DashboardCard
              className='fade-in sm:col-span-2 '
              title='Tickets'
              description='Esta sección te permite crear tickets para registrar en el sistema.'
              href='/service/new-ticket'
              linkLabel='Crear ticket'
            />
            <DashboardCard
              className='fade-in sm:col-span-2 '
              title='Clientes'
              description='Esta sección te permite administrar los clientes del sistema.'
              href='/service/customers'
              linkLabel='Ver clientes'
            />
          </div>

          {/* Table Orders */}
          <Suspense fallback={<>Loading</>}>
            <TableCustomers />
          </Suspense>
        </div>
        {/* TODO: Ver que renderizar en esta seccion */}
        {/* rigth */}
        <div>
          {/* {products.length === 0 ? <ProductsEmpty /> : <ProductsTable products={products} />} */}
        </div>
      </div>
    </ContainerPage>
  )
}
