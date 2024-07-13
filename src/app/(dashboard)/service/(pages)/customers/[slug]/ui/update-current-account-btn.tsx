'use client'

import { activateCurrentAccount } from '@/actions/customer/activate-current-account'
import { desactivateCurrentAccount } from '@/actions/customer/desactivate-current-account'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

export function UpdateCurrentAccountBtn({
  customerId,
  currentStatus
}: {
  customerId: number
  currentStatus: boolean
}) {
  const { toast } = useToast()

  const handleClick = async () => {
    let data
    if (currentStatus) {
      data = await desactivateCurrentAccount({
        id: customerId
      })
    } else {
      data = await activateCurrentAccount({
        id: customerId
      })
    }
    toast({
      title: data.message,
      variant: data.ok ? 'default' : 'destructive'
    })
    await new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })
    window.location.reload()
  }
  return (
    <Button
      onClick={handleClick}
      size='sm'
      variant={currentStatus ? 'destructive' : 'secondary'}
      className='btn btn-primary'
    >
      {currentStatus ? 'Desactivar' : 'Activar'} cuenta corriente
    </Button>
  )
}
