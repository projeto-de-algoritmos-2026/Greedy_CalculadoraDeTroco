interface MoneyInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}

// Campo de texto (e não type="number") para aceitar a vírgula do formato brasileiro, como 2,89.
function MoneyInput({ id, label, value, onChange }: MoneyInputProps) {
  return (
    <div className="money-input">
      <label htmlFor={id}>{label}</label>
      <div className="money-input__field">
        <span aria-hidden="true">R$</span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder="0,00"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  )
}

export default MoneyInput
