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
import { PAYMENT_METHODS } from '@/utils/constants'
import { ChangePaymentMethodBtnItem } from './change-pay-btn-item'
import { ChangePaymentBtnsInvoice } from './change-pay-btns-invoice'
import { SortButton } from '@/components/ui/sort-button'
import { ExportToPdf } from './export-to-pdf'
import { SendEmailBtn } from './send-email-btn'

interface Props {
  params?: {
    page: string
    branch: Branch
    query?: string
    from?: string
    to?: string
    sortBy?: string
    sortDirection?: 'ASC' | 'DESC'
  }
}
export const TableInvoices = async ({ params }: Props) => {
  const page = params?.page
  const branch = params?.branch
  const query = params?.query
  const from = params?.from
  const to = params?.to
  const sort = {
    sortBy: params?.sortBy,
    sortDir: params?.sortDirection
  }
  // TODO: ver tema de filtrado por query
  const { invoices, metadata } = await getPaginatedInvoicesByBranch({
    page: page ?? 0,
    branch,
    customerName: query,
    sort,
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
            <TableHead>
              Cliente
              <SortButton sortBy='customer.name' />
            </TableHead>
            <TableHead className='hidden md:table-cell'>
              Sucursal <SortButton sortBy='branch' />
            </TableHead>
            <TableHead className='hidden md:table-cell'>Estado Tickets</TableHead>
            <TableHead className='hidden md:table-cell'>
              Fecha <SortButton sortBy='createAt' />{' '}
            </TableHead>
            <TableHead className='hidden md:table-cell'>Estado</TableHead>
            <TableHead className=''>
              Monto total
              <SortButton sortBy='total' />
            </TableHead>
            <TableHead>
              <span className='sr-only'>Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map(
            ({ branch, id, total, createAt, status, customer, items, tickets }, index) => {
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
                          Más info
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='max-h-[90vh] overflow-y-scroll'>
                        <DialogHeader>
                          <DialogTitle>Detalle de la factura</DialogTitle>
                        </DialogHeader>
                        {/* Información del cliente */}
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
                          Teléfono:{' '}
                          <strong className='tracking-wide opacity-80'>
                            {customer.phone ?? ''}
                          </strong>
                        </p>
                        <ExportToPdf invoiceId={id} />
                        <SendEmailBtn invoiceId={id} />
                        <Separator />

                        {/* Información de los productos y servicios */}
                        {/* 
                          // TODO: cambiar estilos de los productos y servicios a una tabla
                        */}
                        <DialogTitle className='font-bold'>Productos</DialogTitle>
                        {items.length > 0 &&
                          items.map(({ id: itemId, product, paymentMethod, totalPrice }) => (
                            <div key={itemId}>
                              <Separator className=' mb-2 bg-slate-700' />
                              <p>
                                {product?.name} - {PAYMENT_METHODS[paymentMethod]} -{' '}
                                {currencyFormat(totalPrice)}
                              </p>
                              <ChangePaymentMethodBtnItem
                                {...{ invoiceId: id, itemId, product, paymentMethod }}
                              />
                            </div>
                          ))}
                        {items.length === 0 && <p>No hay productos</p>}
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
                            <div key={ticketId} className='space-y-3'>
                              <p>
                                <strong>Servicio: </strong>
                                <span>{service?.name}</span>
                              </p>
                              <p>
                                <strong>Patente: </strong>
                                <span>{vehicle?.patent}</span>
                              </p>
                              <p>
                                <strong>Método de pago: </strong>

                                <span>{paymentMethod === 'cash' ? 'Efectivo' : 'Tarjeta'}</span>
                              </p>

                              <div className='flex flex-col justify-between'>
                                <p>
                                  <strong>Monto: </strong> {currencyFormat(totalPrice)}{' '}
                                  <Badge variant={variantBadge(status)} className='mx-2'>
                                    {translateStatus(status)}
                                  </Badge>
                                </p>
                              </div>
                              <ChangePaymentBtn
                                {...{ ticketId, invoiceId: id, paymentMethod, service }}
                              />
                              <Separator className=' my-2 bg-slate-700' />
                            </div>
                          )
                        )}
                        {tickets.length === 0 && <Separator />}
                        {/* Información de la factura */}
                        <p>
                          <strong>Sucursal:</strong>{' '}
                          <strong className='tracking-wide opacity-80'>{branch}</strong>
                        </p>

                        <p>
                          <strong>Fecha: </strong>
                          <strong className='tracking-wide opacity-80'>
                            {dateFormat(new Date(createAt))}
                          </strong>
                        </p>
                        <p>
                          <strong>Monto total: </strong>
                          <strong className='tracking-wide opacity-80'>
                            {currencyFormat(total)}
                          </strong>
                        </p>
                        <ChangePaymentBtnsInvoice invoiceId={id} />
                        <div>
                          <p className='mb-4'>
                            <strong>Estado: </strong>
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
