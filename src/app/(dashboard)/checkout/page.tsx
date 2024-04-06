import { getAllServices } from '@/utils/getters/services'
import { ClientField } from './ui/client-field'
import { getCustomerByName } from '@/utils/getters/customer'
import { getByCustomerId } from '@/utils/getters/vehicles'
import { InvoiceForm } from './ui/invoice-form'
import { getAllProducts } from '@/utils/getters/products'

interface SearchParams {
  customerName?: string
  customerId?: string
}

export default async function Page({ searchParams }: { searchParams: SearchParams }) {
  const customers = await getCustomerByName(searchParams.customerName)
  const services = (await getAllServices()).map((s) => ({ ...s }))
  const vehicles = (await getByCustomerId(Number(searchParams.customerId))).map((v) => ({ ...v }))
  const products = (await getAllProducts()).map((p) => ({ ...p }))
  return (
    <div>
      <h1>Checkout</h1>
      <p>Checkout page content</p>
      <ClientField customers={customers.map((c) => ({ ...c }))} />
      <InvoiceForm {...{ services, vehicles, products, customerId: searchParams.customerId }} />
    </div>
  )
}
