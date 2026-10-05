import { useState } from 'react'
import './App.css'
import { BRL } from './denominations.ts'
import { greedyChange } from './algorithms/greedy.ts'
import { formatMoney, parseCents } from './money.ts'

// Limite para manter os valores dentro do que o navegador representa sem perda.
const MAX_CHANGE = 100_000_000 // R$ 1.000.000,00

function App() {
  const [due, setDue] = useState('7,11')
  const [paid, setPaid] = useState('10')

  const dueCents = parseCents(due)
  const paidCents = parseCents(paid)
  const change = dueCents !== null && paidCents !== null ? paidCents - dueCents : null

  let error = ''
  if (dueCents === null || paidCents === null) error = 'Digite os valores no formato 7,11 ou 10.'
  else if (change! < 0) error = `Faltam ${formatMoney(-change!)} para cobrir o valor devido.`
  else if (change! > MAX_CHANGE) error = 'O troco máximo é R$ 1.000.000,00.'

  const result = !error && change !== null ? greedyChange(change, BRL.denominations) : null

  return (
    <main>
      <h1>Calculadora de Troco</h1>
      <p className="lead">Algoritmo do trocador: a cada passo, a maior peça que cabe no restante.</p>

      <section className="panel">
        <div className="row">
          <label>
            Valor devido
            <input value={due} onChange={(e) => setDue(e.target.value)} inputMode="decimal" />
          </label>
          <label>
            Valor pago
            <input value={paid} onChange={(e) => setPaid(e.target.value)} inputMode="decimal" />
          </label>
        </div>
      </section>

      {error && (
        <p className="warn" role="alert">
          {error}
        </p>
      )}

      {result && change !== null && (
        <>
          <section className="panel">
            <h2>Troco: {formatMoney(change)}</h2>
            {!result.solved ? (
              <p className="warn">
                Sem solução: sobrou {formatMoney(result.remaining)} que nenhuma peça cobre.
              </p>
            ) : result.items.length === 0 ? (
              <p>Não há troco a dar.</p>
            ) : (
              <>
                <ul className="pieces">
                  {result.items.map(({ denomination, count }) => (
                    <li key={denomination.value}>
                      <b>{count}×</b> {denomination.kind === 'cedula' ? 'cédula' : 'moeda'} de{' '}
                      {formatMoney(denomination.value)}
                    </li>
                  ))}
                </ul>
                <p className="total">
                  {result.totalPieces} {result.totalPieces === 1 ? 'peça' : 'peças'} no total
                </p>
              </>
            )}
          </section>

          {result.steps.length > 0 && (
            <section className="tape">
              <h2>Passo a passo</h2>
              <table>
                <thead>
                  <tr>
                    <th>Restante</th>
                    <th>Maior peça que cabe</th>
                    <th>Qtd.</th>
                    <th>Novo restante</th>
                  </tr>
                </thead>
                <tbody>
                  {result.steps.map((step) => (
                    <tr key={step.denomination.value}>
                      <td>{formatMoney(step.remaining)}</td>
                      <td>{formatMoney(step.denomination.value)}</td>
                      <td>{step.count}</td>
                      <td>{formatMoney(step.newRemaining)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}
    </main>
  )
}

export default App
