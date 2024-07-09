'use client'

import { createCashClosureAction } from '@/actions/cash-closures/create'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { type Invoice } from '@/db/entities'
import { currencyFormat } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'

export const FormClashClosure = ({
  invoices,
  totalDaily,
  totalDailyCash,
  totalCash,
  totalCard,
  cancelleds
}: {
  invoices: Invoice[]
  totalDaily: number
  totalDailyCash: number
  totalCash: number
  totalCard: number
  cancelleds: number
}) => {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [payData, setPayData] = useState({
    managerBonus: 2000,
    employeeBonus: 0,
    employeePayment: Math.round(totalDaily * 0.3),
    paymentPerEmployee: Math.round(totalDaily * 0.3) / 1,
    employeesNum: 1
  })
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
        <Input name='totalDaily' type='number' value={totalDaily} />
      </Label>
      <Label htmlFor='totalDailyCash'>
        Monto en total en efectivo
        <Input name='totalDailyCash' type='number' value={totalDailyCash} />
      </Label>
      <Label htmlFor='totalCanceled'>
        Monto de facturas canceladas
        <Input name='totalCanceled' type='number' value={cancelleds} />
      </Label>
      <Label className='opacity-60' htmlFor='totalCash'>
        Monto en efectivo
        <Input name='totalCash' type='number' value={totalCash} />
      </Label>
      <Label className='opacity-60' htmlFor='totalCard'>
        Monto en tarjeta
        <Input name='totalCard' type='number' value={totalCard} />
      </Label>

      <Label htmlFor='dailyPercentage'>
        Monto en tarjeta
        <Select
          onValueChange={(value) => {
            const percentage = Number(value) / 100
            const employeePayment = Math.round(totalDaily * percentage)
            setPayData({
              ...payData,
              employeePayment,
              paymentPerEmployee: Math.round(employeePayment / payData.employeesNum)
            })
          }}
          name='dailyPercentage'
          defaultValue='30'
        >
          <SelectTrigger>
            <SelectValue placeholder='%30' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='30'>%30</SelectItem>
            <SelectItem value='35'>%35</SelectItem>
          </SelectContent>
        </Select>
      </Label>
      <Label htmlFor='managerBonus'>
        Bonus al gerente
        <Input
          onChange={(e) => {
            const value = e.target.value
            setPayData({ ...payData, managerBonus: Number(value) })
          }}
          value={payData.managerBonus}
          name='managerBonus'
          type='number'
        />
      </Label>
      <Label htmlFor='employeeBonus'>
        Bonus a los empleados
        <Input name='employeeBonus' type='number' defaultValue={0} />
      </Label>
      <Label htmlFor='employeePayment'>
        Pago a total a empleados
        <Input
          className='opacity-60'
          name='employeePayment'
          type='number'
          value={payData.employeePayment}
        />
      </Label>
      <Label htmlFor='employeesNum'>
        Número de empleados
        <Input
          onChange={(e) => {
            const value = Number(e.target.value)

            const paymentPerEmployee = value === 0 ? 0 : Math.round(payData.employeePayment / value)
            setPayData({ ...payData, employeesNum: value, paymentPerEmployee })
          }}
          value={payData.employeesNum === 0 ? '' : payData.employeesNum}
          name='employeesNum'
          type='number'
        />
      </Label>
      <Label>
        Pago a cada empleado
        <Input className='opacity-60' type='number' value={payData.paymentPerEmployee} />
      </Label>
      <Label>
        Pago al gerente{' '}
        <Input
          className='opacity-60'
          type='number'
          value={payData.managerBonus + payData.paymentPerEmployee}
        />
      </Label>

      <Button variant={'secondary'} type='submit' disabled={isLoading}>
        {isLoading ? 'Cerrando caja...' : 'Cerrar caja'}
      </Button>

      <CardTitle>
        {invoices.length === 0
          ? 'No hay facturas para cerrar caja'
          : totalDaily === 0
            ? 'No hay monto total para cerrar caja'
            : `El monto total en caja es ${currencyFormat(totalDaily)}`}
      </CardTitle>
    </form>
  )
}
