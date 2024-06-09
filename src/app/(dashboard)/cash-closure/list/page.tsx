import { getAllCashClosures } from '@/actions/cash-closures/getters'
import { CashClosuresTable } from './cash-closures-table'
import { ExportToExcelBtn } from './export-to-excel-btn'

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
    <section className='grid '>
      <div className='m-4 flex items-center gap-4'>
        <h1>Lista de cierres de caja</h1>
        <ExportToExcelBtn {...{ cashClosures }} />
      </div>

      <CashClosuresTable {...{ cashClosures }} />
    </section>
  )
}
