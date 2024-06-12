import { createInvoicePdf } from '@/utils/pdf'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const invoicePdf = await createInvoicePdf({ invoiceId: Number(params.id) })

  return new Response(invoicePdf, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice-${params.id}.pdf`
    }
  })
}
