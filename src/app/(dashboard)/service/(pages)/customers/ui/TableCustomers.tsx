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
import { Delete, Edit } from 'lucide-react'

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
                    <Edit />
                    <Delete />
                    {/* <UpdateCustomer id={invoice.id} /> */}
                    {/* <DeleteCustomer id={invoice.id} /> */}
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

// export function UpdateCustomer({ id }: { id: string }) {
//   return (
//     <Link
//       href={`/dashboard/invoices/${id}/edit`}
//       className="rounded-md border p-2 hover:bg-gray-100"
//     >
//       <PencilIcon className="w-5" />
//     </Link>
//   );
// }

// export function DeleteCustomer({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id);
//   return (
//     <form action={deleteInvoiceWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-5" />
//       </button>
//     </form>
//   );
// }
