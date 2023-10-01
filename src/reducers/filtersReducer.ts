import { Action, Filter } from '../types'

// eslint-disable-next-line
function filtersReducer(filters: Filter, action: any): Filter {
  const { rejectedEvidences, rejectedGhosts, selectedEvidences } = filters

  switch (action.type) {
    case Action.EvidenceRejected: {
      return {
        ...filters,
        rejectedEvidences: rejectedEvidences.concat(action.evidence),
        selectedEvidences: selectedEvidences.filter(filter => filter !== action.evidence)
      }
    }

    case Action.EvidenceSelected: {
      return {
        ...filters,
        selectedEvidences: selectedEvidences.concat(action.evidence)
      }
    }

    case Action.EvidenceUnselected: {
      return {
        ...filters,
        rejectedEvidences: rejectedEvidences.filter(filter => filter !== action.evidence)
      }
    }

    case Action.FastRejected: {
      return {
        ...filters,
        isFast: false
      }
    }

    case Action.FastSelected: {
      return {
        ...filters,
        isFast: true
      }
    }
    case Action.FastUnselected: {
      return {
        ...filters,
        isFast: null
      }
    }

    case Action.GhostToggled: {
      const newRejectedGhosts = rejectedGhosts.includes(action.name) ?
        rejectedGhosts.filter((name: string) => action.name !== name) :
        rejectedGhosts.concat(action.name)

      return {
        ...filters,
        rejectedGhosts: newRejectedGhosts
      }
    }

    case Action.Reset: {
      return {
        isFast: null,
        rejectedEvidences: [],
        rejectedGhosts: [],
        selectedEvidences: []
      }
    }

    default: {
      throw Error('unknown action: ' + action.type)
    }
  }
}

export default filtersReducer
