import IndeterminateCheckbox from './IndeterminateCheckbox'
import Evidence from './Evidence'
import { CheckboxState, Evidence as EvidenceEnum, Filter } from '../types'

interface IEvidenceFilter {
  filters: Filter
  onFilterChange: (evidence: EvidenceEnum, state: CheckboxState) => void
}

function EvidenceFilter({
  filters,
  onFilterChange,
}: IEvidenceFilter) {
  const createFilter = (evidence: EvidenceEnum) => {
    const { selectedFilters } = filters
    const isChecked = selectedFilters.includes(evidence)
    const state = determineState(evidence, filters)

    return (
      <>
        <IndeterminateCheckbox
          disabled={!isChecked && selectedFilters.length === 3}
          label={evidence}
          onChange={(state: CheckboxState) => onFilterChange(evidence, state)}
          state={state}
        >
          <Evidence evidence={evidence} />
        </IndeterminateCheckbox>
      </>
    )
  }

  const determineState = (
    evidence: EvidenceEnum,
    filters: Filter
  ) => {
    const { rejectedFilters, selectedFilters } = filters

    if (selectedFilters.includes(evidence)) {
      return CheckboxState.Checked
    } else if (rejectedFilters.includes(evidence)) {
      return CheckboxState.Indeterminate
    } else {
      return CheckboxState.Unchecked
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
