'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

export function AddCustomer() {
  const [open, setOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)

  // Ejemplo para poner el boton cargando cuando se haga la peticion para guardar el customer
  const onClick = () => {
    setIsLoad(true)
    setTimeout(() => {
      setIsLoad(false)
      setOpen(false)
    }, 5000)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='secondary'>Agregar cliente</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Cliente nuevo</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          {/* Name */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Nombre
            </Label>
            <Input type='text' id='name' className='col-span-3' autoComplete='off' />
          </div>
          {/* Lastname */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='lastname' className='text-right'>
              Apellido
            </Label>
            <Input type='text' id='lastname' className='col-span-3' autoComplete='off' />
          </div>
          {/* email */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-right'>
              Email
            </Label>
            <Input id='email' type='email' className='col-span-3' autoComplete='off' />
          </div>
          {/* phone */}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='phone' className='text-right'>
              Telefono
            </Label>
            <Input id='phone' type='tel' className='col-span-3' autoComplete='off' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit' onClick={onClick} disabled={isLoad}>
            {isLoad ? (
              <>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Guardando...
              </>
            ) : (
              'Agregar'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
