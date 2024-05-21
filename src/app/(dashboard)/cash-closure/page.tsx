import { createCashClosureAction } from '@/actions/cash-closures/create'
import { getInvoicesToCashClosure } from '@/actions/invoice/getters'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  const paymentToEmployees = Math.round(total * 0.3)
  const create = await createCashClosureAction({ invoices })
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
        <form action={create} className='grid w-full flex-1 space-y-7'>
          <Label htmlFor='totalDaily'>
            Monto en total caja
            <Input name='totalDaily' type='number' value={total} />
          </Label>
          <Label htmlFor='totalCanceled'>
            Monto en total caja
            <Input name='totalCanceled' type='number' value={cancelleds} />
          </Label>
          <Label htmlFor='dailyPercentage'>
            Porcentaje del día
            <Input name='dailyPercentage' type='number' defaultValue={30} />
          </Label>
          <Label htmlFor='managerBonus'>
            Bonus al gerente
            <Input name='managerBonus' type='number' defaultValue={2000} />
          </Label>
          <Label htmlFor='employeeBonus'>
            Bonus a los empleados
            <Input name='employeeBonus' type='number' defaultValue={0} />
          </Label>
          <Label htmlFor='employeePayment'>
            Pago a empleados
            <Input
              className='opacity-60'
              name='employeePayment'
              type='number'
              value={paymentToEmployees}
            />
          </Label>
          <Button variant={'secondary'} type='submit'>
            Cerrar caja
          </Button>

          <CardTitle>
            {invoices.length === 0
              ? 'No hay facturas para cerrar caja'
              : total === 0
                ? 'No hay monto total para cerrar caja'
                : `El monto total en caja es ${currencyFormat(total)}`}
          </CardTitle>
        </form>
      </div>
    </ContainerPage>
  )
}
