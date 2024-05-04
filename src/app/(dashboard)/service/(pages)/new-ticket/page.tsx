import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { getCustomersByName } from '@/actions/customer/getters'
import { getAllProducts } from '@/actions/product/getters'
import { getAllServices } from '@/actions/service/getters'
import { getByCustomerId } from '@/actions/vehicle/getters'
import { ClientField } from './ui/client-field'
import { InvoiceForm } from './ui/invoice-form'

interface SearchParams {
  customerName?: string
  customerId?: string
}
export default async function NamePage({ searchParams }: { searchParams: SearchParams }) {
  const customers = await getCustomersByName(searchParams.customerName)
  const services = await getAllServices()
  const vehicles = await getByCustomerId(Number(searchParams.customerId))
  const products = await getAllProducts()
  return (
    <ContainerPage>
      <header className='flex items-center justify-between fade-in'>
        <Title title='Nuevo ticket' />
      </header>
      <div className='grid w-max grid-cols-3 place-content-center items-start gap-5'>
        <ClientField customers={customers} />
      </div>

      <InvoiceForm {...{ services, vehicles, products, customerId: searchParams.customerId }} />
    </ContainerPage>
  )
}
