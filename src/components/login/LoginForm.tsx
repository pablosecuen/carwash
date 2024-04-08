'use client'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginForm } from '@/actions/login-form'
import { SHOW_ROLES } from '@/utils/constants'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { toast } from '../ui/use-toast'

const formSchema = z.object({
  password: z.string().min(1, 'Este campo es requerido *'),
  role: z.string().min(1, 'Este campo es requerido *')
})

export const LoginForm = () => {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      role: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData()
    formData.append('password', values.password)
    formData.append('role', values.role)
    const { ok, message } = await loginForm(formData)
    if (!ok) {
      toast({
        variant: 'destructive',
        title: message
      })
      return
    }
    router.push('/home')
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
        <FormField
          name='role'
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un rol' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {Object.entries(SHOW_ROLES).map(([role, name]) => (
                        <SelectItem key={role} value={role}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                  <FormMessage className='text-sm' />
                </Select>
              </FormItem>
            )
          }}
        />
        <div className='flex w-full max-w-sm items-start space-x-2'>
          <div className='flex-1'>
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder='Contraseña' type='password' />
                    </FormControl>
                    <FormMessage className='text-sm' />
                  </FormItem>
                )
              }}
            />
          </div>

          <Button type='submit'>Ingresar</Button>
        </div>
      </form>
    </Form>
  )
}
