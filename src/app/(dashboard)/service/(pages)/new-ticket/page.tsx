import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'

import { getAllProducts } from '@/actions/product/getters'
import { getAllServices } from '@/actions/service/getters'
import { getByCustomerId } from '@/actions/vehicle/getters'

import { InvoiceForm } from './ui/invoice-form'
import { CustomerFieldServer } from './ui/customer-field.server'
import { Suspense } from 'react'

interface SearchParams {
  customerName?: string
  customerId?: string
}
export default async function NamePage({ searchParams }: { searchParams: SearchParams }) {
  const services = await getAllServices()
  const vehicles = await getByCustomerId(Number(searchParams.customerId))
  const products = await getAllProducts()

  const { customerName } = searchParams
  return (
    <ContainerPage>
      <header className='flex items-center justify-between fade-in'>
        <Title title='Nuevo ticket' />
      </header>
      <div className='grid w-max grid-cols-3 place-content-center items-start gap-5'>
        <Suspense fallback={<></>}>
          <CustomerFieldServer customerName={customerName ?? ''} />
        </Suspense>
      </div>

      <InvoiceForm {...{ services, vehicles, products, customerId: searchParams.customerId }} />
    </ContainerPage>
  )
}
