import { useState } from 'react'
import EvidenceFilter from './components/EvidenceFilter'
import GhostsContainer from './components/GhostsContainer'
import { GHOSTS } from '../static/ghosts'
import { CheckboxState, Evidence, Filter } from './types'
import './App.css'

function App() {
  const [filters, setFilters] = useState<Filter>({
    rejectedFilters: [],
    selectedFilters: []
  })

  const [rejectedGhostNames, setRejectedGhostNames] = useState<string[]>([])

  const handleFilterChange = (evidence: Evidence, state: CheckboxState) => {
    if (state === CheckboxState.Checked) {
      setFilters({
        ...filters,
        selectedFilters: filters.selectedFilters.concat(evidence)
      })
    } else if (state === CheckboxState.Indeterminate) {
      setFilters({
        rejectedFilters: filters.rejectedFilters.concat(evidence),
        selectedFilters: filters.selectedFilters.filter(filter => filter !== evidence)
      })
    } else {
      setFilters({
        ...filters,
        rejectedFilters: filters.rejectedFilters.filter(filter => filter !== evidence)
      })
    }
  }

  const handleGhostCardClick = (name: string) => {
    rejectedGhostNames.includes(name) ?
      setRejectedGhostNames(rejectedGhostNames.filter(ghostName => ghostName !== name)) :
      setRejectedGhostNames(rejectedGhostNames.concat(name))
  }

  const handleReset = () => {
    setFilters({
      rejectedFilters: [],
      selectedFilters: []
    })

    setRejectedGhostNames([])
  }

  return (
    <div className="app">
      <h1 className="header" onClick={handleReset}>Phasmopedia</h1>
      <EvidenceFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <GhostsContainer
        ghosts={GHOSTS}
        filters={filters}
        rejectedGhostNames={rejectedGhostNames}
        onGhostCardClick={handleGhostCardClick}
      />
    </div>
  )
}

export default App
