import type { Filter } from '../types'

export function setupFilters(overrides: object = {}): Filter {
  return {
    rejectedFilters: [],
    rejectedGhosts: [],
    selectedFilters: [],
    ...overrides
  }
}
