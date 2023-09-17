import Evidence from './Evidence'
import type { Filter, Ghost } from '../types'

interface IGhostCard {
  filters: Filter
  ghost: Ghost
  onClick: (name: string) => void
}

function GhostCard({ filters, ghost, onClick }: IGhostCard) {
  const { rejectedFilters, rejectedGhosts, selectedFilters } = filters
  const { name, evidences, guaranteedEvidence, sanity, strengths, weaknesses } = ghost

  const buildEvidences = () => {
    return evidences.map((evidence) => {
      return (
        <Evidence
          key={evidence}
          evidence={evidence}
          isGuaranteed={evidence === guaranteedEvidence}
        />
      )
    })
  }

  const handleGhostCardClick = () => {
    onClick(name)
  }

  const handleGhostNameClick = () => {
    if (name === 'Onryo') {
      window.open('https://youtu.be/y1LUYJnGu-M?si=HjydhP5WwsFacuHi&t=30')
    }
  }

  const shouldShow = selectedFilters.every(filter => evidences.includes(filter)) &&
    !rejectedFilters.some(filter => evidences.includes(filter))

  if (!shouldShow) return

  const ghostCardClass = rejectedGhosts.includes(name) ? 'ghost-card rejected' : 'ghost-card'

  return (
    <div className={ghostCardClass} data-testid="ghost-card" onClick={handleGhostCardClick}>
      <div className="ghost-card__info">
        <h3 className="ghost-card__name" onClick={handleGhostNameClick}>{name}</h3>
        <div className="ghost-card__evidences">
          {buildEvidences()}
        </div>
        <p className="ghost-card__sanity">Sanity: {sanity}%</p>
      </div>
      <div className="ghost-card__attributes">
        <div className="strengths">
          {strengths.map(strength => (
            <p key={strength}>{strength}</p>
          ))}
        </div>
        <div className="weaknesses">
          {weaknesses.map(weakness => (
            <p key={weakness}>{weakness}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GhostCard
