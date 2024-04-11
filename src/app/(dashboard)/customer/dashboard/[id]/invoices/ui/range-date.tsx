'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function RangeDate() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target

    const params = new URLSearchParams(searchParams)
    if (value === '') params.delete(name)
    else params.set(name, value)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <label htmlFor='from'>
        Desde
        <input
          type='date'
          name='from'
          onChange={handlerChange}
          defaultValue={searchParams.get('from') ?? ''}
        />
      </label>
      <label htmlFor='to'>
        Hasta
        <input
          type='date'
          name='to'
          onChange={handlerChange}
          defaultValue={searchParams.get('to') ?? ''}
        />
      </label>
    </div>
  )
}
