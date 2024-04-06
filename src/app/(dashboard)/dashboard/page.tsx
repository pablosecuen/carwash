import { ServiceCard } from './ui/cards/Service'

export default function DashboardPage() {
  return (
    <div className='mx-auto grid max-w-7xl grid-cols-1 p-12 md:grid-cols-6'>
      <ServiceCard />
    </div>
  )
}
