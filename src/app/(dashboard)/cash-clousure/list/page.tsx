import { getAllCashClosures } from '@/actions/cash-clousures/getters'
import { CashClousuresTable } from './cash-clousures-table'

export default async function Page() {
  const cashClousures = await getAllCashClosures()
  return (
    <section>
      <h1>Lista de cierres de caja</h1>

      <CashClousuresTable {...{ cashClousures }} />
    </section>
  )
}
