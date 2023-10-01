import { useReducer } from 'react'
import { FiltersContext, FiltersDispatchContext } from './contexts/FiltersContext'
import filtersReducer from './reducers/filtersReducer'
import EvidenceFilter from './components/EvidenceFilter'
import SpeedFilter from './components/SpeedFilter'
import GhostsContainer from './components/GhostsContainer'
import { INITIAL_FILTERS } from '../static/common'
import { GHOSTS } from '../static/ghosts'
import { Action } from './types'
import './App.css'

function App() {
  const [filters, dispatch] = useReducer(filtersReducer, INITIAL_FILTERS)

  return (
    <FiltersContext.Provider value={filters}>
      <FiltersDispatchContext.Provider value={dispatch}>
        <div className="app">
          <header className="header">
            <h1 onClick={() => dispatch({ type: Action.Reset })}>
              Phasmopedia
            </h1>
          </header>
          <section className="container">
            <GhostsContainer ghosts={GHOSTS} />
            <aside className="filters">
              <EvidenceFilter />
              <SpeedFilter />
            </aside>
          </section>
        </div>
      </FiltersDispatchContext.Provider>
    </FiltersContext.Provider>
  )
}

export default App
