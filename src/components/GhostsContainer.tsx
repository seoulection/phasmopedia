import type { Ghost } from '@/types'
import GhostCard from './GhostCard'

interface IGhostsContainer {
  ghosts: Ghost[]
}

function GhostsContainer({ ghosts }: IGhostsContainer) {
  const populateGhostsContainer = () => {
    return ghosts.map((ghost: Ghost) => (
      <GhostCard key={ghost.name} ghost={ghost} />
    ))
  }

  return (
    <div className="ghosts-container" data-testid="ghosts-container">
      {populateGhostsContainer()}
    </div>
  )
}

export default GhostsContainer
