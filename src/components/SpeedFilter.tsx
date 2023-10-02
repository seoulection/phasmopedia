import { useContext } from 'react'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import {
  FiltersContext,
  FiltersDispatchContext,
} from '../contexts/FiltersContext'
import { Action, CheckboxState } from '../types'

function SpeedFilter() {
  const { isFast } = useContext(FiltersContext)
  const dispatch = useContext(FiltersDispatchContext)

  const determineState = () => {
    if (isFast === null) {
      return CheckboxState.Unchecked
    } else if (isFast) {
      return CheckboxState.Checked
    } else {
      return CheckboxState.Indeterminate
    }
  }

  const handleCheckboxChange = (state: CheckboxState) => {
    if (state === CheckboxState.Checked) {
      dispatch({
        type: Action.FastSelected,
      })
    } else if (state === CheckboxState.Indeterminate) {
      dispatch({
        type: Action.FastRejected,
      })
    } else {
      dispatch({
        type: Action.FastUnselected,
      })
    }
  }

  return (
    <div className="speed-filter">
      <h3>Speed:</h3>
      <IndeterminateCheckbox
        disabled={false}
        label="Fast as Fuck Boi"
        onChange={(state: CheckboxState) => handleCheckboxChange(state)}
        state={determineState()}
      />
    </div>
  )
}

export default SpeedFilter
