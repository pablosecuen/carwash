import { invoiceRepository } from '@/db/repositories/invoice'
import path from 'path'
// TODO: change pdfkit-table for pdfkit vanilla
import PDFDocument from 'pdfkit-table'
import fs from 'fs'
import { currencyFormat } from '@/lib/utils'
import { DateFormatter } from '@/utils/formatters'
import { PAYMENT_METHODS } from '@/utils/constants'

const font = path.join('public/fonts/Roboto-Regular.ttf')

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { invoice } = await invoiceRepository.findById(Number(params.id), {
    joins: {
      items: {
        product: true
      },
      tickets: {
        service: true,
        vehicle: true
      },
      customer: true
    }
  })

  const pathFile = `tmp/invoice.pdf`
  const stream = fs.createWriteStream(pathFile)
  const doc = new PDFDocument({
    margin: 10,
    size: 'A6',
    font: path.join('public/fonts/Roboto-Regular.ttf')
  })
  doc.pipe(stream)

  doc.image('public/carwash-logo.png', 81, 10, {
    width: 140,
    align: 'center'
  })

  doc
    .text(`Factura #${invoice.id}`, 10, 115, {
      align: 'center',
      underline: true,
      height: 8
    })
    .fontSize(8)

  doc
    .text(`Cliente: ${invoice.customer.name}`, 10, doc.y + 5, {
      align: 'left'
    })
    .fontSize(8)

  doc
    .text(`Fecha: ${DateFormatter(invoice.createAt, { hour: '2-digit', minute: '2-digit' })}`)
    .fontSize(8)

  doc
    .text(`Email: ${invoice.customer.email}`, {
      align: 'left'
    })
    .fontSize(8)
  doc
    .text(`Phone: ${invoice.customer.phone}`, {
      align: 'left'
    })
    .fontSize(8)

  await doc.table(
    {
      headers: [
        { label: 'Item/Servicio', align: 'left' },
        { label: 'Metodo de pago', align: 'right' },
        { label: 'Precio', align: 'right' }
      ],
      rows: [
        ...invoice.items.map((item) => [
          item.product.name,
          PAYMENT_METHODS[item.paymentMethod],
          currencyFormat(item.totalPrice)
        ]),
        ...invoice.tickets.map((ticket) => [
          `${ticket.service?.name ?? 'Servicio no encontrado'} - ${ticket.vehicle.brand} ${ticket.vehicle.model} [${ticket.vehicle?.patent}]`,
          PAYMENT_METHODS[ticket.paymentMethod],
          currencyFormat(ticket.totalPrice)
        ])
      ]
    },
    {
      y: doc.y + 5,
      prepareHeader: () => doc.font(font).fontSize(10),
      prepareRow: () => doc.font(font).fontSize(8)
    }
  )

  doc
    .text(`Total: ${currencyFormat(invoice.total)}`, {
      align: 'right',
      stroke: true
    })
    .fontSize(10)

  doc.save()
  doc.end()

  const readFile = fs.readFileSync(pathFile)

  return new Response(readFile, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${invoice.id}.pdf`
    }
  })
}
