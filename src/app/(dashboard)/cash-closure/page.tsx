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
  const { invoices } = await getInvoicesToCashClosure()
  const { total, cancelleds } = invoices.reduce(
    (acc, invoice) => {
      if (invoice.status === InvoiceStatusEnum.COMPLETED) {
        acc.total += invoice.total
      } else {
        acc.cancelleds += invoice.total
      }
      return acc
    },
    { total: 0, cancelleds: 0 }
  )

  return (
    <ContainerPage>
      <CardHeader>
        <CardTitle>Cierre de caja</CardTitle>
        <CardDescription>Contenido de la página de cierre de caja</CardDescription>
      </CardHeader>
      <div className='flex items-start justify-center gap-5'>
        <div className='  max-h-[60vh] overflow-scroll overflow-x-hidden'>
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
                <TableCell>{currencyFormat(total)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        <FormClashClosure invoices={invoices} total={total} cancelleds={cancelleds} />
      </div>
    </ContainerPage>
  )
}
