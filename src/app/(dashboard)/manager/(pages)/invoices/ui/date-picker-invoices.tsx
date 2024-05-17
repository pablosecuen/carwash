'use client'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const DatePickerInvoice = () => {
  const searchParams = useSearchParams()
  const [date, setDate] = useState<Date>()
  const router = useRouter()
  const pathname = usePathname()
  const handleSelect = (date: Date | undefined) => {
    const params = new URLSearchParams(searchParams)
    if (date != null) {
      params.set('from', date.toISOString())
      setDate(date)
    } else {
      params.delete('from')
      setDate(undefined)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            date == null && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className='mr-2 h-4 w-4' />
          {date != null ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar mode='single' selected={date} onSelect={handleSelect} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
