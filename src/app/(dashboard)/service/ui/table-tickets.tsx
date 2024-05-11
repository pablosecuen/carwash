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
import { getAllDailyTickets } from '@/actions/tickets'
import { SelectStatus } from './select-status'
import { translateStatus } from '@/utils/formatters'

export async function TableTickets() {
  const dailyTickets = await getAllDailyTickets()

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
                <TableHead>Ticket</TableHead>
                {/* 
                // FIXME: la sucursal se tendria que mostra pero no esta trayendo el la invoice 
                <TableHead className='hidden md:table-cell'>Sucursal</TableHead>
                */}
                <TableHead>Vehiculo</TableHead>
                <TableHead>Status</TableHead>

                <TableHead>Cambiar estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyTickets.map(({ id, status, vehicle = {} }) => {
                return (
                  <TableRow key={id}>
                    <TableCell className='font-medium'>{id}</TableCell>
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
