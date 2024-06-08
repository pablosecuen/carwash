import { getAllCashClosures } from '@/actions/cash-closures/getters'
import { CashClosuresTable } from './cash-closures-table'

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
    <section>
      <h1>Lista de cierres de caja</h1>

      <CashClosuresTable {...{ cashClosures }} />
    </section>
  )
}
