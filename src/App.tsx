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

  const handleOClick = () => {
    window.open('https://youtu.be/y1LUYJnGu-M?si=HjydhP5WwsFacuHi&t=30')
  }

  const handleReset = () => {
    dispatch({ type: Action.Reset })
  }

  return (
    <div className="app">
      <header>
        <h1 onClick={handleReset}>
          Phasm
          <span data-testid="ooohhhhh" onClick={handleOClick}>o</span>
          pedia
        </h1>
      </header>
      <EvidenceFilter
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <GhostsContainer
        ghosts={GHOSTS}
        filters={filters}
        onGhostCardClick={handleGhostCardClick}
      />
    </div>
  )
}

export default App
