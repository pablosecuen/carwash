import Search from '@/components/search/Search'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { dateFormat, currencyFormat, variantBadge } from '@/lib/utils'

import { Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { getPaginatedInvoicesByBranch } from '@/actions/invoice/getters'
import { type Branch } from '@/utils/types'
import { EmptyPage } from '@/components/layout/page/EmptyPage'
import { translateStatus } from '@/utils/formatters'

interface Props {
  params?: {
    page: string
    branch: Branch
  }
}
export const TableInvoices = async ({ params }: Props) => {
  const page = params?.page
  const branch = params?.branch

  const invoices = await getPaginatedInvoicesByBranch({
    page: page ?? 1,
    branch
  })
  if (invoices.length === 0) {
    return <EmptyPage link='/manager' button_text='Regresar' title='No hay facturas' />
  }
  return (
    <div className='fade-in'>
      <div className=' mb-2 flex items-center justify-end gap-2'>
        <Search placeholder='Buscar por nombre' />
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
                  <TableRow className={index % 2 === 1 ? 'bg-muted' : ''} key={id}>
                    <TableCell>{id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{branch}</TableCell>
                    <TableCell>
                      <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
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
