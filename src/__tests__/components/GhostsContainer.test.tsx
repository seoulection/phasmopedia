import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { FiltersContext } from '../../contexts/FiltersContext'
import GhostsContainer from '../../components/GhostsContainer'
import { Evidence } from '../../types'
import { INITIAL_FILTERS } from '../../../static/common'

const GHOSTS = [
  {
    name: 'Ghost 1',
    evidences: [Evidence.GhostOrb, Evidence.GhostWriting, Evidence.Ultraviolet],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: ['some strength'],
    weaknesses: ['some weakness']
  },
  {
    name: 'Ghost 2',
    evidences: [Evidence.EMFLevelFive, Evidence.SpiritBox, Evidence.Ultraviolet],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: ['some strength'],
    weaknesses: ['some weakness']
  }
]

describe('GhostsContainer', () => {
  test('renders ghost card for each ghost', () => {
    renderWithContext()

    expect(screen.getAllByRole('heading').length).toEqual(2)
  })

  test('considers selected filters to render ghosts', () => {
    renderWithContext({ selectedFilters: [Evidence.SpiritBox] })

    expect(screen.getAllByRole('heading').length).toEqual(1)
  })

  test('considers rejected filters to render ghosts', () => {
    renderWithContext({ rejectedFilters: [Evidence.Ultraviolet] })

    expect(screen.queryAllByRole('heading').length).toEqual(0)
  })

  function renderWithContext(overrides: object = {}) {
    render(
      <FiltersContext.Provider value={{ ...INITIAL_FILTERS, ...overrides }}>
        <GhostsContainer ghosts={GHOSTS} />
      </FiltersContext.Provider>
    )
  }
})
