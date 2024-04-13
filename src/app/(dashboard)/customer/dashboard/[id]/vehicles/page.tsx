import { Card, CardContent } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { getByCustomerId } from '@/utils/getters/vehicles'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default async function Page({ params }: { params: { id: string } }) {
  const vehicles = await getByCustomerId(Number(params.id))
  return (
    <Card className='fade-in'>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Marca</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Patente</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.brand}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.patent}</TableCell>
                <TableCell className='mx-2 flex gap-4'>
                  <Link
                    href={`/customer/dashboard/${vehicle.id}/vehicles/tickets`}
                    className='flex items-center gap-2'
                  >
                    Tickets <ExternalLink size={18} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
