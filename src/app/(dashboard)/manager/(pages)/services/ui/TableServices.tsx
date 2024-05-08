import { getAllServices } from '@/actions/service/getters'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat } from '@/lib/utils'
import { VEHICLE_TYPES } from '@/utils/constants'
import { DateFormatter, listFormater } from '@/utils/formatters'
import { type Branch } from '@/utils/types'
import React from 'react'

interface Props {
  params?: {
    page: string
    branch: Branch
  }
}
export const TableServices = async ({ params }: Props) => {
  const services = await getAllServices()
  return (
    <Card className='fade-in'>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className='hidden md:table-cell'>Precio efectivo</TableHead>
              <TableHead className='hidden md:table-cell'>Precio Tarjeta</TableHead>
              <TableHead className='hidden md:table-cell'>Disponible para</TableHead>
              <TableHead className='hidden lg:table-cell'>Última Modificación</TableHead>
              <TableHead>
                <span className='sr-only'>Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map(({ name, cardPrice, cashPrice, id, avaliableFor, updatedAt }) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{name}</TableCell>
                <TableCell className='hidden md:table-cell'>{currencyFormat(cashPrice)}</TableCell>
                <TableCell className='hidden md:table-cell'>{currencyFormat(cardPrice)}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  {listFormater(avaliableFor.map((a) => VEHICLE_TYPES[a]))}
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {DateFormatter(new Date(updatedAt))}
                </TableCell>
                <TableCell className='flex gap-2'></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
