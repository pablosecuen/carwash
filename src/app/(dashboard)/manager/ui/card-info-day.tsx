import { getDailyInvoices } from '@/actions/invoice/getters'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn, currencyFormat } from '@/lib/utils'

export const dynamic = 'force-dynamic'

interface Props {
  className?: string
}

export const CardInfoDay = async ({ className }: Props) => {
  const InvoiceDayData = await getDailyInvoices()

  const totalDay = InvoiceDayData.reduce((acc, element) => {
    return acc + element.total
  }, 0)

  return (
    <Card className={cn(' fade-in sm:col-span-2 ', className)}>
      <CardHeader className='pb-3'>
        <CardTitle>Informacion del dia</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total facturado: {currencyFormat(totalDay)}</p>
        <p>Servicios: </p>
      </CardContent>
    </Card>
  )
}
