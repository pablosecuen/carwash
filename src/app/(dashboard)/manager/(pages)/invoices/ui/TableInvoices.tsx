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
import { DatePickerInvoice } from './date-picker-invoices'
import { type Invoice } from '@/db/entities'
import { PaginationTable } from '@/app/(dashboard)/service/ui/pagination'
import { ChangePaymentBtn } from './change-payment-btn'

interface Props {
  params?: {
    page: string
    branch: Branch
    query?: string
    from?: string
    to?: string
  }
}
export const TableInvoices = async ({ params }: Props) => {
  const page = params?.page
  const branch = params?.branch
  const query = params?.query
  const from = params?.from
  const to = params?.to
  // TODO: ver tema de filtrado por query
  const { invoices, metadata } = await getPaginatedInvoicesByBranch({
    page: page ?? 0,
    branch,
    customerName: query,
    from,
    to
  })

  const total = metadata?.total ?? 0
  const totalPages = metadata?.totalPages ?? 0
  const currentPage = metadata?.currentPage ?? 0
  const prevPage = metadata?.prevPage ?? 0
  const nextPage = metadata?.nextPage ?? 0

  return (
    <div className='fade-in'>
      <div className=' mb-2 flex items-center justify-end gap-2'>
        <DatePickerInvoice />
        <Search placeholder='Buscar por nombre' />
      </div>
      <Card className='fade-in'>
        <CardContent className='p-0'>
          <TableInvoicesComponent invoices={invoices} />
          <PaginationTable
            total={total}
            totalPages={totalPages}
            currentPage={currentPage}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </CardContent>
      </Card>
    </div>
  )
}

function TableInvoicesComponent({ invoices }: { invoices: Invoice[] }) {
  if (invoices.length === 0) {
    return <EmptyPage link='/manager' button_text='Regresar' title='No hay facturas' />
  }
  return (
    <>
      <Table>
        <TableHeader className='bg-muted'>
          <TableRow>
            <TableHead className='hidden sm:table-cell'>ID</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead className='hidden md:table-cell'>Sucursal</TableHead>
            <TableHead className='hidden md:table-cell'>Status Tickets</TableHead>
            <TableHead className='hidden md:table-cell'>Fecha</TableHead>
            <TableHead className='hidden md:table-cell'>Status</TableHead>
            <TableHead className=''>Monto total</TableHead>
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
                  <TableCell className='hidden sm:table-cell'>{id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell className='hidden md:table-cell'>{branch}</TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {ticketStatus ? (
                      <Badge variant='pending'>Pendiente</Badge>
                    ) : (
                      <Badge variant='completed'>Completado</Badge>
                    )}
                  </TableCell>

                  <TableCell className='hidden md:table-cell'>
                    {dateFormat(new Date(createAt))}
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
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
                          Nombre:{' '}
                          <strong className='tracking-wide opacity-80'>{customer.name}</strong>
                        </p>
                        <p>
                          Email:{' '}
                          <strong className='tracking-wide opacity-80'>
                            {customer.email ?? ''}
                          </strong>
                        </p>
                        <p>
                          Telefono:{' '}
                          <strong className='tracking-wide opacity-80'>
                            {customer.phone ?? ''}
                          </strong>
                        </p>
                        <Separator />

                        {/* Informacion de los productos y servicios */}

                        <DialogTitle className='font-bold'>Productos</DialogTitle>
                        {products.length > 0 &&
                          products.map(({ id, name }) => <p key={id}>{name}</p>)}
                        {products.length === 0 && <p>No hay productos</p>}
                        <Separator />
                        <DialogTitle className='font-bold'>Servicios</DialogTitle>
                        {tickets.map(
                          ({
                            id: ticketId,
                            service,
                            totalPrice,
                            vehicle,
                            status,
                            paymentMethod
                          }) => (
                            <div key={ticketId}>
                              <Separator className=' mb-2 bg-slate-700' />
                              <p>
                                <Badge variant={variantBadge(status)} className='mr-2'>
                                  {translateStatus(status)}
                                </Badge>
                                {vehicle?.patent} - {service?.name}-{' '}
                                {paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'} -{' '}
                                {currencyFormat(totalPrice)}
                              </p>
                              <ChangePaymentBtn
                                {...{ ticketId, invoiceId: id, paymentMethod, service }}
                              />
                            </div>
                          )
                        )}
                        <Separator />
                        {/* Informacion de la factura */}
                        <p>
                          Sucursal: <strong className='tracking-wide opacity-80'>{branch}</strong>
                        </p>

                        <p>
                          Fecha:{' '}
                          <strong className='tracking-wide opacity-80'>
                            {dateFormat(new Date(createAt))}
                          </strong>
                        </p>
                        <p>
                          Monto total:{' '}
                          <strong className='tracking-wide opacity-80'>
                            {currencyFormat(total)}
                          </strong>
                        </p>
                        <div>
                          <p className='mb-4'>
                            Estado:{' '}
                            <Badge variant={variantBadge(status)}>{translateStatus(status)}</Badge>
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
    </>
  )
}
