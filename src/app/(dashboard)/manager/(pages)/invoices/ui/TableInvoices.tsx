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
import { SelectStatus } from '@/components/invoice/select-status'
import { Separator } from '@/components/ui/separator'

interface Props {
  params?: {
    page: string
    branch: Branch
    query?: string
  }
}
export const TableInvoices = async ({ params }: Props) => {
  const page = params?.page
  const branch = params?.branch
  const query = params?.query
  const invoices = await getPaginatedInvoicesByBranch({
    page: page ?? 1,
    branch,
    customerName: query
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
                <TableHead className='hidden sm:table-cell'>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className='hidden md:table-cell'>Sucursal</TableHead>
                <TableHead className='hidden md:table-cell'>Status</TableHead>
                <TableHead className='hidden md:table-cell'>Fecha</TableHead>
                <TableHead className=''>Monto total</TableHead>
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
                      <TableCell className='hidden sm:table-cell'>{id}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell className='hidden md:table-cell'>{branch}</TableCell>
                      <TableCell className='hidden md:table-cell'>
                        <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
                      </TableCell>
                      <TableCell className='hidden md:table-cell'>
                        {dateFormat(new Date(createAt))}
                      </TableCell>
                      <TableCell className=''>{currencyFormat(total)}</TableCell>
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
                            {/* Informacion del cliente */}
                            <Separator />
                            <DialogTitle className='font-bold'>Cliente</DialogTitle>
                            <p>
                              Nombre: <strong>{customer.name}</strong>
                            </p>
                            <p>
                              Email: <strong>{customer.email ?? ''}</strong>
                            </p>
                            <p>
                              Telefono: <strong>{customer.phone ?? ''}</strong>
                            </p>
                            <Separator />

                            {/* Informacion de los productos y servicios */}

                            <DialogTitle className='font-bold'>Productos</DialogTitle>
                            {products.map(({ id, name }) => (
                              <p key={id}>{name}</p>
                            ))}
                            <Separator />
                            <DialogTitle className='font-bold'>Servicios</DialogTitle>
                            {tickets.map(({ id, service, totalPrice, vehicle }) => (
                              <p key={id}>
                                {vehicle?.patent} - {service?.name} - {currencyFormat(totalPrice)}
                              </p>
                            ))}
                            <Separator />
                            {/* Informacion de la factura */}
                            <p>
                              Sucursal: <strong>{branch}</strong>
                            </p>

                            <p>
                              Fecha: <strong>{dateFormat(new Date(createAt))}</strong>
                            </p>
                            <p>
                              Monto total: <strong>{currencyFormat(total)}</strong>
                            </p>
                            <div>
                              <p className='mb-4'>
                                Estado:{' '}
                                <Badge variant={variantBadge(status)}>
                                  {translateStatus(status)}
                                </Badge>
                              </p>
                              <SelectStatus status={status} id={id} />
                            </div>
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
