import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { EditFormCustomer } from './ui/EditFormCustomer'

import { getCustomerBySlug } from '@/actions/customer/get-customer-by-slug'

export default async function CustomerDetailPage({
  params: { slug }
}: {
  params: { slug: string }
}) {
  const { customer } = await getCustomerBySlug(slug)

  return (
    <ContainerPage>
      <Title title={`Editar cliente: ${customer.name}`} />

      <EditFormCustomer customer={customer} slug={slug} />
    </ContainerPage>
  )
}
