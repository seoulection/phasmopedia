import filtersReducer from '../../reducers/filtersReducer'
import { setupFilters } from '../helpers'
import { Action, Evidence } from '../../types'

describe('filtersReducer', () => {
  test('adds to selected filters', () => {
    const filters = setupFilters()
    const action = { evidence: Evidence.DOTSProjector, type: Action.FilterSelected }

    const { selectedFilters } = filtersReducer(filters, action)

    expect(selectedFilters.includes(Evidence.DOTSProjector)).toEqual(true)
  })

  test('moves from selected filters to rejected filters', () => {
    const filters = setupFilters({
      selectedFilters: [Evidence.GhostOrb]
    })
    const action = { evidence: Evidence.GhostOrb, type: Action.FilterRejected }

    const { rejectedFilters, selectedFilters } = filtersReducer(filters, action)

    expect(selectedFilters.includes(Evidence.GhostOrb)).toEqual(false)
    expect(rejectedFilters.includes(Evidence.GhostOrb)).toEqual(true)
  })

  test('removes from rejected filters', () => {
    const filters = setupFilters({
      rejectedFilters: [Evidence.GhostWriting]
    })
    const action = { evidence: Evidence.GhostWriting, type: Action.FilterUnselected }

    const { rejectedFilters } = filtersReducer(filters, action)

    expect(rejectedFilters.includes(Evidence.GhostWriting)).toEqual(false)
  })

  test('toggles ghost name for rejected ghosts', () => {
    const toggleOnFilters = setupFilters()
    const toggleOnAction = { name: 'some ghost', type: Action.GhostToggled }

    const { rejectedGhosts: toggleOnRejectedGhosts } = filtersReducer(toggleOnFilters, toggleOnAction)

    expect(toggleOnRejectedGhosts.includes('some ghost')).toEqual(true)

    const toggleOffFilters = setupFilters({
      rejectedGhosts: ['some other ghost']
    })

    const toggleOffAction = { name: 'some other ghost', type: Action.GhostToggled }

    const { rejectedGhosts: toggleOffRejectedGhosts } = filtersReducer(toggleOffFilters, toggleOffAction)

    expect(toggleOffRejectedGhosts.includes('some other ghost')).toEqual(false)
  })

  test('resets filters', () => {
    const filters = {
      rejectedFilters: [Evidence.GhostOrb],
      rejectedGhosts: ['some rejected ghost'],
      selectedFilters: [Evidence.SpiritBox]
    }

    const action = { type: Action.Reset }

    const reducer = filtersReducer(filters, action)

    expect(reducer).toEqual({
      rejectedFilters: [],
      rejectedGhosts: [],
      selectedFilters: []
    })
  })
})
