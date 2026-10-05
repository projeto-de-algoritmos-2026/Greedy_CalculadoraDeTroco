import { useState } from 'react'
import './App.css'
import MoneyInput from './components/MoneyInput.tsx'

function App() {
  const [amountDue, setAmountDue] = useState('')
  const [amountPaid, setAmountPaid] = useState('')

  return (
    <main>
      <h1>Calculadora de Troco</h1>

      <form className="change-form" onSubmit={(event) => event.preventDefault()}>
        <MoneyInput id="amount-due" label="Valor a pagar" value={amountDue} onChange={setAmountDue} />
        <MoneyInput id="amount-paid" label="Valor pago" value={amountPaid} onChange={setAmountPaid} />
      </form>
    </main>
  )
}

export default App
