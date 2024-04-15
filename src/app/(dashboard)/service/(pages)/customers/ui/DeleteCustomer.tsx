'use client'

import { deleteCustomer } from '@/actions/customer/delete-customer'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteCustomer({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  return (
    <Button
      variant={'destructive'}
      onClick={() => {
        setLoading(true)
        deleteCustomer(Number(id))
          .then(async () => {
            router.refresh()
          })
          .catch((error) => {
            toast({
              title: 'Error',
              description: 'Error al eliminar el cliente',
              duration: 900,
              variant: 'destructive'
            })
          })
          .finally(() => {
            setLoading(false)
          })
      }}
      disabled={loading}
    >
      {loading ? <Loader2 /> : <Trash2 className='w-5' />}
    </Button>
  )
}
