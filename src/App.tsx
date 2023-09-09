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

  return (
    <div className="app">
      <h1 className="header">Phasmopedia</h1>
      <EvidenceFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <GhostsContainer ghosts={GHOSTS} filters={filters} />
    </div>
  )
}

export default App
