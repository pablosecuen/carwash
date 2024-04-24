import { MoreHorizontal } from 'lucide-react'

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
      <CardContent>
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
            {products.map(({ name, cardPrice, cashPrice, id, updatedAt }) => (
              <TableRow key={id}>
                <TableCell className='font-medium'>{name}</TableCell>
                <TableCell className='hidden md:table-cell'>{currencyFormat(cashPrice)}</TableCell>
                <TableCell className='hidden md:table-cell'>{currencyFormat(cardPrice)}</TableCell>
                <TableCell className='hidden md:table-cell'>
                  {DateFormatter(new Date(updatedAt))}
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
                      <DeleteProductBtn productId={id} />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className='text-xs text-muted-foreground'>
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  )
}
