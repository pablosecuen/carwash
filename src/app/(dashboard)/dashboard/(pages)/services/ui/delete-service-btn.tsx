'use client'

import { removeServiceAction } from '@/actions/service/remove-service'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { OctagonX } from 'lucide-react'
import { useRouter } from 'next/navigation'

// FIXME: close dropdown after delete
export function DeleteserviceBtn({ serviceId }: { serviceId: number }) {
  const router = useRouter()
  async function handleDelete() {
    const { ok, message } = await removeServiceAction(Number(serviceId))
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
    <Button size='sm' variant='destructive' className='gap-2' onClick={handleDelete}>
      <OctagonX />
      Eliminar
    </Button>
  )
}
