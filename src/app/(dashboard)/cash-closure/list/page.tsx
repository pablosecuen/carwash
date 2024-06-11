import { getAllCashClosures } from '@/actions/cash-closures/getters'
import { CashClosuresTable } from './cash-closures-table'
import { ExportToExcelBtn } from './export-to-excel-btn'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { Title } from '@/components/layout'

export default async function Page({
  searchParams
}: {
  searchParams?: {
    sortBy: string
    sortDirection?: 'ASC' | 'DESC'
  }
}) {
  const { cashClosures } = await getAllCashClosures({
    sort: {
      sortBy: searchParams?.sortBy,
      sortDir: searchParams?.sortDirection
    }
  })
  return (
    <ContainerPage>
      <section className='grid '>
        <div className='m-4 flex items-center gap-4'>
          <Title title='Lista de cierres de caja' />
          <ExportToExcelBtn {...{ cashClosures }} />
        </div>

        <CashClosuresTable {...{ cashClosures }} />
      </section>
    </ContainerPage>
  )
}
