import { getDailyInvoices } from '@/actions/invoice/getters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat, variantBadge } from '@/lib/utils'
import { SelectStatus } from '../../../../components/invoice/select-status'
import { Badge } from '@/components/ui/badge'

export const dynamic = 'force-dynamic'

export async function TableInfoDay() {
  const { invoices: invoiceDayData } = await getDailyInvoices()

  const totalPriceDaily = invoiceDayData.reduce((acc, invoice) => acc + invoice.total, 0)
  return (
    <Card className=' scrollbar-none relative max-h-[60vh] overflow-scroll '>
      <CardHeader>
        <CardTitle>Facturas del día</CardTitle>
      </CardHeader>
      <CardContent className='relative p-0'>
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
          <TableBody className=''>
            {invoiceDayData.map(({ total, id, status, tickets, items, customer }) => (
              <TableRow key={id}>
                <TableCell className='hidden font-medium md:table-cell'>{id}</TableCell>
                <TableCell>{customer.name}</TableCell>
                <TableCell>
                  <Badge variant={variantBadge(status)}>{status}</Badge>
                </TableCell>

                <TableCell className='hidden md:table-cell'>{tickets.length}</TableCell>
                <TableCell className='hidden md:table-cell'>{items.length}</TableCell>
                <TableCell>
                  <SelectStatus status={status} id={id} />
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  <Badge variant={variantBadge(status)}>{status}</Badge>
                </TableCell>
                <TableCell className='text-right'>{currencyFormat(total)}</TableCell>
              </TableRow>
            ))}
            {invoiceDayData.length === 0 && (
              <TableRow className='hover:bg-transparent'>
                <TableCell colSpan={8} className='hover:bg-trasparent py-10 text-center'>
                  No hay facturas registradas
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className='flex w-full items-center justify-end bg-muted px-4 py-5'>
          <span>Total {currencyFormat(totalPriceDaily)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
