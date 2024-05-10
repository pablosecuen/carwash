import { getPaginatedInvoicesByBranchDashboard } from '@/actions/invoice/getters'

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat, dateFormat, variantBadge } from '@/lib/utils'

import { Info } from 'lucide-react'
import { DropdownFilterBranch } from './DropdownFilterBranch'
import { type Branch } from '@/utils/types'

import { SelectStatus } from './select-status'
interface Props {
  params?: {
    page?: string
    branch?: Branch
    query?: string
  }
}
export const TableInvoices = async ({ params }: Props) => {
  const page = params?.page
  const branch = params?.branch

  const invoices = await getPaginatedInvoicesByBranchDashboard({
    page: page ?? 0,
    branch
  })
  console.log({ invoicesnuevos: invoices })
  return (
    <div className='fade-in'>
      <div className=' mb-2 flex items-center justify-end gap-2'>
        <Search placeholder='' />
        <DropdownFilterBranch />
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
                ({ branch, id, total, createAt, status, customer, products, tickets }, index) => {
                  return (
                    <TableRow className={index % 2 === 1 ? 'bg-muted' : ''} key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{branch}</TableCell>
                      <TableCell>
                        <Badge variant={variantBadge(status)}>{status}</Badge>
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
                              <DialogTitle>Detalle de la factura {id}</DialogTitle>
                            </DialogHeader>
                            <h4>Cliente: {customer.name}</h4>
                            <h4>Servicios: </h4>
                            <h4>
                              {tickets.map((item) => (
                                <div key={item.id}>
                                  <p>{item.service?.name ?? ''} </p>
                                  <p>Auto: {item.vehicle.patent}</p>
                                </div>
                              ))}
                            </h4>
                            <h4>Total: {currencyFormat(total)}</h4>

                            <SelectStatus status={status} id={id} />
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )
                }
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
