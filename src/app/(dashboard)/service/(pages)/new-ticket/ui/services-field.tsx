'use client'
import { createTicketAction } from '@/actions/tickets/create-ticket'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { type Vehicle } from '@/db/entities'
import { type Service } from '@/db/entities/services'
import { type Ticket } from '@/db/entities/ticket'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  vehicle: z.string(),
  service: z.string(),
  paymentMethod: z.enum(['cash', 'card'])
})

export function ServiceField({
  vehicles,
  allServices,
  addTicket
}: {
  vehicles: Vehicle[]
  allServices: Service[]
  addTicket: (ticket: Ticket) => void
}) {
  const [services, setServices] = useState<Service[]>([])
  const { toast } = useToast()
  const handlerSumbit = (event: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append('vehicle', `${event.vehicle}`)
    formData.append('service', `${event.service}`)
    formData.append('paymentMethod', event.paymentMethod)
    createTicketAction(formData)
      .then(async (ticket) => {
        if (ticket == null) {
          console.error('Ticket is null')
          return
        }
        addTicket(ticket)
        const { reset } = form
        reset()
        toast({
          title: 'Ticket creado',
          description: 'El ticket se creo correctamente'
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicle: 'null',
      service: 'null',
      paymentMethod: 'cash'
    }
  })

  const vehicle = form.watch('vehicle')
    ? vehicles.find((vehicle) => vehicle.id === +form.watch('vehicle'))
    : null

  useEffect(() => {
    if (vehicle == null) return
    const services = allServices.filter((service) => service.avaliableFor.includes(vehicle.type))
    setServices(services)
  }, [vehicle])

  return (
    <Card className='flex-1 '>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlerSumbit)}
          className=' flex flex-1  flex-col gap-2 bg-muted/50 p-5'
        >
          <FormField
            name='vehicle'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vehiculo</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un vehiculo' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'null'}>Selecciona un vehiculo</SelectItem>
                    {vehicles.map((vehicle) => (
                      <SelectItem key={vehicle.id} value={`${vehicle.id}`}>
                        {vehicle.brand} {vehicle.model} ({vehicle.patent})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name='service'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Servicio</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={''}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un servicio' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={'null'}>Selecciona un servicio</SelectItem>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={`${service.id}`}>
                        {service.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name='paymentMethod'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Metodo de pago</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un metodo de pago' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='cash'>Efectivo</SelectItem>
                    <SelectItem value='card'>Tarjeta de credito</SelectItem>
                  </SelectContent>
                  <FormMessage />
                </Select>
              </FormItem>
            )}
          />

          <Button type='submit'>añadir ticket</Button>
        </form>
      </Form>
    </Card>
  )
}
