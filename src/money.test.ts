import { describe, expect, it } from 'vitest'
import { formatMoney, parseCents } from './money.ts'

describe('parseCents', () => {
  it('converte valores com vírgula, ponto e inteiros', () => {
    expect(parseCents('2,89')).toBe(289)
    expect(parseCents('2.5')).toBe(250)
    expect(parseCents(' 10 ')).toBe(1000)
    expect(parseCents('0,05')).toBe(5)
  })

  it('rejeita textos inválidos', () => {
    expect(parseCents('')).toBeNull()
    expect(parseCents('abc')).toBeNull()
    expect(parseCents('-1')).toBeNull()
    expect(parseCents('1,234')).toBeNull()
  })
})

describe('formatMoney', () => {
  it('formata centavos em reais', () => {
    expect(formatMoney(289).replace(/\s/g, ' ')).toBe('R$ 2,89')
  })
})
