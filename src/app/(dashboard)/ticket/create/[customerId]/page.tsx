import { CreateTicketForm } from './ui/create-ticket-form'
import { getByCustomerId } from '@/actions/vehicle/getters'
import { getAllServices } from '@/actions/service/getters'

export default async function Page({ params }: { params: { customerId: string } }) {
  const services = await getAllServices()
  const vehicles = await getByCustomerId(Number(params.customerId))
  return (
    <section>
      <h1>Crear ticket</h1>
      <CreateTicketForm allServices={services} vehicles={vehicles} />
    </section>
  )
}
