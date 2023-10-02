import { useContext } from 'react'
import {
  FiltersContext,
  FiltersDispatchContext,
} from '@/contexts/FiltersContext'
import Evidence from './Evidence'
import { Action, Ghost } from '@/types'

interface IGhostCard {
  ghost: Ghost
}

function GhostCard({ ghost }: IGhostCard) {
  const { isFast, rejectedEvidences, rejectedGhosts, selectedEvidences } =
    useContext(FiltersContext)
  const dispatch = useContext(FiltersDispatchContext)
  const {
    name,
    evidences,
    guaranteedEvidence,
    isFast: isGhostFast,
    sanity,
    strengths,
    weaknesses,
  } = ghost

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

  const checkSpeed = () => {
    if (isFast === null) {
      return true
    } else if (isFast && isGhostFast) {
      return true
    } else if (!isFast && !isGhostFast) {
      return true
    } else {
      return false
    }
  }

  const handleGhostCardClick = () => {
    dispatch({
      name,
      type: Action.GhostToggled,
    })
  }

  const shouldShow =
    selectedEvidences.every((filter) => evidences.includes(filter)) &&
    !rejectedEvidences.some((filter) => evidences.includes(filter)) &&
    (name === 'The Mimic' || checkSpeed())

  if (!shouldShow) return

  const ghostCardClass = rejectedGhosts.includes(name)
    ? 'ghost-card rejected'
    : 'ghost-card'

  return (
    <div
      className={ghostCardClass}
      data-testid="ghost-card"
      onClick={handleGhostCardClick}
    >
      <div className="ghost-card__info">
        <h3 className="ghost-card__name">{name}</h3>
        <div className="ghost-card__evidences">{buildEvidences()}</div>
        <p className="ghost-card__sanity">Sanity: {sanity}%</p>
      </div>
      <div className="ghost-card__attributes">
        <div className="strengths">
          {strengths.map((strength) => (
            <p key={strength}>{strength}</p>
          ))}
        </div>
        <div className="weaknesses">
          {weaknesses.map((weakness) => (
            <p key={weakness}>{weakness}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GhostCard
