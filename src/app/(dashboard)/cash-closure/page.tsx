import { createCashClosureAction } from '@/actions/cash-closures/create'
import { getDailyInvoices } from '@/actions/invoice/getters'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
      <Card className='border-none'>
        <CardHeader>
          <CardTitle>Cierre de caja</CardTitle>
          <CardDescription>Contenido de la página de cierre de caja</CardDescription>
        </CardHeader>
        <CardContent className='grid gap-16 space-y-16 lg:grid-cols-2'>
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
            <TableBody>
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
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell>{currencyFormat(total)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>

          <form action={createCashClosureAction} className='grid space-y-3 '>
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
              <Input name='managerBonus' type='number' defaultValue={2000} />
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
          </form>
        </CardContent>
      </Card>
    </ContainerPage>
  )
}
