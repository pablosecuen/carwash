import { Button } from '@/components/ui/button'
import { Edit } from 'lucide-react'
import Link from 'next/link'

export function UpdateCustomer({ slug }: { slug: string }) {
  return (
    <Button asChild variant={'ghost'} className=' cursor-pointer justify-start gap-2'>
      <Link href={`/service/customers/${slug}`}>
        <Edit />
        Editar
      </Link>
    </Button>
  )
}
