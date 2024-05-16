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

import { Badge } from '@/components/ui/badge'
import { translateStatus } from '@/utils/formatters'

export const TableDailyInvoices = async () => {
  const { invoices: invoicesDaily } = await getDailyInvoices()

  const totalDaily = invoicesDaily.reduce((acc, invoice) => acc + invoice.total, 0)
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>Facturas del día</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead className='hidden md:table-cell'>Sucursal</TableHead>
                <TableHead>Status</TableHead>

                <TableHead className='text-right'>Monto total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicesDaily.map(({ id, customer, branch, status, total }) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{branch}</TableCell>
                    <TableCell>
                      <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
                    </TableCell>

                    <TableCell className='text-right'>{currencyFormat(total)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                {invoicesDaily.length === 0 && (
                  <TableCell colSpan={5} className='py-10 text-center'>
                    No hay facturas
                  </TableCell>
                )}
                {invoicesDaily.length > 0 && (
                  <>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className='text-right'>{currencyFormat(totalDaily)}</TableCell>
                  </>
                )}
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
      {/* {invoicesDaily.length > 0 && (
        <div className='mt-4 text-right'>
          <span className='text-sm text-gray-500'>
            Mostrando {invoicesDaily.length} de {invoicesDaily.length}
          </span>
        </div>
      )} */}
      {/* {invoicesDaily.length > 0 && <PaginationTable />} */}
    </>
  )
}
