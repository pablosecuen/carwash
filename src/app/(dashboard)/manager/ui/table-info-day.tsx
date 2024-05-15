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
  console.log(invoiceDayData[0].tickets[0])
  const totalPriceDaily = invoiceDayData.reduce((acc, invoice) => acc + invoice.total, 0)
  return (
    <Card className=' relative min-h-[60vh] '>
      <CardHeader>
        <CardTitle>Facturas del día</CardTitle>
      </CardHeader>
      <CardContent className=' p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden md:table-cell'>Factura</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className='hidden md:table-cell'>Servicios</TableHead>
              <TableHead className='hidden md:table-cell'>Productos</TableHead>
              <TableHead>Cambiar estado</TableHead>
              <TableHead className='hidden md:table-cell'>Cobro</TableHead>
              <TableHead className='text-right'>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='scrollbar-none overflow-scroll'>
            {invoiceDayData.map(({ total, id, status, tickets, products, customer }) => (
              <TableRow key={id}>
                <TableCell className='hidden font-medium md:table-cell'>{id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <Badge variant={variantBadge(status)}>{status}</Badge>
                </TableCell>

                <TableCell className='hidden md:table-cell'>{tickets.length}</TableCell>
                <TableCell className='hidden md:table-cell'>{products.length}</TableCell>
                <TableCell>
                  <SelectStatus status={status} id={id} />
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Badge variant={variantBadge(status)}>{status}</Badge>
                </TableCell>
                <TableCell className='text-right'>{currencyFormat(total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter className='absolute bottom-0 left-0 right-0'>
          <TableRow>
            <TableCell colSpan={7}>Total</TableCell>
            <TableCell className='text-right'>{currencyFormat(totalPriceDaily)}</TableCell>
          </TableRow>
        </TableFooter>
      </CardContent>
    </Card>
  )
}
