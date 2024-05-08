'use client'

import { updateCustomerBySlug } from '@/actions/customer/update-customer'
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
import { useToast } from '@/components/ui/use-toast'
import { type Customer } from '@/db/entities'
import { cn } from '@/lib/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(3, 'Este campo es requerido *'),
  email: z.string().email('Este campo debe ser un correo electrónico válido *'),
  phone: z.string().min(10, 'Este campo debe ser un número válido *'),
  address: z.string().min(10, 'Este campo es requerido *')
})

interface Props {
  customer: Customer
  slug: string
  className?: string
}

export const EditFormCustomer = ({ customer, slug, className }: Props) => {
  const [loading, setLoading] = useState(false)

  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address
    }
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('phone', data.phone)
    formData.append('address', data.address)

    setLoading(true)
    await updateCustomerBySlug(slug, formData)
      .then(() => {
        toast({
          title: 'Cliente actualizado',
          description: 'El cliente ha sido actualizado correctamente'
        })
        // router.push(`/service/customers`)
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
        <h4 className='text-center font-bold tracking-wide'>Informacion del cliente</h4>
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

        {/* email */}
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Correo electrónico *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Correo electrónico del cliente' />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />

        {/* phone */}
        <FormField
          name='phone'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Teléfono *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Teléfono del cliente' />
                </FormControl>
                <FormMessage className='text-sm' />
              </FormItem>
            )
          }}
        />

        {/* address */}
        <FormField
          name='address'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Dirección *</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Dirección del cliente' />
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
              Editando...
            </>
          ) : (
            'Editar cliente'
          )}
        </Button>
      </form>
    </Form>
  )
}
