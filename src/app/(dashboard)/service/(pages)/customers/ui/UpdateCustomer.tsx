import { Button } from '@/components/ui/button'
import { FilePenIcon } from 'lucide-react'
import Link from 'next/link'

export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Button asChild variant={'secondary'}>
      <Link href={`/dashboard/invoices/${id}/edit`}>
        <FilePenIcon className='w-5' />
      </Link>
    </Button>
  )
}
