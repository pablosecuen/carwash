'use client'

import { Button } from '@/components/ui/button'

export function ExportToPdf({ invoiceId }: { invoiceId: string | number }) {
  return (
    <Button variant='secondary' asChild>
      <a href={`/api/pdf/invoice/${invoiceId}`}>Exportar a PDF</a>
    </Button>
  )
}
