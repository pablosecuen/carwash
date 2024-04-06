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

export const ServiceCard = async () => {
  return (
    <Card className='col-span-1 md:col-span-3'>
      <CardHeader>
        <CardTitle>Servicios</CardTitle>
        <CardDescription>Agrega un nuevo servicio</CardDescription>
      </CardHeader>
      <CardFooter className='flex items-center justify-end'>
        <Button asChild>
          <Link href={'/dashboard/service-create'}>Agregar</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
