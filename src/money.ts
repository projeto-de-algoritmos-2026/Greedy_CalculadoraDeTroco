// Converte entre texto digitado e centavos inteiros (R$ 2,89 ↔ 289).

const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

// "7,11", "7.11" ou "10" → centavos. Retorna null se o texto não for um valor válido.
export function parseCents(text: string): number | null {
  const match = text.trim().match(/^(\d+)(?:[.,](\d{1,2}))?$/)
  if (!match) return null

  const cents = Number(match[1]) * 100 + Number((match[2] ?? '').padEnd(2, '0'))
  return Number.isSafeInteger(cents) ? cents : null
}

// 289 → "R$ 2,89"
export function formatMoney(cents: number): string {
  return formatter.format(cents / 100)
}
