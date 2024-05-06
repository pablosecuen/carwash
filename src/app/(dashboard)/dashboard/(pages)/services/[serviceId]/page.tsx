import { getServiceById } from '@/actions/service/getters'
import { Title } from '@/components/layout'
import { ContainerPage } from '@/components/layout/page/ContainerPage'
import { ServiceEditForm } from './ui/ServiceEditForm'

interface Props {
  params: {
    serviceId: number
  }
}

export default async function ServiceDetailPage({ params: { serviceId } }: Props) {
  const service = await getServiceById(serviceId)

  return (
    <ContainerPage>
      <Title title={`Actualizar servicio ${service?.name}`} />

      <ServiceEditForm service={service} />
    </ContainerPage>
  )
}
