import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const ProductsEmpty = () => {
  return (
    <div className='flex min-h-[70dvh] flex-1 items-center justify-center rounded-lg border border-dashed px-5 shadow-sm fade-in'>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>No tienes productos</h3>
        <p className='text-sm text-muted-foreground'>
          Puedes empezar a vender tan pronto como añadas un producto.
        </p>
        <Button className='mt-4 font-semibold' asChild>
          <Link href={'/dashboard/products/new-product'} className='gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>Crear producto</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
