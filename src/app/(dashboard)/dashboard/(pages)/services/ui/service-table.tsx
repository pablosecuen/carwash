import { Edit } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { VEHICLE_TYPES } from '@/utils/constants'
import Link from 'next/link'
import { type Service } from '@/db/entities/services'
import { DeleteserviceBtn } from './delete-service-btn'
import { DateFormatter, listFormater } from '@/utils/formatters'

export function ServiceTable({ services }: { services: Service[] }) {
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
              <TableHead className='hidden md:table-cell'>Ultima Modificación</TableHead>
              <TableHead>
                <span className='sr-only'>Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map(({ name, cardPrice, cashPrice, id, avaliableFor, updatedAt }) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{name}</TableCell>
                <TableCell className='hidden md:table-cell'>{cashPrice}</TableCell>
                <TableCell className='hidden md:table-cell'>{cardPrice}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  {listFormater(avaliableFor.map((a) => VEHICLE_TYPES[a]))}
                </TableCell>
                <TableCell className='hidden md:table-cell'>
                  {DateFormatter(new Date(updatedAt))}
                </TableCell>
                <TableCell className='flex gap-2'>
                  <Button asChild variant={'ghost'}>
                    <Link href={`/dashboard/products/${id}`} className='flex gap-2'>
                      <Edit />
                      Editar
                    </Link>
                  </Button>

                  <DeleteserviceBtn serviceId={id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
