/* eslint-disable @typescript-eslint/no-misused-promises */
import { loginForm } from '@/actions/login-form'
import { ToggleTheme } from '@/components/theme/ToggleTheme'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { SHOW_ROLES } from '@/utils/constants'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm flex items-center justify-end'>
        <ToggleTheme />
      </div>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* TODO: poner logo de la empresa */}
        <img
          className='mx-auto h-16 w-auto'
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
        <h1 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight '>
          Bienvenido a Carwash
        </h1>
        <p className='text-lg mt-2 text-center opacity-80'>
          Proveedor de servicios de lavado de coches.
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form action={loginForm} className='space-y-2'>
          <Select name='role'>
            <SelectTrigger>
              <SelectValue placeholder='Selecciona un rol' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {Object.entries(SHOW_ROLES).map(([role, name]) => (
                  <SelectItem key={role} value={role}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input type='password' id='password' name='password' placeholder='Contraseña' />

            <Button type='submit'>Ingresar</Button>
          </div>
        </form>
      </div>
    </main>
  )
}
