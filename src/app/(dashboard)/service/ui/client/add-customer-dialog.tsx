'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { createCustomerAction } from '@/actions/customer/create-customer'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AddCustomer() {
  const router = useRouter()

  // Estados para manejar el dialog
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const createCustomer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    setIsLoading(true)
    await createCustomerAction(formData)
    setIsLoading(false)
    form.reset()
    setOpen(false)
    // redireccionar a "/customer/dashboard"
    router.push('/customer/dashboard')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='default' size={'sm'}>
          Nuevo cliente
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Cliente nuevo</DialogTitle>
          <DialogDescription>Agregue los datos del cliente</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <form onSubmit={createCustomer} className='space-y-4'>
            {/* Name */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='name' className='text-right'>
                Nombre
              </Label>
              <Input type='text' id='name' name='name' className='col-span-3' autoComplete='off' />
            </div>
            {/* Lastname */}
            {/* <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='lastname' className='text-right'>
                Apellido
              </Label>
              <Input type='text' id='lastname' className='col-span-3' autoComplete='off' />
            </div> */}
            {/* email */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='email' className='text-right'>
                Email
              </Label>
              <Input
                id='email'
                type='email'
                name='email'
                className='col-span-3'
                autoComplete='off'
              />
            </div>
            {/* phone */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='phone' className='text-right'>
                Telefono
              </Label>
              <Input id='phone' type='tel' name='phone' className='col-span-3' autoComplete='off' />
            </div>
            {/* Address */}
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='address' className='text-right'>
                Dirección
              </Label>
              <Input
                id='address'
                type='text'
                name='address'
                className='col-span-3'
                autoComplete='off'
              />
            </div>
            <DialogFooter>
              <Button
                type='button'
                variant='secondary'
                onClick={() => {
                  setOpen(false)
                }}
                disabled={isLoading}
                className='mr-2'
              >
                Cancelar
              </Button>

              <Button type='submit' disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Please wait
                  </>
                ) : (
                  'Crear'
                )}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
