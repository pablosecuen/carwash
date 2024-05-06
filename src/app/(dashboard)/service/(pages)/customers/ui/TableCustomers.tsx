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
import { getAllCustomers } from '@/actions/customer/getters'
import { formatSlugFromCustomer } from '@/utils/slug'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Edit } from 'lucide-react'

export const TableCustomers = async () => {
  const customers = await getAllCustomers()
  return (
    <Card>
      <CardContent className='p-0'>
        <Table>
          <TableCaption className='pb-4'>Una lista de sus clientes recientes.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='font-bold'>Clientes</TableHead>
              <TableHead className='font-bold'>Email</TableHead>
              <TableHead className='font-bold'>Teléfono</TableHead>
              <TableHead className='font-bold'>
                <span className='sr-only'>Edit</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className='border-b'>
            {customers.map((customer) => (
              <TableRow className='border-b font-semibold' key={customer.id}>
                {/* Nombre */}
                <TableCell>{customer.name}</TableCell>
                {/* Email */}
                <TableCell>{customer.email}</TableCell>
                {/* Telefono */}
                <TableCell>{customer.phone}</TableCell>
                <TableCell>
                  {/* Editar */}
                  <Button asChild variant={'ghost'} className=' cursor-pointer justify-start gap-2'>
                    <Link href={`/service/customers/${formatSlugFromCustomer(customer)}`}>
                      <Edit />
                      Editar
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
