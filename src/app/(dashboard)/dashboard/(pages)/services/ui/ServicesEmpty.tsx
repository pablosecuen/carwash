import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const ServicesEmpty = () => {
  return (
    <div className='flex min-h-[70dvh] flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm fade-in'>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>No tienes servicios</h3>
        <p className='text-sm text-muted-foreground'>
          Puedes empezar a vender tan pronto como añadas un servicio.
        </p>
        <Button className='mt-4 font-semibold' asChild>
          <Link href={'/dashboard/services/new-service'} className='gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Crear servicio</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
