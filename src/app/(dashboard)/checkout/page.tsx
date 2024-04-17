import { getAllServices } from '@/actions/service/getters'
import { ClientField } from './ui/client-field'
import { getCustomersByName } from '@/actions/customer/getters'
import { getByCustomerId } from '@/utils/getters/vehicles'
import { InvoiceForm } from './ui/invoice-form'
import { getAllProducts } from '@/actions/product/getters'

interface SearchParams {
  customerName?: string
  customerId?: string
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const customers = await getCustomersByName(searchParams.customerName)
  const services = await getAllServices()
  const vehicles = (await getByCustomerId(Number(searchParams.customerId))).map((v) => ({ ...v }))
  const products = await getAllProducts()
  return (
    <div>
      <h1>Checkout</h1>
      <p>Checkout page content</p>
      <ClientField customers={customers.map((c) => ({ ...c }))} />
      <InvoiceForm {...{ services, vehicles, products, customerId: searchParams.customerId }} />
    </div>
  )
}
