'use client'

import { type Customer } from '@/db/entities'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const updatePathname = debounce((value: string) => {
    router.replace(value)
  }, 500)

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const params = new URLSearchParams(searchParams)
    if (value === '') params.delete('customerName')
    else params.set('customerName', value)

    updatePathname(`${pathname}?${params.toString()}`)
  }
  const handlerSelect = (customer: Customer) => () => {
    const params = new URLSearchParams(searchParams)
    params.set('customerId', customer.id.toString())
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <fieldset>
      <legend>Cliente</legend>
      <label htmlFor='customerName'>
        Nombre del cliente
        <input
          type='text'
          name='customerName'
          onChange={handlerChange}
          defaultValue={searchParams.get('customerName') ?? ''}
        />
      </label>
      <div>
        <ul>
          {customers.map((customer) => (
            <li
              key={customer.id}
              className='cursor-pointer hover:bg-slate-900'
              onClick={handlerSelect(customer)}
            >
              {customer.name} - {customer.email}
            </li>
          ))}
        </ul>
      </div>
    </fieldset>
  )
}
