import { createCashClosureAction } from '@/actions/cash-closures/create'
import { getDailyInvoices } from '@/actions/invoice/getters'
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

export default async function Page() {
  const { invoices } = await getDailyInvoices()
  const total = invoices.reduce((acc, invoice) => acc + invoice.total, 0)
  const paymentToEmployees = Math.round(total * 0.3)
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
            </TableBody>
          </Table>
          <div className='flex items-center justify-end bg-muted'>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell>{currencyFormat(total)}</TableCell>
          </div>
        </div>
        <form action={createCashClosureAction} className='grid w-full flex-1 space-y-7'>
          <Label htmlFor='totalDaily'>
            Monto en total caja
            <Input name='totalDaily' type='number' value={total} />
          </Label>
          <Label htmlFor='dailyPercentage'>
            Porcentaje del día
            <Input name='dailyPercentage' type='number' defaultValue={30} />
          </Label>
          <Label htmlFor='managerBonus'>
            Bonus al gerente
            <Input name='managerBonus' type='number' />
          </Label>
          <Label htmlFor='employeeBonus'>
            Bonus a los empleados
            <Input name='employeeBonus' type='number' defaultValue={0} />
          </Label>
          <Label htmlFor='employeePayment'>
            Pago a empleados
            <Input
              disabled
              name='employeePayment'
              type='number'
              defaultValue={paymentToEmployees}
            />
          </Label>
          <Button variant={'secondary'} type='submit'>
            Cerrar caja
          </Button>

          <CardTitle>
            {invoices.length === 0 ? 'No hay facturas para cerrar caja' : ''}
            {total === 0 ? 'No hay monto total para cerrar caja' : ''}
            {total > 0 && invoices.length > 0
              ? `El monto total en caja es ${currencyFormat(total)}`
              : 'No hay facturas ni monto total para cerrar caja'}
          </CardTitle>
        </form>
      </div>
    </ContainerPage>
  )
}
