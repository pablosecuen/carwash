import { getDailyInvoices } from '@/actions/invoice/getters'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'

export const dynamic = 'force-dynamic'

export async function TableInfoDay() {
  const invoiceDayData = await getDailyInvoices()

  const totalPriceDaily = invoiceDayData.reduce((acc, invoice) => acc + invoice.total, 0)
  return (
    <Card>
      <CardContent className=' p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factura</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Servicios</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead className='text-right'>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceDayData.map(({ total, id, status, tickets, products }) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{id}</TableCell>
                <TableCell>{status}</TableCell>
                <TableCell>{tickets.length}</TableCell>
                <TableCell>{products.length}</TableCell>
                <TableCell className='text-right'>{currencyFormat(total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className='text-right'>{currencyFormat(totalPriceDaily)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
