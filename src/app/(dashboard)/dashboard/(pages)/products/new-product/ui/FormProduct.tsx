'use client'

import { createProductAction } from '@/actions/create-product'
import { Button } from '@/components/ui/button'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(3, 'Este campo es requerido *'),
  description: z.string().min(10, 'Debe contener mínimo 10 caracteres').optional(),
  cashPrice: z.string().min(1, 'Este campo es requerido *'),
  cardPrice: z.string().min(1, 'Este campo es requerido *')
})

export const FormProduct = () => {
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      cashPrice: '0',
      cardPrice: '0'
    }
  })
  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('description', data.description ?? '')
    formData.append('cashPrice', data.cashPrice.toString())
    formData.append('cardPrice', data.cardPrice.toString())

    setLoading(true)

    await createProductAction(formData)
      .then(() => {
        toast({
          variant: 'default',
          title: `✅ Producto creado`,
          duration: 1800
        })
        form.reset()
      })
      .catch(() => {
        toast({
          variant: 'destructive',
          title: `⚠️ No se pudo crear el producto`,
          duration: 1800
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
        className='mt-5 flex w-full flex-col gap-4 rounded-lg bg-muted/50 p-5'
      >
        {/* name */}
        <FormField
          name='name'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Nombre *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Nombre del producto' />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />

        {/* description */}
        <FormField
          name='description'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Descripción *</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder='Descripción del producto'
                    className='min-h-28 resize-none'
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
        <Button type='submit' disabled={loading}>
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Creando...
            </>
          ) : (
            'Crear Producto'
          )}
        </Button>
      </form>
    </Form>
  )
}
