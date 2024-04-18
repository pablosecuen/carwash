'use client'

import { deleteCustomer } from '@/actions/customer/delete-customer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { sleep } from '@/lib/utils'
import { Loader2, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function DeleteCustomer({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  // TODO: Retornar modal para preguntar si realmente lo quiere eliminar

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='destructive' className='w-full justify-start gap-2'>
            Eliminar
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <h3 className='text-lg font-medium leading-6 text-red-500'>
              Seguro que quieres eliminar el cliente?
            </h3>
            <p className='mt-1 text-sm '>Esta acción no se puede deshacer</p>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={'destructive'}
              className='w-full justify-center gap-2'
              onClick={() => {
                setLoading(true)
                deleteCustomer(Number(id))
                  .then(async () => {
                    await sleep(200)
                    router.refresh()
                  })
                  .catch(() => {
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
              {loading ? (
                <>
                  <Loader2 className='animate-spin' /> <span>Eliminando...</span>
                </>
              ) : (
                <>
                  <Trash2 className='w-5' /> <span>Eliminar</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
