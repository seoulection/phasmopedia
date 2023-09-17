import { Action, Filter } from '../types'

// eslint-disable-next-line
function filtersReducer(filters: Filter, action: any): Filter {
  const { rejectedFilters, rejectedGhosts, selectedFilters } = filters

  switch (action.type) {
    case Action.FilterRejected: {
      return {
        ...filters,
        rejectedFilters: rejectedFilters.concat(action.evidence),
        selectedFilters: selectedFilters.filter(filter => filter !== action.evidence)
      }
    }

    case Action.FilterSelected: {
      return {
        ...filters,
        selectedFilters: selectedFilters.concat(action.evidence)
      }
    }

    case Action.FilterUnselected: {
      return {
        ...filters,
        rejectedFilters: rejectedFilters.filter(filter => filter !== action.evidence)
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
        rejectedFilters: [],
        rejectedGhosts: [],
        selectedFilters: []
      }
    }

    default: {
      throw Error('unknown action: ' + action.type)
    }
  }
}

export default filtersReducer
