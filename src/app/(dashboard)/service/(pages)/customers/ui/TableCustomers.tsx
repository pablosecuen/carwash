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
import { Delete, Edit, Trash, Trash2 } from 'lucide-react'
import { UpdateCustomer } from './UpdateCustomer'
import { DeleteCustomer } from './DeleteCustomer'

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
                <TableCell className='whitespace-nowrap'>
                  <div className='flex justify-end gap-3'>
                    <UpdateCustomer id={customer.id.toString()} />
                    <DeleteCustomer id={customer.id.toString()} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
