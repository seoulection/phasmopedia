import filtersReducer from '../../reducers/filtersReducer'
import { setupFilters } from '../helpers'
import { Action, Evidence } from '../../types'

describe('filtersReducer', () => {
  test('adds to selected filters', () => {
    const filters = setupFilters()
    const action = {
      evidence: Evidence.DOTSProjector,
      type: Action.EvidenceSelected,
    }

    const { selectedEvidences } = filtersReducer(filters, action)

    expect(selectedEvidences.includes(Evidence.DOTSProjector)).toEqual(true)
  })

  test('moves from selected filters to rejected filters', () => {
    const filters = setupFilters({
      selectedEvidences: [Evidence.GhostOrb],
    })
    const action = {
      evidence: Evidence.GhostOrb,
      type: Action.EvidenceRejected,
    }

    const { rejectedEvidences, selectedEvidences } = filtersReducer(
      filters,
      action,
    )

    expect(selectedEvidences.includes(Evidence.GhostOrb)).toEqual(false)
    expect(rejectedEvidences.includes(Evidence.GhostOrb)).toEqual(true)
  })

  test('removes from rejected filters', () => {
    const filters = setupFilters({
      rejectedEvidences: [Evidence.GhostWriting],
    })
    const action = {
      evidence: Evidence.GhostWriting,
      type: Action.EvidenceUnselected,
    }

    const { rejectedEvidences } = filtersReducer(filters, action)

    expect(rejectedEvidences.includes(Evidence.GhostWriting)).toEqual(false)
  })

  test('sets isFast to true', () => {
    const filters = setupFilters({
      isFast: null,
    })
    const action = { type: Action.FastSelected }

    const { isFast } = filtersReducer(filters, action)

    expect(isFast).toEqual(true)
  })

  test('sets isFast to false', () => {
    const filters = setupFilters({
      isFast: true,
    })
    const action = { type: Action.FastRejected }

    const { isFast } = filtersReducer(filters, action)

    expect(isFast).toEqual(false)
  })

  test('sets isFast to null', () => {
    const filters = setupFilters({
      isFast: false,
    })
    const action = { type: Action.FastUnselected }

    const { isFast } = filtersReducer(filters, action)

    expect(isFast).toEqual(null)
  })

  test('toggles ghost name for rejected ghosts', () => {
    const toggleOnFilters = setupFilters()
    const toggleOnAction = { name: 'some ghost', type: Action.GhostToggled }

    const { rejectedGhosts: toggleOnRejectedGhosts } = filtersReducer(
      toggleOnFilters,
      toggleOnAction,
    )

    expect(toggleOnRejectedGhosts.includes('some ghost')).toEqual(true)

    const toggleOffFilters = setupFilters({
      rejectedGhosts: ['some other ghost'],
    })

    const toggleOffAction = {
      name: 'some other ghost',
      type: Action.GhostToggled,
    }

    const { rejectedGhosts: toggleOffRejectedGhosts } = filtersReducer(
      toggleOffFilters,
      toggleOffAction,
    )

    expect(toggleOffRejectedGhosts.includes('some other ghost')).toEqual(false)
  })

  test('resets filters', () => {
    const filters = {
      isFast: true,
      rejectedEvidences: [Evidence.GhostOrb],
      rejectedGhosts: ['some rejected ghost'],
      selectedEvidences: [Evidence.SpiritBox],
    }

    const action = { type: Action.Reset }

    const reducer = filtersReducer(filters, action)

    expect(reducer).toEqual({
      isFast: null,
      rejectedEvidences: [],
      rejectedGhosts: [],
      selectedEvidences: [],
    })
  })
})
