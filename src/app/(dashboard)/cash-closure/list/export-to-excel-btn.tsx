'use client'

import { Button } from '@/components/ui/button'
import { type CashClosures } from '@/db/entities'
import { calculatePayPerEmployee } from '@/lib/utils'
import { BRANCHES } from '@/utils/constants'
import { exportToExcel } from '@/utils/export-to-excel'
import { FileDownIcon } from 'lucide-react'
import React from 'react'

export function ExportToExcelBtn({ cashClosures }: { cashClosures: CashClosures[] }) {
  return (
    <Button
      size={'sm'}
      variant={'outline'}
      onClick={() => {
        const exportData = cashClosures.map((cashClosure) => ({
          ID: cashClosure.id,
          Sucursal: BRANCHES[cashClosure.branch],
          Total: cashClosure.totalDaily,
          'Total en efectivo': cashClosure.totalDailyCash,
          'Pagos en efectivo': cashClosure.totalCash,
          'Pagos con tarjeta': cashClosure.totalCard,
          'Porcentaje del día': cashClosure.dailyPercentage,
          'Bonus a empleados': cashClosure.employeeBonus,
          'Pago a empleados': cashClosure.employeePayment,
          'Pago por empleado': calculatePayPerEmployee({
            employeePayment: cashClosure.employeePayment,
            employeesNum: cashClosure.employeesNum
          }),
          'Bonus a gerente': cashClosure.managerBonus,
          'Pago a gerente':
            calculatePayPerEmployee({
              employeePayment: cashClosure.employeePayment,
              employeesNum: cashClosure.employeesNum
            }) + cashClosure.managerBonus,
          'Monto cancelado': cashClosure.totalCanceled,
          'Monto en caja':
            cashClosure.totalDaily - cashClosure.managerBonus - cashClosure.employeePayment,
          Fecha: cashClosure.createdAt
        }))
        exportToExcel({
          exportData,
          fileName: 'cierres-de-caja-historial.xlsx',
          sheetName: 'Cierres de caja'
        })
      }}
    >
      <FileDownIcon className='mr-2 h-5 w-5' />
      Exportar a excel
    </Button>
  )
}
