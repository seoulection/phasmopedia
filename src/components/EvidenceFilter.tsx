import { useContext } from 'react'
import {
  FiltersContext,
  FiltersDispatchContext,
} from '@/contexts/FiltersContext'
import IndeterminateCheckbox from './IndeterminateCheckbox'
import Evidence from './Evidence'
import { Action, CheckboxState, Evidence as EvidenceEnum } from '@/types'

function EvidenceFilter() {
  const { rejectedEvidences, selectedEvidences } = useContext(FiltersContext)
  const dispatch = useContext(FiltersDispatchContext)

  const createFilter = (evidence: EvidenceEnum) => {
    const isChecked = selectedEvidences.includes(evidence)
    const state = determineState(evidence)

    return (
      <IndeterminateCheckbox
        disabled={!isChecked && selectedEvidences.length === 3}
        label={evidence}
        onChange={(state: CheckboxState) => handleFilterChange(evidence, state)}
        state={state}
      >
        <Evidence evidence={evidence} />
      </IndeterminateCheckbox>
    )
  }

  const determineState = (evidence: EvidenceEnum) => {
    if (selectedEvidences.includes(evidence)) {
      return CheckboxState.Checked
    } else if (rejectedEvidences.includes(evidence)) {
      return CheckboxState.Indeterminate
    } else {
      return CheckboxState.Unchecked
    }
  }

  const handleFilterChange = (evidence: EvidenceEnum, state: CheckboxState) => {
    if (state === CheckboxState.Checked) {
      dispatch({
        evidence: evidence,
        type: Action.EvidenceSelected,
      })
    } else if (state === CheckboxState.Indeterminate) {
      dispatch({
        evidence: evidence,
        type: Action.EvidenceRejected,
      })
    } else {
      dispatch({
        evidence: evidence,
        type: Action.EvidenceUnselected,
      })
    }
  }

  return (
    <div className="evidence-filter" data-testid="evidence-filter">
      <h3>Evidences:</h3>
      {createFilter(EvidenceEnum.DOTSProjector)}
      {createFilter(EvidenceEnum.EMFLevelFive)}
      {createFilter(EvidenceEnum.FreezingTemperatures)}
      {createFilter(EvidenceEnum.GhostOrb)}
      {createFilter(EvidenceEnum.GhostWriting)}
      {createFilter(EvidenceEnum.SpiritBox)}
      {createFilter(EvidenceEnum.Ultraviolet)}
    </div>
  )
}

export default EvidenceFilter
