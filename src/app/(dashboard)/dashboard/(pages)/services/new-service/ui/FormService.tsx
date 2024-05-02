'use client'

import { createServiceAction } from '@/actions/service/create-service'
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
import { Textarea } from '@/components/ui/textarea'
import { VEHICLE_TYPES } from '@/utils/constants'
import { VehicleType } from '@/utils/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(4, 'Este campo es requerido *'),
  description: z.string().min(10, 'Este campo es requerido *'),
  cashPrice: z.coerce.number().min(1, 'Este campo es requerido *'),
  cardPrice: z.coerce.number().min(1, 'Este campo es requerido *'),
  avaliableFor: z.array(
    z.enum([VehicleType.MOTORCYCLE, VehicleType.SEDAN, VehicleType.TRUCK, VehicleType.VAN])
  )
})

// TODO: Tipar el componente para que pueda recibir un servicio

export function FormService() {
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      cashPrice: 0,
      cardPrice: 0,
      avaliableFor: []
    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    const formdata = new FormData()
    formdata.append('name', values.name)
    formdata.append('description', values.description)
    formdata.append('cashPrice', values.cashPrice.toString())
    formdata.append('cardPrice', values.cardPrice.toString())
    values.avaliableFor.forEach((type) => {
      formdata.append(type, 'true')
    })

    setLoading(true)

    if (values.avaliableFor.length === 0) {
      toast({
        variant: 'destructive',
        title: '⚠️ Selecciona al menos un tipo de vehículo',
        duration: 1800
      })
      setLoading(false)
      return
    }
    await createServiceAction(formdata)
      .then(() => {
        toast({
          variant: 'default',
          title: '✅ Servicio creado',
          duration: 1800
        })
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: '❌ Error al crear el servicio',
          duration: 1800
        })
      })
    setLoading(false)
    form.reset()
  }

  return (
    <Form {...form}>
      <form
        className='mt-5 flex w-full flex-col gap-4 rounded-lg bg-muted/50 p-5'
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* name */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Nombre del servicio' />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />
        {/* description */}
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Descipción *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Descripción del servicio'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />
        <div className='grid grid-cols-2 gap-5'>
          {/* price cash */}
          <FormField
            control={form.control}
            name='cashPrice'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Precio en efectivo *</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} placeholder='Precio en efectivo' />
                  </FormControl>
                  <FormMessage className='text-sm' />
                </FormItem>
              )
            }}
          />
          {/* price card */}
          <FormField
            control={form.control}
            name='cardPrice'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Precio en tarjeta *</FormLabel>
                  <FormControl>
                    <Input type='number' {...field} placeholder='Precio en tarjeta' />
                  </FormControl>
                  <FormMessage className='text-sm' />
                </FormItem>
              )
            }}
          />
        </div>
        {/* avaliableFor */}
        <FormField
          control={form.control}
          name='avaliableFor'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tipo de vehículo *</FormLabel>
                <div className='flex flex-wrap items-center gap-x-5'>
                  {Object.entries(VEHICLE_TYPES).map(([key, value]) => {
                    return (
                      <FormField
                        key={key}
                        control={form.control}
                        name='avaliableFor'
                        render={({ field }) => {
                          return (
                            <FormItem key={key} className='flex items-end'>
                              <FormControl>
                                <Checkbox
                                  {...field}
                                  id={key}
                                  checked={field.value?.includes(key as VehicleType)}
                                  onCheckedChange={(checked) => {
                                    checked === true
                                      ? field.onChange([...field.value, key])
                                      : field.onChange(
                                          field.value?.filter((value) => value !== key)
                                        )
                                  }}
                                  className='mr-2'
                                />
                              </FormControl>
                              <FormLabel>{value}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    )
                  })}
                </div>

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
            'Crear servicio'
          )}
        </Button>
      </form>
    </Form>
  )
}
