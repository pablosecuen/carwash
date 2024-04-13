import { dateFormater } from '@/utils/formatters'
import { getInvoicesByCustomerId } from '@/utils/getters/invoices'
import { RangeDate } from './ui/range-date'
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

  const invoices = await getInvoicesByCustomerId(params.id, {
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
              <TableHead>Fecha</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{dateFormater(new Date(invoice.createAt))}</TableCell>
                <TableCell>{invoice.status}</TableCell>
                <TableCell>{invoice.total}</TableCell>
                <TableCell> - </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
