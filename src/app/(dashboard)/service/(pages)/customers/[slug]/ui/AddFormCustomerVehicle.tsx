'use client'

import { customerAddVehicle } from '@/actions/customer/customer-add-vehicle'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const items = [
  {
    id: 'sedan',
    label: 'Sedan'
  },
  {
    id: 'van',
    label: 'Van'
  },
  {
    id: 'truck',
    label: 'Camioneta'
  },
  {
    id: 'motorcycle',
    label: 'Moto'
  }
] as const

const formSchema = z.object({
  type: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Tienes que seleccionar un tipo de vehiculo'
  }),
  brand: z.string().min(2, {
    message: 'La marca debe tener al menos 2 caracteres'
  }),
  model: z.string().min(2, {
    message: 'El modelo debe tener al menos 2 caracteres'
  }),
  year: z.string().regex(/^\d+$/).min(4, {
    message: 'El año debe tener al menos 4 caracteres'
  }),
  patent: z.string().min(6, {
    message: 'El patente debe tener al menos 6 caracteres'
  })
})

interface Props {
  customerId: number
  className?: string
}

export const AddFormCustomerVehicle = ({ customerId, className }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: [],
      brand: '',
      model: '',
      year: '',
      patent: ''
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (data.type.length !== 1) {
      // Si el array 'type' no tiene exactamente un elemento seleccionado, mostrar un mensaje de error
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Tienes que seleccionar solo un tipo de vehiculo',
        duration: 1300
      })
      return
    }

    const formData = new FormData()
    formData.append('type', data.type[0])
    formData.append('brand', data.brand)
    formData.append('model', data.model)
    formData.append('year', data.year.toString())
    formData.append('patent', data.patent)

    setLoading(true)
    await customerAddVehicle(customerId, formData)
      .then(({ ok, message, error }) => {
        if (!ok) {
          console.log({ error })
          return toast({
            variant: 'destructive',
            title: 'Auto no creado',
            description: message
          })
        }
        toast({
          title: 'Auto creado',
          description: 'El auto ha sido creado correctamente.'
        })
        form.reset()
        router.refresh()
      })
      .catch((error) => {
        setLoading(false)
        toast({
          title: 'Error al actualizar el cliente',
          description: error.message
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          'mt-5 flex w-full flex-col justify-between gap-4 rounded-lg bg-muted/50 p-5 fade-in',
          className
        )}
      >
        <h4 className='text-center font-bold tracking-wide'>Agregar vehículo</h4>
        <FormField
          control={form.control}
          name='type'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Tipo de vehiculo</FormLabel>
              </div>
              <div className='flex gap-x-4'>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name='type'
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className='flex flex-row items-end space-x-1 space-y-0'
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                checked === true
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== item.id)
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>{item.label}</FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* brand */}
        <FormField
          name='brand'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Marca del vehiculo *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='' />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />

        {/* model */}
        <FormField
          name='model'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Modelo *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Teléfono del cliente' autoComplete='off' />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />

        {/* address */}
        <FormField
          name='year'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Año *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='number'
                    placeholder='Dirección del cliente'
                    autoComplete='off'
                  />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />

        {/* Patent */}
        <FormField
          name='patent'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Patente *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Patente del cliente' autoComplete='off' />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />

        <Button type='submit' disabled={loading}>
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Creando...
            </>
          ) : (
            'Crear vehiculo'
          )}
        </Button>
      </form>
    </Form>
  )
}
