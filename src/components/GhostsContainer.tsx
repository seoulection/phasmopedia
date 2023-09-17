import type { Filter, Ghost } from '../types'
import GhostCard from './GhostCard'

interface IGhostsContainer {
  filters: Filter
  ghosts: Ghost[]
  onGhostCardClick: (name: string) => void
}

function GhostsContainer({ filters, ghosts, onGhostCardClick }: IGhostsContainer) {
  const populateGhostsContainer = () => {
    return ghosts.map((ghost: Ghost) => (
      <GhostCard
        key={ghost.name}
        filters={filters}
        ghost={ghost}
        onClick={() => onGhostCardClick(ghost.name)}
      />
    ))
  }

  return (
    <div className="ghosts-container" data-testid="ghosts-container">
      {populateGhostsContainer()}
    </div>
  )
}

export default GhostsContainer
