import Evidence from './Evidence'
import type { Filter, Ghost } from '../types'

interface IGhostCard {
  filters: Filter
  ghost: Ghost
}

function GhostCard({ filters, ghost }: IGhostCard) {
  const { rejectedFilters, selectedFilters } = filters
  const { name, evidences, sanity, strengths, weaknesses } = ghost

  const buildEvidences = () => {
    return evidences.map((evidence) => (
      <Evidence key={evidence} evidence={evidence} />
    ))
  }

  const shouldShow = selectedFilters.every(filter => evidences.includes(filter)) &&
    !rejectedFilters.some(filter => evidences.includes(filter))

  if (!shouldShow) return

  return (
    <div className="ghost-card" data-testid="ghost-card">
      <div className="ghost-card__info">
        <h3 className="ghost-card__name">{name}</h3>
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
