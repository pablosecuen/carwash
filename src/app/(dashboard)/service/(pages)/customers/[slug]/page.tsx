import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { EditFormCustomer } from './ui/EditFormCustomer'

import { getCustomerBySlug } from '@/actions/customer/get-customer-by-slug'
import { AddFormCustomerVehicle } from './ui/AddFormCustomerVehicle'
import { Suspense } from 'react'
import { TableVehiclesCustomer } from './ui/TableVechiclesCustomer'
import { UpdateCurrentAccountBtn } from './ui/update-current-account-btn'
import { hasPermission } from '@/utils/user-validate'
export default async function CustomerDetailPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const { customer } = await getCustomerBySlug(slug)

  return (
    <ContainerPage>
      <div className='flex gap-8'>
        <Title title={`Editar cliente: ${customer.name}`} />
        {(await hasPermission('ADMIN')) && (
          <UpdateCurrentAccountBtn
            currentStatus={customer.currentAccount}
            customerId={customer.id}
          />
        )}
      </div>

      <div className='grid gap-2 md:grid-cols-2 md:gap-4'>
        <EditFormCustomer customer={customer} slug={slug} className='' />
        <AddFormCustomerVehicle customerId={customer.id} className='' />
      </div>
      <Suspense fallback={<div className='h-96 md:col-span-2'>Loading</div>}>
        <TableVehiclesCustomer customerId={customer.id} className='md:col-span-2' />
      </Suspense>
    </ContainerPage>
  )
}
