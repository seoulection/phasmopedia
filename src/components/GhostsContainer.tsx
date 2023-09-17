import type { Filter, Ghost } from '../types'
import GhostCard from './GhostCard'

interface IGhostsContainer {
  filters: Filter
  ghosts: Ghost[]
  onGhostCardClick: (name: string) => void
  rejectedGhostNames: string[]
}

function GhostsContainer({ filters, ghosts, onGhostCardClick, rejectedGhostNames }: IGhostsContainer) {
  const populateGhostsContainer = () => {
    return ghosts.map((ghost: Ghost) => (
      <GhostCard
        key={ghost.name}
        filters={filters}
        ghost={ghost}
        isRejected={rejectedGhostNames.includes(ghost.name)}
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
