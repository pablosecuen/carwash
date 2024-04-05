import { CreateTicketForm } from './ui/create-ticket-form'
import { getByCustomerId } from '@/utils/getters/vehicles'
import { getAllServices } from '@/utils/getters/services'

export default async function Page({ params }: { params: { customerId: string } }) {
  const services = await getAllServices()
  const vehicles = await getByCustomerId(Number(params.customerId))
  return (
    <section>
      <h1>Crear ticket</h1>
      <CreateTicketForm
        // FIXME: This is a bug, server components don't support classes only plain objects
        allServices={services.map((s) => ({ ...s }))}
        vehicles={vehicles.map((v) => ({ ...v }))}
      />
    </section>
  )
}
