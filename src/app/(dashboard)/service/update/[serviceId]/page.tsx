import { updateServiceAction } from '@/actions/update-service'
import { VEHICLE_TYPES } from '@/utils/constants'
import { getServiceById } from '@/utils/getters/services'
import { type VehicleType } from '@/utils/types'

export default async function Page({ params }: { params: { serviceId: string } }) {
  const service = await getServiceById(params.serviceId)
  if (service == null) {
    return <div>Service not found</div>
  }

  return (
    <div>
      <h1>Update Service</h1>
      <form action={updateServiceAction(service.id)} className='grid'>
        <label>
          Name:
          <input type='text' name='name' defaultValue={service.name} />
        </label>
        <label>
          Description:
          <input type='text' name='description' defaultValue={service.description ?? ''} />
        </label>
        <label>
          Cash price:
          <input type='number' name='cashPrice' defaultValue={service.cashPrice} />
        </label>
        <label>
          Card price:
          <input type='number' name='cardPrice' defaultValue={service.cardPrice} />
        </label>
        <fieldset>
          Avaliable for:
          {Object.entries(VEHICLE_TYPES).map(([key, value]) => (
            <label key={key}>
              <input
                type='checkbox'
                name={key}
                defaultChecked={service.avaliableFor.includes(key as VehicleType)}
              />
              {value}
            </label>
          ))}
        </fieldset>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}
