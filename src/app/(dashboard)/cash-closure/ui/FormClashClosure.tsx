'use client'

import { createCashClosureAction } from '@/actions/cash-closures/create'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { type Invoice } from '@/db/entities'
import { currencyFormat } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

export const FormClashClosure = ({
  invoices,
  total,
  cancelleds
}: {
  invoices: Invoice[]
  total: number
  cancelleds: number
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const paymentToEmployees = Math.round(total * 0.3)
  // const create = await createCashClosureAction({ invoices })
  const create = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    const formData = new FormData(event.target as HTMLFormElement)
    const { ok, message } = await createCashClosureAction(invoices, formData)
    if (ok) {
      toast({
        title: 'Caja cerrada',
        description: 'Caja cerrada con éxito',
        variant: 'default'
      })
      router.push('/cash-closure/list')
    } else {
      toast({
        title: 'Error al cerrar caja',
        description: message,
        variant: 'destructive'
      })
    }

    setIsLoading(false)
  }
  return (
    <form onSubmit={create} className='grid w-full flex-1 space-y-7'>
      <Label htmlFor='totalDaily'>
        Monto en total caja
        <Input name='totalDaily' type='number' value={total} />
      </Label>
      <Label htmlFor='totalCanceled'>
        Monto de facturas canceladas
        <Input name='totalCanceled' type='number' value={cancelleds} />
      </Label>
      <Label htmlFor='dailyPercentage'>
        Porcentaje del día
        <Input name='dailyPercentage' type='number' defaultValue={30} />
      </Label>
      <Label htmlFor='managerBonus'>
        Bonus al gerente
        <Input name='managerBonus' type='number' defaultValue={2000} />
      </Label>
      <Label htmlFor='employeeBonus'>
        Bonus a los empleados
        <Input name='employeeBonus' type='number' defaultValue={0} />
      </Label>
      <Label htmlFor='employeePayment'>
        Pago a empleados
        <Input
          className='opacity-60'
          name='employeePayment'
          type='number'
          value={paymentToEmployees}
        />
      </Label>
      <Button variant={'secondary'} type='submit' disabled={isLoading}>
        {isLoading ? 'Cerrando caja...' : 'Cerrar caja'}
      </Button>

      <CardTitle>
        {invoices.length === 0
          ? 'No hay facturas para cerrar caja'
          : total === 0
            ? 'No hay monto total para cerrar caja'
            : `El monto total en caja es ${currencyFormat(total)}`}
      </CardTitle>
    </form>
  )
}
