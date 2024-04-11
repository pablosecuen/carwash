import { dateFormater } from '@/utils/formatters'
import { getInvoicesByCustomerId } from '@/utils/getters/invoices'
import { RangeDate } from './ui/range-date'

interface Props {
  params: {
    id: string
  }
  searchParams: {
    from?: string
    to?: string
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { from, to } = searchParams

  const invoices = await getInvoicesByCustomerId(params.id, {
    from: from != null ? new Date(from) : undefined,
    to: to != null ? new Date(to) : undefined
  })
  return (
    <section>
      <RangeDate />
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{dateFormater(new Date(invoice.createAt))}</td>
              <td>{invoice.status}</td>
              <td>{invoice.total}</td>
              <td> - </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
