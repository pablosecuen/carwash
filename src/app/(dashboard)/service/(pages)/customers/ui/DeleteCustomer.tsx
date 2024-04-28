'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Trash2 } from 'lucide-react'
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

export function DeleteCustomer({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const onDeleteCustomer = () => {
    setLoading(true)
    deleteCustomer(Number(id))
      .then(async () => {
        toast({
          title: 'Eliminado',
          description: 'El cliente ha sido eliminado correctamente',
          duration: 1300
        })
        setOpen(false)
        router.refresh()
      })
      .catch(() => {
        toast({
          title: 'Error',
          description: 'Error al eliminar el cliente',
          duration: 1300,
          variant: 'destructive'
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
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
              onClick={onDeleteCustomer}
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
