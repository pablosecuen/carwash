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
import { DateFormatter } from '@/utils/formatters'
import { PaginationTable } from './pagination'

export const TableDailyInvoices = async () => {
  const invoicesDaily = await getDailyInvoices()

  const totalDaily = invoicesDaily.reduce((acc, invoice) => acc + invoice.total, 0)
  return (
    <>
      <Card>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className='hidden md:table-cell'>Sucursal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='hidden md:table-cell'>Fecha</TableHead>
                <TableHead className='text-right'>Monto total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoicesDaily.map(({ id, customer, branch, status, createAt, total }) => {
                return (
                  <TableRow key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{branch}</TableCell>
                    <TableCell>{status}</TableCell>
                    <TableCell>{DateFormatter(new Date(createAt))}</TableCell>
                    <TableCell className='text-right'>{currencyFormat(total)}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={5}>Total</TableCell>
                <TableCell className='text-right'>{currencyFormat(totalDaily)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
      <PaginationTable />
    </>
  )
}
