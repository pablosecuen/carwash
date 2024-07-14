'use client'
import { getAllCustomers } from '@/actions/customer/getters'
import { Button } from '@/components/ui/button'
import { BRANCHES } from '@/utils/constants'
import { exportToExcel } from '@/utils/export-to-excel'

export function ExportToExcelBtn({ withCurrentAccount }: { withCurrentAccount?: boolean }) {
  return (
    <Button
      size={'sm'}
      onClick={async () => {
        const { customers } = await getAllCustomers({ withCurrentAccount, vehicles: true })
        const exportData = customers.map(
          ({ id, branch, name, address, email, phone, vehicles }) => ({
            ID: id,
            Sucursal: BRANCHES[branch],
            Nombre: name,
            Email: email,
            Teléfono: phone,
            Dirección: address,
            'Cantidad de vehículos': vehicles.length
          })
        )
        exportToExcel({
          exportData,
          fileName: 'clientes.xlsx',
          sheetName: 'Clientes'
        })
      }}
    >
      Exportar a excel
    </Button>
  )
}
