import { createCashClosureAction } from '@/actions/cash-clousures/create'
import { getDailyInvoices } from '@/actions/invoice/getters'

export default async function Page() {
  const invoices = await getDailyInvoices()
  const total = invoices.reduce((acc, invoice) => acc + invoice.total, 0)
  const paymentToEmployees = Math.round(total * 0.3)
  return (
    <div>
      <h1>Cierre de caja</h1>
      <p>Contenido de la página de cierre de caja</p>
      <ul>
        {invoices.map((invoice) => (
          <li key={invoice.id}>
            <p>{new Date(invoice.createAt).toISOString()}</p>
            <p>{invoice.total}</p>
          </li>
        ))}
      </ul>

      <form action={createCashClosureAction} className='grid '>
        <label htmlFor='totalDaily'>
          Monto en total caja
          <input name='totalDaily' type='number' value={total} />
        </label>
        <label htmlFor='dailyPercentage'>
          Porcentaje del día
          <input name='dailyPercentage' type='number' defaultValue={30} />
        </label>
        <label htmlFor='managerBonus'>
          Bonus al gerente
          <input name='managerBonus' type='number' />
        </label>
        <label htmlFor='employeePayment'>
          Pago a empleados
          <input name='employeePayment' type='number' defaultValue={paymentToEmployees} />
        </label>
        <button type='submit'>Cerrar caja</button>
      </form>
    </div>
  )
}
