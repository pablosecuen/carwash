import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'

interface Props {
  title: string
  subtitle?: string
  link: string
  button_text: string
}

export const EmptyPage = ({ title, subtitle, link, button_text }: Props) => {
  return (
    <div className='flex min-h-[70dvh] flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm fade-in'>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{subtitle}</p>
        <Button className='mt-4 font-semibold' asChild>
          <Link href={link} className='gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>{button_text}</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
