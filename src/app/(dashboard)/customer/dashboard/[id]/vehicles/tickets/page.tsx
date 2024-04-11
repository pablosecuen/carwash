import { getTicketsByVehicleId } from '@/utils/getters/tickets'
import { RangeDate } from '../../invoices/ui/range-date'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    from?: string
    to?: string
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { from, to } = searchParams
  const tickets = await getTicketsByVehicleId(params.id, {
    from: from != null ? new Date(from) : undefined,
    to: to != null ? new Date(to) : undefined
  })
  return (
    <section>
      <RangeDate />
      <table>
        <thead>
          <tr>
            <th>Nombre del servicio</th>
            <th>Estado</th>
            <th>Metodo de pago</th>
            <th>Precio total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.service.name}</td>
              <td>{ticket.status}</td>
              <td>{ticket.paymentMethod}</td>
              <td>{ticket.totalPrice}</td>
              <td className='mx-2 flex gap-4'> ... </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
