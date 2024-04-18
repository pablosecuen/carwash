import { ToggleTheme } from '@/components/layout'
import { LoginForm } from '@/components/login/LoginForm'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default function Home() {
  const cookiesStore = cookies()
  const role = cookiesStore.get('role')?.value
  if (role != null) {
    if (role === 'ADMIN' || role === 'EDITOR') redirect('/dashboard')
    redirect('/service')
  }
  return (
    <main className='flex min-h-screen flex-1 flex-col justify-center px-6 py-12  fade-in lg:px-8'>
      <div className='flex items-center justify-end sm:mx-auto sm:w-full sm:max-w-sm'>
        <ToggleTheme />
      </div>
      <div className=' sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* TODO: poner logo de la empresa */}
        <img className='mx-auto h-16 w-auto ' src='/carwash-logo.webp' alt='Your Company' />
        <h1 className='mt-4 text-center text-2xl font-bold leading-9 tracking-tight '>
          Bienvenido a Carwash
        </h1>
        <p className='mt-2 text-center text-lg opacity-80'>
          Proveedor de servicios de lavado de coches.
        </p>
      </div>

      <div className='mt-8   sm:mx-auto sm:w-full sm:max-w-sm'>
        <LoginForm />
      </div>
    </main>
  )
}
