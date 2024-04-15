'use client'

import { removeProductAction } from '@/actions/product/remove-product'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export function DeleteProductBtn({ productId }: { productId: number }) {
  const router = useRouter()
  async function handleDelete() {
    const { ok, message } = await removeProductAction(Number(productId))
    if (!ok) {
      toast({
        variant: 'destructive',
        title: message
      })
      return
    }
    toast({
      title: message
    })

    const delay = setTimeout(() => {
      clearTimeout(delay)
      router.refresh()
    }, 1000)
  }

  return (
    <Button size='sm' variant='destructive' className='w-full justify-start' onClick={handleDelete}>
      Eliminar
    </Button>
  )
}
