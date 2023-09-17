import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { setupFilters } from '../helpers'
import GhostsContainer from '../../components/GhostsContainer'
import { Evidence } from '../../types'

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
    const filters = setupFilters()

    render(<GhostsContainer ghosts={GHOSTS} filters={filters} onGhostCardClick={jest.fn} />)

    expect(screen.getAllByRole('heading').length).toEqual(2)
  })

  test('considers selected filters to render ghosts', () => {
    const filters = setupFilters({ selectedFilters: [Evidence.SpiritBox] })

    render(<GhostsContainer ghosts={GHOSTS} filters={filters} onGhostCardClick={jest.fn} />)

    expect(screen.getAllByRole('heading').length).toEqual(1)
  })

  test('considers rejected filters to render ghosts', () => {
    const filters = setupFilters({ rejectedFilters: [Evidence.Ultraviolet] })

    render(<GhostsContainer ghosts={GHOSTS} filters={filters} onGhostCardClick={jest.fn} />)

    expect(screen.queryAllByRole('heading').length).toEqual(0)
  })
})
