import type { Filter } from '../types'

export function setupFilters(overrides: object = {}): Filter {
  return {
    isFast: null,
    rejectedEvidences: [],
    rejectedGhosts: [],
    selectedEvidences: [],
    ...overrides,
  }
}
