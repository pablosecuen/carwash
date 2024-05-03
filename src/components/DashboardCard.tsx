import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  className?: string
  title: string
  description: string
  href: string
  linkLabel: string
}

export const DashboardCard = async ({ className, description, href, linkLabel, title }: Props) => {
  return (
    <Card className={cn('shadow-cards  fade-in', className)}>
      <CardHeader className='pb-3'>
        <CardTitle>{title}</CardTitle>
        <CardDescription className=' text-pretty leading-relaxed'>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild>
          <Link href={href}>{linkLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
