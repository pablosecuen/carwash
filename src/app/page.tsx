/* eslint-disable @typescript-eslint/no-misused-promises */
import { loginForm } from '@/actions/login-form'
import { SHOW_ROLES } from '@/utils/constants'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-4xl font-bold'>Welcome to Carwash</h1>
      <p className='text-lg text-center'>Carwash is a car wash service provider.</p>
      <form action={loginForm} className='text-black'>
        <label htmlFor='role'>
          <select name='role'>
            {Object.entries(SHOW_ROLES).map(([role, name]) => (
              <option key={role} value={role}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor='password'>
          <input type='password' name='password' placeholder='Contraseña' />
        </label>
        <button type='submit' className='text-white'>
          Ingresar
        </button>
      </form>
    </main>
  )
}
