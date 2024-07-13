import { getInvoicesToCashClosure } from '@/actions/invoice/getters'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Badge } from '@/components/ui/badge'

import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat, dateFormat, variantBadge } from '@/lib/utils'
import { translateStatus } from '@/utils/formatters'
import { InvoiceStatusEnum } from '@/utils/types'
import { FormClashClosure } from './ui/FormClashClosure'

export default async function Page() {
  const { invoices } = await getInvoicesToCashClosure({ hasCurrentAccount: false })
  // TODO: refactor this shit
  const { totalDaily, cancelleds, totalCard, totalCash, totalDailyCash } = invoices.reduce(
    (acc, invoice) => {
      if (invoice.status === InvoiceStatusEnum.COMPLETED) {
        acc.totalDaily += invoice.total
        const { totalCard, totalCash, totalDailyCash } = [
          ...invoice.tickets,
          ...invoice.items
        ].reduce(
          (acc, curr) => {
            // Is ticket
            if ('service' in curr) acc.totalDailyCash += curr.service?.cashPrice ?? 0
            // Is product
            if ('product' in curr) acc.totalDailyCash += curr.product.cashPrice ?? 0
            if (curr.paymentMethod === 'cash') {
              acc.totalCash += curr.totalPrice
            } else {
              acc.totalCard += curr.totalPrice
            }
            return acc
          },
          {
            totalCard: 0,
            totalDailyCash: 0,
            totalCash: 0
          }
        )
        acc.totalCard += totalCard
        acc.totalCash += totalCash
        acc.totalDailyCash += totalDailyCash
      } else if (invoice.status === InvoiceStatusEnum.CANCELLED) {
        acc.cancelleds += invoice.total
      }

      return acc
    },
    {
      totalDailyCash: 0,
      totalCash: 0,
      totalCard: 0,
      totalDaily: 0,
      cancelleds: 0
    }
  )

  return (
    <ContainerPage>
      <CardHeader>
        <CardTitle>Cierre de caja</CardTitle>
        <CardDescription>Contenido de la página de cierre de caja</CardDescription>
      </CardHeader>
      <div className='flex items-start justify-center gap-5'>
        <div className='  scrollbar-none max-h-[60vh] overflow-scroll overflow-x-hidden'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='max-h-[30vh] overflow-hidden'>
              {invoices.map(({ id, customer, total, createAt, status }) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{dateFormat(new Date(createAt))}</TableCell>
                  <TableCell>
                    <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
                  </TableCell>
                  <TableCell>{currencyFormat(total)}</TableCell>
                </TableRow>
              ))}
              <TableRow className='justify-end bg-muted'>
                <TableCell className=' flex-1' colSpan={4}>
                  Total
                </TableCell>
                <TableCell>{currencyFormat(totalDaily)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <FormClashClosure
          invoices={invoices}
          totalDaily={totalDaily}
          totalCard={totalCard}
          totalCash={totalCash}
          totalDailyCash={totalDailyCash}
          cancelleds={cancelleds}
        />
      </div>
    </ContainerPage>
  )
}
