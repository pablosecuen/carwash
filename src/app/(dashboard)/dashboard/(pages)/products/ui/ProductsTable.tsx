import { Edit, MoreHorizontal } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
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
import { type Product } from '@/db/entities/product'
import Link from 'next/link'
import { DeleteProductBtn } from './delete-product-btn'
import { currencyFormat } from '@/lib/utils'
import { DateFormatter } from '@/utils/formatters'

interface Props {
  products: Product[]
}

export function ProductsTable({ products }: Props) {
  return (
    <Card className='fade-in'>
      <CardContent className='p-0'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className='hidden md:table-cell'>Precio efectivo</TableHead>
              <TableHead className='hidden md:table-cell'>Precio Tarjeta</TableHead>
              <TableHead className='hidden md:table-cell'>Ultima Modificación</TableHead>
              <TableHead>
                <span className='sr-only'>Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map(({ name, cardPrice, cashPrice, id, updatedAt }) => {
              return (
                <TableRow key={id}>
                  <TableCell className='font-medium'>{name}</TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {currencyFormat(cashPrice)}
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {currencyFormat(cardPrice)}
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {DateFormatter(new Date(updatedAt))}
                  </TableCell>
                  <TableCell className='flex gap-x-4'>
                    <Button asChild variant={'ghost'}>
                      <Link href={`/dashboard/products/${id}`} className='flex gap-x-2'>
                        <Edit />
                        Editar
                      </Link>
                    </Button>

                    <DeleteProductBtn productId={id} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className='text-xs text-muted-foreground'>
          Mostrando <strong>1-{products.length < 10 ? products.length : '10'}</strong> de{' '}
          <strong>{products.length}</strong> productos
        </div>
      </CardFooter>
    </Card>
  )
}
