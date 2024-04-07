import { getAllServices } from '@/utils/getters/services'
import Link from 'next/link'

const listFormater = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' })

export default async function Page() {
  const services = await getAllServices()
  return (
    <div>
      <h1>All services</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre del servicio</th>
            <th>Descripción</th>
            <th>Disponible para</th>
            <th>Precio en efectivo</th>
            <th>Precio con tarjeta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.description}</td>
              <td>{listFormater.format(service.avaliableFor)}</td>
              <td>{service.cashPrice}</td>
              <td>{service.cardPrice}</td>
              <td>
                <Link href={`/service/update/${service.id}`}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
