import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
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
    <Card className={className}>
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
