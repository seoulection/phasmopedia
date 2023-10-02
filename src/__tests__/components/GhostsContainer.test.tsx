import '@testing-library/jest-dom'
import { contextRender, screen } from '../test-utils'
import GhostsContainer from '@/components/GhostsContainer'
import { Evidence } from '@/types'

const GHOSTS = [
  {
    name: 'Ghost 1',
    evidences: [Evidence.GhostOrb, Evidence.GhostWriting, Evidence.Ultraviolet],
    guaranteedEvidence: null,
    isFast: true,
    sanity: 50,
    strengths: ['some strength'],
    weaknesses: ['some weakness'],
  },
  {
    name: 'Ghost 2',
    evidences: [
      Evidence.EMFLevelFive,
      Evidence.SpiritBox,
      Evidence.Ultraviolet,
    ],
    guaranteedEvidence: null,
    isFast: false,
    sanity: 50,
    strengths: ['some strength'],
    weaknesses: ['some weakness'],
  },
]

describe('GhostsContainer', () => {
  test('renders ghost card for each ghost', () => {
    contextRender(<GhostsContainer ghosts={GHOSTS} />)

    expect(screen.getAllByRole('heading').length).toEqual(2)
  })

  test('considers selected filters to render ghosts', () => {
    contextRender(<GhostsContainer ghosts={GHOSTS} />, {
      filterOverrides: {
        selectedEvidences: [Evidence.SpiritBox],
      },
    })

    expect(screen.getAllByRole('heading').length).toEqual(1)
  })

  test('considers rejected filters to render ghosts', () => {
    contextRender(<GhostsContainer ghosts={GHOSTS} />, {
      filterOverrides: {
        rejectedEvidences: [Evidence.Ultraviolet],
      },
    })

    expect(screen.queryAllByRole('heading').length).toEqual(0)
  })

  test('considers fast selected filter to render ghosts', () => {
    contextRender(<GhostsContainer ghosts={GHOSTS} />, {
      filterOverrides: {
        isFast: true,
      },
    })

    expect(screen.getAllByRole('heading').length).toEqual(1)
  })

  test('considers fast rejected filter to render ghosts', () => {
    contextRender(<GhostsContainer ghosts={GHOSTS} />, {
      filterOverrides: {
        isFast: false,
      },
    })

    expect(screen.getAllByRole('heading').length).toEqual(1)
  })
})
