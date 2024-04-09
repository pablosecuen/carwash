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
