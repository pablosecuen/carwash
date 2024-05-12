'use client'
import { completeTicket } from '@/actions/tickets/complete-ticket'
import { cancelTicket } from '@/actions/tickets/cancel-ticket'
import { setPendingTicket } from '@/actions/tickets/set-pending-ticket'
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

const ACTION_DICC = {
  completed: completeTicket,
  cancelled: cancelTicket,
  pending: setPendingTicket
}

export const SelectStatus = ({ status, id }: Props) => {
  const { toast } = useToast()

  const changeStatus = async (value: 'completed' | 'cancelled' | 'pending') => {
    if (ACTION_DICC[value] != null) {
      const { ok, message } = await ACTION_DICC[value]({ id })
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
          <SelectItem value='completed'>Completado</SelectItem>
          <SelectItem value='cancelled'>Cancelado</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
