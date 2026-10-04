import type { ChangeItem, Denomination, GreedyResult, GreedyStep } from '../types.ts'

// Algoritmo do trocador: a cada passo, usa a maior peça que não ultrapassa o restante.
// Em vez de subtrair uma peça por vez, usa de uma só vez todas as cópias que cabem
// (divisão inteira), o que dá o mesmo resultado em O(n log n) para n denominações.
export function greedyChange(amount: number, denominations: Denomination[]): GreedyResult {
  const sorted = [...denominations].sort((a, b) => b.value - a.value)
  const items: ChangeItem[] = []
  const steps: GreedyStep[] = []
  let remaining = amount

  for (const denomination of sorted) {
    if (remaining === 0) break
    if (denomination.value > remaining) continue

    const count = Math.floor(remaining / denomination.value)
    const newRemaining = remaining - count * denomination.value

    items.push({ denomination, count })
    steps.push({ remaining, denomination, count, newRemaining })
    remaining = newRemaining
  }

  if (remaining !== 0) {
    return { solved: false, steps, remaining }
  }

  const totalPieces = items.reduce((total, item) => total + item.count, 0)

  return { solved: true, items, steps, totalPieces }
}
