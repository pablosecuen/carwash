/* eslint-disable @typescript-eslint/no-misused-promises */
import { loginForm } from '@/actions/login-form'
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
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold'>Welcome to Carwash</h1>
      <p className='text-lg text-center'>Carwash is a car wash service provider.</p>
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
    </main>
  )
}
