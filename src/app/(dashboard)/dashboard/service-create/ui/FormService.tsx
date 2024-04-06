'use client'

import { createServiceAction } from '@/actions/create-service'
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
import { VEHICLE_TYPES } from '@/utils/shared-constants'
import { VehicleType } from '@/utils/types'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(4, 'Este campo es requerido *'),
  description: z.string().min(10, 'Description is required'),
  cashPrice: z.coerce.number().min(1, 'Cash price is required'),
  cardPrice: z.coerce.number().min(1, 'Card price is required'),
  avaliableFor: z.array(
    z.enum([VehicleType.MOTORCYCLE, VehicleType.SEDAN, VehicleType.TRUCK, VehicleType.VAN])
  )
})

export function FormService() {
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
    console.log({ values })
    const formdata = new FormData()
    formdata.append('name', values.name)
    formdata.append('description', values.description)
    formdata.append('cashPrice', values.cashPrice.toString())
    formdata.append('cardPrice', values.cardPrice.toString())
    values.avaliableFor.forEach((type) => {
      formdata.append(type, 'true')
    })

    // TODO: Crear la UI para el loading mientras se crea el servicio, success o error
    await createServiceAction(formdata)
    form.reset()
  }

  return (
    <Form {...form}>
      <form className=' mt-5 flex w-full flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
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

        <FormField
          control={form.control}
          name='avaliableFor'
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tipo de vehículo *</FormLabel>

                {Object.entries(VEHICLE_TYPES).map(([key, value]) => {
                  return (
                    <FormField
                      key={key}
                      control={form.control}
                      name='avaliableFor'
                      render={({ field }) => {
                        console.log({ field })
                        return (
                          <FormItem key={key}>
                            <FormControl>
                              <Checkbox
                                {...field}
                                id={key}
                                checked={field.value?.includes(key as VehicleType)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, key])
                                    : field.onChange(field.value?.filter((value) => value !== key))
                                }}
                              />
                            </FormControl>
                            <FormLabel className='font-normal'>{value}</FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  )
                })}

                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />

        <Button type='submit'>Enviar</Button>
      </form>
    </Form>
  )
}
