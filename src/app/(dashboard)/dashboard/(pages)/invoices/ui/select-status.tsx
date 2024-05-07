'use client'
import { setInvoiceCancelled } from '@/actions/invoice/set-invoice-cancelled'
import { setInvoiceCompleted } from '@/actions/invoice/set-invoice-completed'
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

  const changeStatus = async (value: string) => {
    console.log(value)
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
  }

  return (
    <Select defaultValue={status} onValueChange={changeStatus}>
      <SelectTrigger>
        <SelectValue placeholder='' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='pending'>pending</SelectItem>
          <SelectItem value='completed'>completed</SelectItem>
          <SelectItem value='canceled'>canceled</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
