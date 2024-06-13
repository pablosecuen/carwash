'use server'

import { sendMail } from '@/lib/mailer'
import { getInvoiceDetails } from './getters'
import { createInvoicePdf } from '@/utils/pdf'

export async function sendEmailWithPdf({ id }: { id: string | number }) {
  try {
    const { invoice } = await getInvoiceDetails({ id: Number(id) })
    if (invoice?.customer.email == null) {
      return {
        ok: false,
        message: 'El cliente no tiene un email registrado.'
      }
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
    return {
      ok: true,
      message: 'Email enviado'
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al enviar el email'
    }
  }
}
