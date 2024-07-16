import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SortButton } from '@/components/ui/sort-button'
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
import { calculatePayPerEmployee, currencyFormat } from '@/lib/utils'
import { BRANCHES } from '@/utils/constants'
import { DateFormatter } from '@/utils/formatters'
import { InfoIcon } from 'lucide-react'
import Link from 'next/link'

export function CashClosuresTable({ cashClosures }: { cashClosures: CashClosures[] }) {
  return (
    <Card>
      <CardContent className='p-0'>
        <Table>
          <TableCaption className='pb-4'>Una lista de sus cierres de caja.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                Sucursal <SortButton sortBy='branch' />
              </TableHead>
              <TableHead>
                Total del día <SortButton sortBy='totalDaily' />
              </TableHead>
              <TableHead>Total en efectivo</TableHead>
              <TableHead>Porcentaje del día</TableHead>
              <TableHead>Pago al gerente</TableHead>
              <TableHead>Número de empleados</TableHead>
              <TableHead>Pago a empleados</TableHead>
              <TableHead>Pago por empleado</TableHead>
              <TableHead>Total Restante</TableHead>
              <TableHead>
                Fecha <SortButton sortBy='createdAt' />
              </TableHead>
              <TableHead>
                <span className='sr-only'>Acciones</span>
              </TableHead>
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
                totalDailyCash,
                employeesNum,
                createdAt,
                id
              }) => (
                <TableRow key={id}>
                  <TableCell>{BRANCHES[branch]}</TableCell>
                  <TableCell>{currencyFormat(totalDaily)}</TableCell>
                  <TableCell>{currencyFormat(totalDailyCash)}</TableCell>
                  <TableCell>{dailyPercentage}%</TableCell>
                  <TableCell>
                    {currencyFormat(
                      calculatePayPerEmployee({ employeesNum, employeePayment }) + managerBonus
                    )}
                  </TableCell>
                  <TableCell>{employeesNum}</TableCell>
                  <TableCell>{currencyFormat(employeePayment)}</TableCell>
                  <TableCell>
                    {currencyFormat(calculatePayPerEmployee({ employeesNum, employeePayment }))}
                  </TableCell>
                  <TableCell>
                    {currencyFormat(totalDailyCash - managerBonus - employeePayment)}
                  </TableCell>
                  <TableCell>{DateFormatter(new Date(createdAt))}</TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center'>
                      <Link
                        href={`/cash-closure/${id}`}
                        className={buttonVariants({ variant: 'outline' })}
                      >
                        <InfoIcon className='mr-2 h-5 w-5' />
                        Detalle
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
