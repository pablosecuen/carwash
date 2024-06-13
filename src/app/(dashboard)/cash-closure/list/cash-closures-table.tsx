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
import { currencyFormat } from '@/lib/utils'
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
              <TableHead>Porcentaje del día</TableHead>
              <TableHead>Bono al gerente</TableHead>
              <TableHead>Pago a empleados</TableHead>
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
                createdAt,
                id
              }) => (
                <TableRow key={id}>
                  <TableCell>{branch}</TableCell>
                  <TableCell>{currencyFormat(totalDaily)}</TableCell>
                  <TableCell>{dailyPercentage}%</TableCell>
                  <TableCell>{currencyFormat(managerBonus)}</TableCell>
                  <TableCell>{currencyFormat(employeePayment)}</TableCell>
                  <TableCell>
                    {currencyFormat(totalDaily - managerBonus - employeePayment)}
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
