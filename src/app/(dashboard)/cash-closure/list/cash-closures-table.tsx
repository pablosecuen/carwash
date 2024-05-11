import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { type CashClosures } from '@/db/entities/cash-closures'
import { DateFormatter } from '@/utils/formatters'

export function CashClosuresTable({ cashClosures }: { cashClosures: CashClosures[] }) {
  return (
    <Card>
      <CardContent className='p-0'>
        <Table>
          <TableCaption className='pb-4'>Una lista de sus cierres de caja.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Sucursal</TableHead>
              <TableHead>Total del día</TableHead>
              <TableHead>Porcentaje del día</TableHead>
              <TableHead>Bono al gerente</TableHead>
              <TableHead>Pago a empleados</TableHead>
              <TableHead>Total Restante</TableHead>
              <TableHead>Fecha</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cashClosures.map(
              ({
                branch,
                totalDaily,
                dailyPercentage,
                managerBonus,
                employeePayment,
                createdAt,
                id
              }) => (
                <TableRow key={id}>
                  <TableCell>{branch}</TableCell>
                  <TableCell>{totalDaily}</TableCell>
                  <TableCell>{dailyPercentage}</TableCell>
                  <TableCell>{managerBonus}</TableCell>
                  <TableCell>{employeePayment}</TableCell>
                  <TableCell>{totalDaily - managerBonus - employeePayment}</TableCell>
                  <TableCell>{DateFormatter(new Date(createdAt))}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
