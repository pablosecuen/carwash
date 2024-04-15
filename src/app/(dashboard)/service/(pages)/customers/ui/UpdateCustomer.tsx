import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function UpdateCustomer({ slug }: { slug: string }) {
  return (
    <Button asChild variant={'secondary'} className='w-full cursor-pointer justify-start gap-2'>
      <Link href={`/service/customers/${slug}`}>Editar</Link>
    </Button>
  )
}
