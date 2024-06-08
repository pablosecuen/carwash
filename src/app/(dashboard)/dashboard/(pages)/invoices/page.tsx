import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { TableInvoices } from './ui/TableInvoices'
export const dynamic = 'force-dynamic'
export default function InvoicesPage({
  searchParams
}: {
  searchParams?: {
    page: string
    query?: string
    sortBy?: string
    sortDirection?: 'ASC' | 'DESC'
  }
}) {
  return (
    <ContainerPage>
      <Title title='Facturas' />

      <TableInvoices params={searchParams} />
    </ContainerPage>
  )
}
