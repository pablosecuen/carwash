import { getAllCashClosures } from '@/actions/cash-closures/getters'
import { CashClosuresTable } from './cash-closures-table'

export default async function Page() {
  const { cashClosures } = await getAllCashClosures()
  return (
    <section>
      <h1>Lista de cierres de caja</h1>

      <CashClosuresTable {...{ cashClosures }} />
    </section>
  )
}
