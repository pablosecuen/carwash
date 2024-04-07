import { Title } from '@/components/layout'
import { FormService } from './ui/FormService'

export default function Page() {
  return (
    <section className='mx-auto max-w-xl p-5 '>
      <div className='flex flex-wrap items-center justify-between gap-y-2 border-b pb-2'>
        <Title title='Crear servicio' />
      </div>

      <FormService />
    </section>
  )
}
