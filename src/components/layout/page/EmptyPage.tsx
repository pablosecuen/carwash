import { Button } from '@/components/ui/button'
import { type LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface Props {
  title: string
  subtitle?: string
  link: string
  Icon: LucideIcon
  button_text: string
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EmptyPage = ({ title, subtitle, link, button_text, Icon }: Props) => {
  return (
    <div className='flex min-h-[70dvh] flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm fade-in'>
      <div className='flex flex-col items-center gap-1 text-center'>
        <h3 className='text-2xl font-bold tracking-tight'>{title}</h3>
        <p className='text-sm text-muted-foreground'>{subtitle}</p>
        <Button className='mt-4 font-semibold' asChild>
          <Link href={link} className='gap-1'>
            <Icon className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>{button_text}</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}
