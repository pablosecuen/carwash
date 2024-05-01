import { getAllCashClosures } from '@/actions/cash-clousures/getters'
import { DateFormatter } from '@/utils/formatters'

export default async function Page() {
  const cashClousures = await getAllCashClosures()
  return (
    <section>
      <h1>Lista de cierres de caja</h1>
      <table>
        <thead>
          <tr>
            <th>Sucursal</th>
            <th>Total del día</th>
            <th>Porcentaje del día</th>
            <th>Bono al gerente</th>
            <th>Pago a empleados</th>
            <th>Total Restante</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {cashClousures.map(
            ({
              branch,
              totalDaily,
              dailyPercentage,
              managerBonus,
              employeePayment,
              createdAt,
              id
            }) => (
              <tr key={id}>
                <td>{branch}</td>
                <td>{totalDaily}</td>
                <td>{dailyPercentage}</td>
                <td>{managerBonus}</td>
                <td>{employeePayment}</td>
                <td>{totalDaily - managerBonus - employeePayment}</td>
                <td>{DateFormatter(new Date(createdAt))}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </section>
  )
}
