import { getInvoiceDetails } from '@/actions/invoice/getters'
import { createInvoicePdf } from '@/utils/pdf'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { invoice } = await getInvoiceDetails({ id: Number(params.id) })
  const invoicePdf = await createInvoicePdf({ invoice })
  return new Response(invoicePdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${params.id}.pdf`
    }
  })
}
