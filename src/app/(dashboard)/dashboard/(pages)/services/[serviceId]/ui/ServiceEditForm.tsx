'use client'
import { updateServiceAction } from '@/actions/service/update-service'
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
import { useToast } from '@/components/ui/use-toast'
import { type Service } from '@/db/entities'
import { VEHICLE_TYPES } from '@/utils/constants'
import { VehicleType } from '@/utils/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  cashPrice: z.number(),
  cardPrice: z.number(),
  avaliableFor: z.array(
    z.enum([VehicleType.MOTORCYCLE, VehicleType.SEDAN, VehicleType.TRUCK, VehicleType.VAN])
  )
})

interface Props {
  service: Service
}

export const ServiceEditForm = ({ service }: Props) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { name, description, cashPrice, cardPrice, avaliableFor } = service
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name,
      description: description ?? '',
      cashPrice,
      cardPrice,
      avaliableFor
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('description', values.description)
    formData.append('cashPrice', values.cashPrice.toString())
    formData.append('cardPrice', values.cardPrice.toString())
    values.avaliableFor.forEach((type) => {
      formData.append(type, 'true')
    })

    setLoading(true)
    const { ok, message } = await updateServiceAction(service.id, formData)

    if (!ok) {
      toast({
        variant: 'destructive',
        title: message,
        description: 'Intentelo de nuevo.'
      })
      setLoading(false)
      return
    }
    toast({
      variant: 'default',
      title: message
    })
    setLoading(false)
    router.back()
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
              Editando...
            </>
          ) : (
            'Editar servicio'
          )}
        </Button>
      </form>
    </Form>
  )
}
