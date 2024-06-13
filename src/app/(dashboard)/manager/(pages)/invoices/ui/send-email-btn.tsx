'use client'

import { sendEmailWithPdf } from '@/actions/invoice/send-email-with-pdf'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'

export function SendEmailBtn({ invoiceId }: { invoiceId: string | number }) {
  const [isLoading, setLoading] = useState(false)
  const { toast } = useToast()
  return (
    <Button
      variant='outline'
      disabled={isLoading}
      onClick={async () => {
        setLoading(true)

        try {
          const data = await sendEmailWithPdf({ id: invoiceId })
          toast({
            title: data.message,
            variant: data.ok ? 'default' : 'destructive'
          })
        } catch (error) {
          toast({
            title: 'Error al enviar el email',
            variant: 'destructive'
          })
        } finally {
          setLoading(false)
        }
      }}
    >
      {isLoading ? (
        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
      ) : (
        <Send className='mr-2 h-5 w-5' />
      )}
      Enviar por email al cliente
    </Button>
  )
}
