import type { CurrencySystem } from './types.ts'

export const BRL: CurrencySystem = {
  code: 'BRL',
  name: 'Real brasileiro',
  symbol: 'R$',
  denominations: [
    { value: 20000, kind: 'cedula' },
    { value: 10000, kind: 'cedula' },
    { value: 5000, kind: 'cedula' },
    { value: 2000, kind: 'cedula' },
    { value: 1000, kind: 'cedula' },
    { value: 500, kind: 'cedula' },
    { value: 200, kind: 'cedula' },
    { value: 100, kind: 'moeda' },
    { value: 50, kind: 'moeda' },
    { value: 25, kind: 'moeda' },
    { value: 10, kind: 'moeda' },
    { value: 5, kind: 'moeda' },
    { value: 1, kind: 'moeda' },
  ],
}
