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
import { getAllCustomers } from '@/utils/getters/customer'
import { Delete, Edit, Link, MoreHorizontal, Trash, Trash2 } from 'lucide-react'
import { UpdateCustomer } from './UpdateCustomer'
import { DeleteCustomer } from './DeleteCustomer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DeleteserviceBtn } from '@/app/(dashboard)/dashboard/(pages)/services/ui/delete-service-btn'
import { Button } from '@/components/ui/button'

export const TableCustomers = async () => {
  const customers = await getAllCustomers()
  return (
    <Card>
      <CardContent>
        <Table>
          <TableCaption>Una lista de sus clientes recientes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Clientes</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Teléfono</TableHead>
              <TableHead>
                <span className='sr-only'>Edit</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup='true' size='icon' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='space-y-1'>
                      <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <UpdateCustomer slug={customer.slug}></UpdateCustomer>
                      </DropdownMenuItem>
                      <DeleteCustomer id={customer.id.toString()} />
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
