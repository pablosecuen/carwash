import { getTicketsByVehicleId } from '@/utils/getters/tickets'
import { RangeDate } from '../../invoices/ui/range-date'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

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
    <Card className='fade-in'>
      <CardHeader>
        <RangeDate />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del servicio</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Metodo de pago</TableHead>
              <TableHead>Precio total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>{ticket.service.name}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.paymentMethod}</TableCell>
                <TableCell>{ticket.totalPrice}</TableCell>
                <TableCell className='mx-2 flex gap-4'> ... </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
