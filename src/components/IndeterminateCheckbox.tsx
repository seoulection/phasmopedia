import { useEffect, useRef } from 'react'
import { CheckboxState } from '@/types'

interface IIndeterminateCheckbox {
  disabled: boolean
  label: string
  onChange: (state: CheckboxState) => void
  state: CheckboxState
  children?: JSX.Element
}

function IndeterminateCheckbox({
  children,
  disabled,
  label,
  onChange,
  state,
}: IIndeterminateCheckbox) {
  const checkboxRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (checkboxRef && checkboxRef.current) {
      if (state === CheckboxState.Checked) {
        checkboxRef.current.checked = true
        checkboxRef.current.indeterminate = false
      } else if (state === CheckboxState.Unchecked) {
        checkboxRef.current.checked = false
        checkboxRef.current.indeterminate = false
      } else {
        checkboxRef.current.checked = false
        checkboxRef.current.indeterminate = true
      }
    }
  }, [state])

  const handleChange = () => {
    let updatedState

    if (state === CheckboxState.Checked) {
      updatedState = CheckboxState.Indeterminate
    } else if (state === CheckboxState.Indeterminate) {
      updatedState = CheckboxState.Unchecked
    } else {
      updatedState = CheckboxState.Checked
    }

    onChange(updatedState)
  }

  return (
    <label className="indeterminate-checkbox">
      <input
        disabled={disabled}
        ref={checkboxRef}
        type="checkbox"
        onChange={handleChange}
      />
      {children}
      {label}
    </label>
  )
}

export default IndeterminateCheckbox
