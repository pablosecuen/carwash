import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function DashboardPage() {
  return (
    <ContainerPage>
      <div className='grid flex-1 items-start gap-4  md:gap-8 lg:grid-cols-3 xl:grid-cols-3'>
        <div className='grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2'>
          <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
            <Card className='fade-in sm:col-span-2 '>
              <CardHeader className='pb-3'>
                <CardTitle>Servicios</CardTitle>
                <CardDescription className=' text-pretty leading-relaxed'>
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
            <Card className='fade-in sm:col-span-2 '>
              <CardHeader className='pb-3'>
                <CardTitle>Productos</CardTitle>
                <CardDescription className=' text-pretty leading-relaxed'>
                  Esta sección te permite administrar los productos que se ofrecen en el sistema.
                  Puedes agregar nuevos productos o editar los existentes.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild>
                  <Link href='/dashboard/products'>Ir a productos</Link>
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
    </ContainerPage>
  )
}
