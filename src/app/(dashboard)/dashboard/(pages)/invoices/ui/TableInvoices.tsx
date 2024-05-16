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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { currencyFormat, dateFormat, variantBadge } from '@/lib/utils'

import { Info } from 'lucide-react'
import { DropdownFilterBranch } from './DropdownFilterBranch'
import { type Branch } from '@/utils/types'

import { SelectStatus } from '../../../../../../components/invoice/select-status'
import { translateStatus } from '@/utils/formatters'
import { Label } from '@/components/ui/label'
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

  const { invoices } = await getPaginatedInvoicesByBranchDashboard({
    page: page ?? 0,
    branch
  })
  console.log(invoices)
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
                <TableHead className='hidden md:table-cell'>Status Ticket</TableHead>
                <TableHead className='hidden md:table-cell'>Fecha</TableHead>
                <TableHead className='hidden md:table-cell'>Status</TableHead>
                <TableHead className='hidden md:table-cell'>Monto total</TableHead>
                <TableHead>
                  <span className='sr-only'>Acciones</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map(
                ({ branch, id, total, createAt, status, customer, products, tickets }, index) => {
                  const ticketStatus = tickets.some((ticket) => ticket.status === 'pending')

                  return (
                    <TableRow className={index % 2 === 1 ? 'bg-muted' : ''} key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{branch}</TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {ticketStatus ? (
                          <Badge variant='pending'>Pendiente</Badge>
                        ) : (
                          <Badge variant='completed'>Completado</Badge>
                        )}
                      </TableCell>
                      <TableCell>{dateFormat(new Date(createAt))}</TableCell>
                      <TableCell>
                        <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
                      </TableCell>
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
                            <Table>
                              <TableHeader>
                                <TableRow className='bg-muted'>
                                  <TableHead>Patente</TableHead>
                                  <TableHead>Marca</TableHead>
                                  <TableHead>Servicio</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {tickets.map((item, index) => (
                                  <TableRow
                                    key={item.id}
                                    className={index % 2 === 1 ? 'bg-muted' : ''}
                                  >
                                    <TableCell className='opacity-80'>
                                      {item.vehicle.patent}
                                    </TableCell>
                                    <TableCell className='capitalize'>
                                      {item.vehicle.brand}
                                    </TableCell>

                                    <TableCell>
                                      <span className='opacity-80'>{item.service?.name ?? ''}</span>
                                    </TableCell>
                                    <TableCell>
                                      <Badge variant={variantBadge(item.status)}>
                                        {translateStatus(item.status)}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>

                            <h4>Productos: </h4>

                            {products.length === 0 && <p>No hay productos</p>}
                            {products.length > 0 && (
                              <Table>
                                <TableHeader>
                                  <TableRow className='bg-muted'>
                                    <TableHead>Producto</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {products.map((item, index) => (
                                    <TableRow
                                      key={item.id}
                                      className={index % 2 === 1 ? 'bg-muted' : ''}
                                    >
                                      <TableCell className='opacity-80'>{item.name}</TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            )}
                            {/* Total de la factura */}
                            <TableFooter className='flex items-center justify-end'>
                              <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>{currencyFormat(total)}</TableCell>
                              </TableRow>
                            </TableFooter>
                            <div className='flex items-center justify-start gap-x-2'>
                              <Label>Status de la factura</Label>
                              <Badge variant={variantBadge(status)}>
                                {translateStatus(status)}
                              </Badge>
                            </div>
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
