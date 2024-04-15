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

  let name = slug
    .split('_')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')

  return (
    <ContainerPage>
      <Title title={`Editar cliente: ${name}`} />

      <EditFormCustomer customer={customer} />
    </ContainerPage>
  )
}
