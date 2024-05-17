'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { type DateRange } from 'react-day-picker'

export function DatePickerWithRangeInvoice({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 0)
  })

  const handleSelect = (date: DateRange | undefined) => {
    const params = new URLSearchParams(searchParams)

    if (!params.has('to')) {
      params.set('to', new Date().toISOString())
    }
    if (date != null) {
      params.set('from', date.from?.toISOString() ?? '')
      params.set('to', date.to?.toISOString() ?? '')
      setDate(date)
    } else {
      params.delete('from')
      params.delete('to')
      setDate(undefined)
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              date == null && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from != null ? (
              date.to != null ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
