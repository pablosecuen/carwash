import { ToggleTheme } from '@/components/layout'
import { LoginForm } from '@/components/login/LoginForm'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-1 flex-col justify-center px-6 py-12  fade-in lg:px-8'>
      <div className='flex items-center justify-end sm:mx-auto sm:w-full sm:max-w-sm'>
        <ToggleTheme />
      </div>
      <div className=' sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* TODO: poner logo de la empresa */}
        <img
          className='mx-auto h-16 w-auto '
          src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
          alt='Your Company'
        />
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
