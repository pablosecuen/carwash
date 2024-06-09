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

export default async function Page({ params }: { params: { id: string } }) {
  const { cashClosure } = await getCashClosureDetails(params.id)
  if (cashClosure == null) {
    return <div>Cash closure not found</div>
  }
  return (
    <section className='grid'>
      <div>
        <h1>Cierre de caja del día {DateFormatter(new Date(cashClosure.createdAt))}</h1>
        <p>Total del día: {currencyFormat(cashClosure.totalDaily)}</p>
        <p>Total cancelado: {currencyFormat(cashClosure.totalCanceled)}</p>
        <p>Pago a los empleados: {currencyFormat(cashClosure.employeePayment)}</p>
        <p>Bonus a los empleados: {currencyFormat(cashClosure.employeeBonus)}</p>
        <p>Bonus a los manager: {currencyFormat(cashClosure.managerBonus)}</p>
      </div>
      <div>
        <h2>
          Facturas{' '}
          <ExportInvoicesToExcel
            invoices={cashClosure.invoices}
            fileName={`facturas-${cashClosure.id}-${cashClosure.createdAt.toString()}.xlsx`}
          />
        </h2>
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
  )
}
