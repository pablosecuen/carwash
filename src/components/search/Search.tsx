'use client'

import { SearchCheck } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '../ui/input'

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (pathname === '/service/customers') {
      if (params.get('page') != null) {
        params.delete('page')
      }
    }
    if (term !== '') {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)
  return (
    <div className='relative flex flex-1 flex-shrink-0'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <Input
        className='peer block w-full  py-[9px] pl-10 text-sm outline-2 '
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <SearchCheck className='absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  text-muted-foreground' />
    </div>
  )
}
