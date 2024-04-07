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

export default function DashboardPage() {
  return (
    <div className='grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
      <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
        <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
          <Card className='sm:col-span-2'>
            <CardHeader className='pb-3'>
              <CardTitle>Servicios</CardTitle>
              <CardDescription className='max-w-lg text-balance leading-relaxed'>
                Esta sección te permite administrar los servicios que se ofrecen en el sistema.
                Puedes agregar nuevos servicios o editar los existentes.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild>
                <Link href='/dashboard/services'>Ir a servicios</Link>
              </Button>
            </CardFooter>
          </Card>
          {/* <Card x-chunk='dashboard-05-chunk-1'>
            <CardHeader className='pb-2'>
              <CardDescription>This Week</CardDescription>
              <CardTitle className='text-4xl'>$1,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xs text-muted-foreground'>+25% from last week</div>
            </CardContent>
            <CardFooter><Progress value={25} aria-label='25% increase' /></CardFooter>
          </Card>
          <Card x-chunk='dashboard-05-chunk-2'>
            <CardHeader className='pb-2'>
              <CardDescription>This Month</CardDescription>
              <CardTitle className='text-4xl'>$5,329</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='text-xs text-muted-foreground'>+10% from last month</div>
            </CardContent>
            <CardFooter><Progress value={12} aria-label='12% increase' /></CardFooter>
          </Card> */}
        </div>
      </div>
      <div></div>
    </div>
  )
}
