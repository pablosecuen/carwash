import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const currencyFormat = (value: number) => {
  // Utilizamos Intl.NumberFormat con el código de idioma y la configuración de moneda de Argentina
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  // Aplicamos el formato al valor numérico y lo retornamos
  return formatter.format(value)
}

export const calculatePayPerEmployee = ({
  employeesNum,
  employeePayment
}: {
  employeesNum: number
  employeePayment: number
}) => {
  return Math.round(employeePayment / employeesNum)
}

export const dateFormat = (date: Date) => {
  // Utilizamos Intl.DateTimeFormat con el código de idioma y la configuración de fecha de Argentina
  const formatter = new Intl.DateTimeFormat('es').format(date)

  return formatter
}

export const sleep = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

export const variantBadge = (status: string) =>
  status === 'pending'
    ? 'pending'
    : status === 'completed'
      ? 'completed'
      : status === 'cancelled'
        ? 'cancelled'
        : 'default'
