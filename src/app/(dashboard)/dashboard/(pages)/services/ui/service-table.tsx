import { MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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

// TODO: move to utils
const listFormater = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' })

export function ServiceTable({ services }: { services: Service[] }) {
  return (
    <Card className='fade-in'>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className='hidden md:table-cell'>Precio efectivo</TableHead>
              <TableHead className='hidden md:table-cell'>Precio Tarjeta</TableHead>
              <TableHead className='hidden md:table-cell'>Disponible para</TableHead>
              <TableHead>
                <span className='sr-only'>Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map(({ name, cardPrice, cashPrice, id, avaliableFor }) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{name}</TableCell>
                <TableCell className='hidden md:table-cell'>{cashPrice}</TableCell>
                <TableCell className='hidden md:table-cell'>{cardPrice}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  {listFormater.format(avaliableFor.map((a) => VEHICLE_TYPES[a]))}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup='true' size='icon' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/products/${id}`}>Editar</Link>
                      </DropdownMenuItem>
                      <Button>Eliminar</Button>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
