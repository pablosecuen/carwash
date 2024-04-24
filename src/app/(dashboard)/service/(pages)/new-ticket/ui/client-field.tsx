'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { type Customer } from '@/db/entities'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

// TODO: Move this to a shared module
function debounce<T>(fn: (args: T) => unknown, delay: number) {
  let timeoutId: NodeJS.Timeout
  return function (args: T) {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      fn(args)
    }, delay)
  }
}

export function ClientField({ customers }: { customers: Customer[] }) {
  const firstRender = useRef(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const updatePathname = debounce((value: string) => {
    router.replace(value)
  }, 200)

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    firstRender.current = true
    const { value } = event.target
    const params = new URLSearchParams(searchParams)
    if (value === '') params.delete('customerName')
    else params.set('customerName', value)

    updatePathname(`${pathname}?${params.toString()}`)
  }
  const handlerSelect = (customer: string) => {
    console.log('first')
    const params = new URLSearchParams(searchParams)
    params.set('customerId', customer)
    router.replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    if (firstRender.current) return
    firstRender.current = false
  }, [firstRender])

  return (
    <>
      <Label htmlFor='customerName' className=''>
        Nombre del cliente:
        <Input
          type='text'
          name='customerName'
          id='customerName'
          onChange={handlerChange}
          defaultValue={searchParams.get('customerName') ?? ''}
          className='mt-2'
          autoComplete='off'
          placeholder='Nombre del cliente'
        />
      </Label>
      <div className='my-5'>
        {customers.length !== 0 && (
          <Select
            onValueChange={(e) => handlerSelect(e)}
            defaultValue={searchParams.get('customerId') ?? ''}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecciona un cliente' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {customers.map((customer) => (
                  <SelectItem
                    key={customer.id}
                    value={`${customer.id}`}
                    className='cursor-pointer hover:bg-slate-900'
                  >
                    {customer.name} - {customer.email}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}

        {searchParams.get('customerName') && customers.length === 0 && (
          <p className='mt-1 text-xs text-red-500 sm:text-sm md:text-base lg:text-lg xl:text-xl'>
            No se encontraron clientes
          </p>
        )}
      </div>
    </>
  )
}
