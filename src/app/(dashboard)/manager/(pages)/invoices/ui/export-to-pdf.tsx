'use client'

import { buttonVariants } from '@/components/ui/button'
import { FileDownIcon } from 'lucide-react'
import Link from 'next/link'

export function ExportToPdf({ invoiceId }: { invoiceId: string | number }) {
  return (
    // <Button variant='secondary' asChild>
    //   <a href={`/api/pdf/invoice/${invoiceId}`}>Exportar a PDF</a>
    // </Button>
    <Link href={`/api/pdf/invoice/${invoiceId}`} className={buttonVariants({ variant: 'outline' })}>
      <FileDownIcon className='mr-2 h-5 w-5' />
      Exportar a PDF
    </Link>
  )
}
