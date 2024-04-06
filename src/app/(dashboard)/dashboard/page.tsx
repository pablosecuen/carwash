import { Service } from './ui/cards/Service'

export default function DashboardPage() {
  return (
    <div className='mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-3 lg:grid-cols-4'>
      <Service />
    </div>
  )
}
