import { getInvoiceDetails } from '@/actions/invoice/getters'
import { sendMail } from '@/lib/mailer'
import { createInvoicePdf } from '@/utils/pdf'
import { NextResponse } from 'next/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  try {
    const { invoice } = await getInvoiceDetails({ id: Number(params.id) })
    if (invoice?.customer.email == null) {
      return NextResponse.json(
        {
          ok: false,
          message: 'El cliente no tiene un email registrado.'
        },
        {
          status: 400
        }
      )
    }

    const customer = invoice.customer
    // TODO: imporve email template and title
    await sendMail({
      emailTitle: 'Factura de compra en Mc CarSPA',
      emailAddress: customer.email,
      html: `<h1>¡Hola ${customer.name}! </h1><p>Este es tu comprobante de compra.</p>`,
      attachments: [
        {
          filename: 'invoice.pdf',
          content: await createInvoicePdf({ invoice })
        }
      ]
    })
    return NextResponse.json({
      ok: true,
      message: 'Email enviado'
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      {
        ok: false,
        message: 'Error al enviar el email'
      },
      {
        status: 500
      }
    )
  }
}
