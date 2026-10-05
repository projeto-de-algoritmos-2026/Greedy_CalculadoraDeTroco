import { describe, expect, it } from 'vitest'
import { BRL } from '../denominations.ts'
import type { Denomination, GreedyResult } from '../types.ts'
import { greedyChange } from './greedy.ts'

const coins = (...values: number[]): Denomination[] =>
  values.map((value) => ({ value, kind: 'moeda' }))

// Resume o resultado como pares [valor da peça, quantidade].
const pieces = (result: GreedyResult) =>
  result.solved ? result.items.map((item) => [item.denomination.value, item.count]) : null

describe('greedyChange', () => {
  it('dá o troco de 34¢ com as moedas do dólar dos slides', () => {
    const result = greedyChange(34, coins(100, 25, 10, 5, 1))

    expect(pieces(result)).toEqual([
      [25, 1],
      [5, 1],
      [1, 4],
    ])
    expect(result.solved && result.totalPieces).toBe(6)
  })

  it('dá o troco de R$ 2,89 com o real', () => {
    const result = greedyChange(289, BRL.denominations)

    expect(pieces(result)).toEqual([
      [200, 1],
      [50, 1],
      [25, 1],
      [10, 1],
      [1, 4],
    ])
    expect(result.solved && result.totalPieces).toBe(8)
  })

  it('registra cada iteração com restante, peça, quantidade e novo restante', () => {
    const result = greedyChange(289, BRL.denominations)

    expect(
      result.steps.map((step) => [step.remaining, step.denomination.value, step.count, step.newRemaining]),
    ).toEqual([
      [289, 200, 1, 89],
      [89, 50, 1, 39],
      [39, 25, 1, 14],
      [14, 10, 1, 4],
      [4, 1, 4, 0],
    ])
  })

  it('não usa nenhuma peça para troco zero', () => {
    const result = greedyChange(0, BRL.denominations)

    expect(result).toEqual({ solved: true, items: [], steps: [], totalPieces: 0 })
  })

  it('ordena denominações fora de ordem sem alterar a lista recebida', () => {
    const denominations = coins(1, 25, 5, 10)
    const result = greedyChange(40, denominations)

    expect(pieces(result)).toEqual([
      [25, 1],
      [10, 1],
      [5, 1],
    ])
    expect(denominations.map((d) => d.value)).toEqual([1, 25, 5, 10])
  })

  it('nem sempre é ótimo: com {1, 3, 4} e valor 6 usa 3 peças em vez de 2', () => {
    const result = greedyChange(6, coins(4, 3, 1))

    expect(pieces(result)).toEqual([
      [4, 1],
      [1, 2],
    ])
    expect(result.solved && result.totalPieces).toBe(3)
  })

  describe('sem solução', () => {
    it('com {5, 2} e valor 3, sobra 1 que nenhuma peça cobre', () => {
      const result = greedyChange(3, coins(5, 2))

      expect(result.solved).toBe(false)
      expect(!result.solved && result.remaining).toBe(1)
      expect(result.steps).toHaveLength(1)
    })

    it('com {5, 2} e valor 8, falha mesmo existindo 2 + 2 + 2 + 2', () => {
      const result = greedyChange(8, coins(5, 2))

      expect(result.solved).toBe(false)
      expect(!result.solved && result.remaining).toBe(1)
      expect(result.steps.map((step) => step.denomination.value)).toEqual([5, 2])
    })

    it('sem nenhuma denominação, todo o valor sobra', () => {
      const result = greedyChange(5, [])

      expect(result).toEqual({ solved: false, steps: [], remaining: 5 })
    })
  })
})
