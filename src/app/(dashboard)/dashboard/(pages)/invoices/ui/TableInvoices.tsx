import { getPaginatedInvoices } from '@/actions/invoice/getters'

import Search from '@/components/search/Search'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
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
import { currencyFormat, dateFormat } from '@/lib/utils'

import { Info, ListFilter } from 'lucide-react'
interface Props {
  params?: {
    page?: string
  }
}
export const TableInvoices = async ({ params }: Props) => {
  const page = params?.page
  const invoices = await getPaginatedInvoices({
    page: page ?? 1
  })

  return (
    <div className='fade-in'>
      <div className=' mb-2 flex items-center justify-end gap-2'>
        <Search placeholder='' />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
              <ListFilter className='h-3.5 w-3.5' />
              <span className='sr-only sm:not-sr-only'>sucursal</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem checked>Sucursal 1</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Sucursal 2</DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem>Sucursal 3</DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Card className='fade-in'>
        <CardContent className='p-0'>
          <Table>
            <TableHeader className='bg-muted'>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className='hidden md:table-cell'>Sucursal</TableHead>
                <TableHead className='hidden md:table-cell'>Status</TableHead>
                <TableHead className='hidden md:table-cell'>Fecha</TableHead>
                <TableHead className='hidden md:table-cell'>Monto total</TableHead>
                <TableHead>
                  <span className='sr-only'>Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(
                ({ branch, id, total, createAt, status, customer, products, tickets }, index) => (
                  <TableRow className={index % 2 == 1 ? 'bg-muted' : ''} key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>Imanol</TableCell>
                    <TableCell>{branch}</TableCell>
                    <TableCell>
                      <Badge variant={'success'}>{status}</Badge>
                    </TableCell>
                    <TableCell>{dateFormat(new Date(createAt))}</TableCell>
                    <TableCell>{currencyFormat(total)}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant={'outline'}>
                            <Info className='mr-2 h-5 w-5' />
                            Mas info
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Detalle de la factura</DialogTitle>
                          </DialogHeader>
                          Aca va toda la info de la factura {id}
                          {JSON.stringify(customer, null, 2)}
                          {JSON.stringify(products, null, 2)}
                          {JSON.stringify(tickets, null, 2)}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
