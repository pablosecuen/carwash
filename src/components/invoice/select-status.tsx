'use client'
import { setInvoiceCancelled } from '@/actions/invoice/set-invoice-cancelled'
import { setInvoiceCompleted } from '@/actions/invoice/set-invoice-completed'
import { setInvoicePending } from '@/actions/invoice/set-invoice-pending'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  status: string
  id: string | number
}

export const SelectStatus = ({ status, id }: Props) => {
  const { toast } = useToast()

  // TODO: hacer una solo action reutilizable para cada status
  const changeStatus = async (value: string) => {
    const invoiceId = id
    if (value === 'completed') {
      const { ok, message } = await setInvoiceCompleted({ invoiceId })
      if (!ok) {
        toast({
          variant: 'destructive',
          title: message
        })
      }
      if (ok) {
        toast({
          title: message
        })
      }
    }
    if (value === 'canceled') {
      const { ok, message } = await setInvoiceCancelled({ invoiceId })
      if (!ok) {
        toast({
          variant: 'destructive',
          title: message
        })
      }
      if (ok) {
        toast({
          title: message
        })
      }
    }
    if (value === 'pending') {
      const { ok, message } = await setInvoicePending({ invoiceId })
      if (!ok) {
        toast({
          variant: 'destructive',
          title: message
        })
      }
      if (ok) {
        toast({
          title: message
        })
      }
    }
  }

  return (
    <Select defaultValue={status} onValueChange={changeStatus}>
      <SelectTrigger>
        <SelectValue placeholder='' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='pending'>Pendiente</SelectItem>
          <SelectItem value='completed'>Pagado</SelectItem>
          <SelectItem value='canceled'>Rechazado</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
