// Todos os valores monetários são inteiros em centavos (R$ 2,89 → 289),
// evitando erros de ponto flutuante como 0.1 + 0.2.

export type DenominationKind = 'moeda' | 'cedula'

export interface Denomination {
  value: number
  kind: DenominationKind
}

export interface CurrencySystem {
  code: string
  name: string
  symbol: string
  denominations: Denomination[]
}
