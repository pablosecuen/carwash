'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export function TicketTabs() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const handlerClick = (variant: 'daily' | 'pending') => () => {
    const sParams = new URLSearchParams(searchParams)
    sParams.set('tab', variant)
    router.replace(`${pathname}?${sParams.toString()}`)
  }
  return (
    <Tabs defaultValue='daily' activationMode='manual'>
      <TabsList className='w-full gap-4'>
        <TabsTrigger onClick={handlerClick('daily')} className='w-full' value='daily'>
          Tickets del día
        </TabsTrigger>
        <TabsTrigger onClick={handlerClick('pending')} className='w-full' value='pending'>
          Tickets pendientes
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
