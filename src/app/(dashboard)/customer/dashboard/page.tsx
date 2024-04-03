import { customerRepository } from '@/db/repositories/customer'
import Link from 'next/link'

export default async function Page() {
  const user = await customerRepository.findAll()
  return (
    <main>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Telefono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {user.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>
                <button>Añadir vehículo</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
