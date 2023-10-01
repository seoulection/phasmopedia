import { useReducer } from 'react'
import filtersReducer from './reducers/filtersReducer'
import EvidenceFilter from './components/EvidenceFilter'
import GhostsContainer from './components/GhostsContainer'
import { GHOSTS } from '../static/ghosts'
import { Action, CheckboxState, Evidence, Filter } from './types'
import './App.css'

const INITIAL_FILTERS: Filter = {
  rejectedFilters: [],
  rejectedGhosts: [],
  selectedFilters: []
}

function App() {
  const [filters, dispatch] = useReducer(filtersReducer, INITIAL_FILTERS)

  const handleFilterChange = (evidence: Evidence, state: CheckboxState) => {
    if (state === CheckboxState.Checked) {
      dispatch({
        evidence: evidence,
        type: Action.FilterSelected
      })
    } else if (state === CheckboxState.Indeterminate) {
      dispatch({
        evidence: evidence,
        type: Action.FilterRejected
      })
    } else {
      dispatch({
        evidence: evidence,
        type: Action.FilterUnselected
      })
    }
  }

  const handleGhostCardClick = (name: string) => {
    dispatch({
      name,
      type: Action.GhostToggled
    })
  }

  const handleReset = () => {
    dispatch({ type: Action.Reset })
  }

  return (
    <div className="app">
      <header className="header">
        <h1 onClick={handleReset}>
          Phasmopedia
        </h1>
      </header>
      <section className="container">
        <GhostsContainer
          ghosts={GHOSTS}
          filters={filters}
          onGhostCardClick={handleGhostCardClick}
        />
        <EvidenceFilter
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </section>
    </div>
  )
}

export default App
