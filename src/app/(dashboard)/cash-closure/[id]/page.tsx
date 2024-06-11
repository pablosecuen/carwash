import { getCashClosureDetails } from '@/actions/cash-closures/getters'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat, variantBadge } from '@/lib/utils'
import { DateFormatter, translateStatus } from '@/utils/formatters'
import { ExportInvoicesToExcel } from './export-invoices-to-excel'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Title } from '@/components/layout/title/title'
import { CardTitle } from '@/components/ui/card'

export default async function Page({ params }: { params: { id: string } }) {
  const { cashClosure } = await getCashClosureDetails(params.id)
  if (cashClosure == null) {
    return <div>Cash closure not found</div>
  }
  return (
    <ContainerPage>
      <section className='grid'>
        <Title title={`Cierre de caja del día ${DateFormatter(new Date(cashClosure.createdAt))}`} />
        <div className='mt-2 space-y-2'>
          <p>
            Total del día:{' '}
            <span className='font-semibold opacity-100'>
              {currencyFormat(cashClosure.totalDaily)}
            </span>{' '}
          </p>
          <p>
            Total cancelado:{' '}
            <span className='font-semibold opacity-100'>
              {currencyFormat(cashClosure.totalCanceled)}
            </span>
          </p>
          <p>
            Pago a los empleados:{' '}
            <span className='font-semibold opacity-100'>
              {currencyFormat(cashClosure.employeePayment)}
            </span>
          </p>
          <p>
            Bonus a los empleados:{' '}
            <span className='font-semibold opacity-100'>
              {currencyFormat(cashClosure.employeeBonus)}
            </span>
          </p>
          <p>
            Bonus a los manager:{' '}
            <span className='font-semibold opacity-100'>
              {currencyFormat(cashClosure.managerBonus)}
            </span>
          </p>
        </div>
        <div className='mt-8'>
          <CardTitle className='flex justify-between font-semibold'>
            Facturas{' '}
            <ExportInvoicesToExcel
              invoices={cashClosure.invoices}
              fileName={`facturas-${cashClosure.id}-${cashClosure.createdAt.toString()}.xlsx`}
            />
          </CardTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Ciente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='max-h-[30vh] overflow-hidden'>
              {cashClosure.invoices.map(({ id, customer, total, createAt, status }) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{DateFormatter(new Date(createAt))}</TableCell>
                  <TableCell>
                    <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
                  </TableCell>
                  <TableCell>{currencyFormat(total)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </ContainerPage>
  )
}
