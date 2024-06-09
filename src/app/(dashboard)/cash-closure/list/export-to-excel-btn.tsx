'use client'

import { Button } from '@/components/ui/button'
import { type CashClosures } from '@/db/entities'
import { BRANCHES } from '@/utils/constants'
import { exportToExcel } from '@/utils/export-to-excel'
import React from 'react'

export function ExportToExcelBtn({ cashClosures }: { cashClosures: CashClosures[] }) {
  return (
    <Button
      size={'sm'}
      onClick={() => {
        const exportData = cashClosures.map((cashClosure) => ({
          ID: cashClosure.id,
          Sucursal: BRANCHES[cashClosure.branch],
          Total: cashClosure.totalDaily,
          'Porcentaje del día': cashClosure.dailyPercentage,
          'Bonus a empleados': cashClosure.employeeBonus,
          'Bonus a gerente': cashClosure.managerBonus,
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
      Exportar a excel
    </Button>
  )
}
