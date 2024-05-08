import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { EditFormCustomer } from './ui/EditFormCustomer'

import { getCustomerBySlug } from '@/actions/customer/get-customer-by-slug'
import { AddFormCustomerVehicle } from './ui/AddFormCustomerVehicle'
import { Suspense } from 'react'
import { TableVehiclesCustomer } from './ui/TableVechiclesCustomer'
export default async function CustomerDetailPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const { customer } = await getCustomerBySlug(slug)

  return (
    <ContainerPage>
      <Title title={`Editar cliente: ${customer.name}`} />

      <div className='grid gap-2 md:grid-cols-2 md:gap-4'>
        <EditFormCustomer customer={customer} slug={slug} className='' />
        <AddFormCustomerVehicle customerId={customer.id} className='' />
      </div>
      <Suspense fallback={<div className='h-96 bg-red-500 md:col-span-2'>Loading</div>}>
        <TableVehiclesCustomer customerId={customer.id} className='md:col-span-2' />
      </Suspense>
    </ContainerPage>
  )
}
