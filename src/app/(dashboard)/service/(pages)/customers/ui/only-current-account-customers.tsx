'use client'

import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function OnlyCurrentAccountCustomers() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  return (
    <Button
      size={'sm'}
      onClick={() => {
        const params = new URLSearchParams(searchParams)
        if (pathname === '/service/customers') {
          if (params.get('page') != null) {
            params.delete('page')
          }
        }
        params.set('withCurrentAccount', 'true')
        router.replace(`${pathname}?${params.toString()}`)
      }}
    >
      Solo usuarios con cuenta corriente
    </Button>
  )
}
