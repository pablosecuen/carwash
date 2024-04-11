import { getByCustomerId } from '@/utils/getters/vehicles'

export default async function Page({ params }: { params: { id: string } }) {
  const vehicles = await getByCustomerId(Number(params.id))
  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Patente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td>{vehicle.brand}</td>
              <td>{vehicle.model}</td>
              <td>{vehicle.patent}</td>
              <td className='mx-2 flex gap-4'> ... </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
