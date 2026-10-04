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

export interface ChangeItem {
  denomination: Denomination
  count: number
}

// Uma iteração do algoritmo: a maior peça que cabe no restante e quantas vezes ela é usada.
export interface GreedyStep {
  remaining: number
  denomination: Denomination
  count: number
  newRemaining: number
}

// Sem solução: nenhuma peça cabe no restante e ele ainda não é zero
// ("no solution found" do pseudocódigo). Os passos mostram até onde o algoritmo chegou.
export type GreedyResult =
  | {
      solved: true
      items: ChangeItem[]
      steps: GreedyStep[]
      totalPieces: number
    }
  | {
      solved: false
      steps: GreedyStep[]
      remaining: number
    }
