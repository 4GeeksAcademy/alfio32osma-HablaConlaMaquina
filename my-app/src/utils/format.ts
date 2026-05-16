export const formatNumber = (value: number): string =>
  new Intl.NumberFormat('es-ES').format(Math.max(0, Math.round(value)))

export const formatMs = (value: number): string => `${Math.max(0, Math.round(value))} ms`

export const formatTps = (value: number): string => `${value.toFixed(2)} tok/s`
