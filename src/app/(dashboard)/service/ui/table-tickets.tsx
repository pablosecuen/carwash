import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { variantBadge } from '@/lib/utils'

import { Badge } from '@/components/ui/badge'
import { getAllDailyTickets, getPendingTickets } from '@/actions/tickets'
import { SelectStatus } from './select-status'
import { translateStatus } from '@/utils/formatters'
import { SortButton } from '@/components/ui/sort-button'

export async function TableTickets({
  searchParams
}: {
  searchParams?: {
    sortBy: string
    sortDirection?: 'ASC' | 'DESC'
    tab?: 'daily' | 'pending'
  }
}) {
  let tickets

  if (searchParams?.tab === 'pending') {
    tickets = await getPendingTickets({
      sort: {
        sortBy: searchParams?.sortBy,
        orderDir: searchParams?.sortDirection
      }
    })
  } else {
    tickets = await getAllDailyTickets({
      sort: {
        sortBy: searchParams?.sortBy,
        orderDir: searchParams?.sortDirection
      }
    })
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='text-lg font-semibold'>Lista de tickets</CardTitle>
        </CardHeader>
        <CardContent className='p-0'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  Ticket <SortButton sortBy='id' />
                </TableHead>
                <TableHead className='hidden md:table-cell'>Sucursal</TableHead>
                <TableHead>Vehiculo </TableHead>
                <TableHead>
                  Status <SortButton sortBy='status' />
                </TableHead>

                <TableHead>Cambiar estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map(({ id, status, vehicle = {}, invoice = {} }) => {
                return (
                  <TableRow key={id}>
                    <TableCell className='font-medium'>{id}</TableCell>
                    <TableCell className='hidden md:table-cell'>{invoice?.branch}</TableCell>
                    <TableCell>
                      {vehicle.brand} {vehicle.model} ({vehicle.patent})
                    </TableCell>
                    <TableCell>
                      <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
                    </TableCell>
                    <TableCell>
                      <SelectStatus status={status} id={id} />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
