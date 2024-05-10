import { getDailyInvoices } from '@/actions/invoice/getters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat, variantBadge } from '@/lib/utils'
import { SelectStatus } from '../../../../components/invoice/select-status'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export async function TableInfoDay() {
  const invoiceDayData = await getDailyInvoices()

  const totalPriceDaily = invoiceDayData.reduce((acc, invoice) => acc + invoice.total, 0)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturas del día</CardTitle>
      </CardHeader>
      <CardContent className=' p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Factura</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Servicios</TableHead>
              <TableHead>Productos</TableHead>
              <TableHead>Cambiar estado</TableHead>
              <TableHead className='text-right'>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoiceDayData.map(({ total, id, status, tickets, products }) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{id}</TableCell>
                <TableCell>
                  <Badge variant={variantBadge(status)}>{status}</Badge>
                </TableCell>
                <TableCell>{tickets.length}</TableCell>
                <TableCell>{products.length}</TableCell>
                <TableCell>
                  <SelectStatus status={status} id={id} />
                </TableCell>
                <TableCell className='text-right'>{currencyFormat(total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5}>Total</TableCell>
              <TableCell className='text-right'>{currencyFormat(totalPriceDaily)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}
