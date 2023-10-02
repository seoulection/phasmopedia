import '@testing-library/jest-dom'
import { contextRender, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import GhostCard from '@/components/GhostCard'
import { Action, Evidence, Ghost } from '@/types'

describe('GhostCard', () => {
  const dispatchHandler = jest.fn()

  test('renders ghost card', () => {
    const ghost: Ghost = {
      name: 'Ghost',
      evidences: [
        Evidence.GhostOrb,
        Evidence.GhostWriting,
        Evidence.Ultraviolet,
      ],
      guaranteedEvidence: null,
      isFast: true,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness'],
    }

    contextRender(<GhostCard ghost={ghost} />)

    expect(screen.getByText(ghost.name)).toBeVisible()
    expect(screen.getByText(`Sanity: ${ghost.sanity}%`)).toBeVisible()
    expect(screen.getByText(/some strength/i)).toBeVisible()
    expect(screen.getByText(/some weakness/i)).toBeVisible()

    ghost.evidences.forEach((evidence) => {
      expect(screen.getByRole('img', { name: evidence })).toBeVisible()
    })
  })

  test('does not render ghost card if evidences are not in selected filters', () => {
    const ghost: Ghost = {
      name: 'Ghost',
      evidences: [
        Evidence.EMFLevelFive,
        Evidence.GhostOrb,
        Evidence.GhostWriting,
      ],
      guaranteedEvidence: null,
      isFast: true,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness'],
    }

    contextRender(<GhostCard ghost={ghost} />, {
      filterOverrides: { selectedEvidences: [Evidence.Ultraviolet] },
    })

    expect(screen.queryByText(ghost.name)).toBeNull()
    expect(screen.queryAllByRole('img').length).toEqual(0)
    expect(screen.queryByText(`Sanity: ${ghost.sanity}%`)).toBeNull()
    expect(screen.queryByText(/some strength/i)).toBeNull()
    expect(screen.queryByText(/some weakness/i)).toBeNull()
  })

  test('does not render ghost card if evidences are in rejected filters', () => {
    const ghost = {
      name: 'Ghost',
      evidences: [
        Evidence.EMFLevelFive,
        Evidence.GhostOrb,
        Evidence.Ultraviolet,
      ],
      guaranteedEvidence: null,
      isFast: true,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness'],
    }

    contextRender(<GhostCard ghost={ghost} />, {
      filterOverrides: { rejectedEvidences: [Evidence.Ultraviolet] },
    })

    expect(screen.queryByText(ghost.name)).toBeNull()
    expect(screen.queryAllByRole('img').length).toEqual(0)
    expect(screen.queryByText(`Sanity: ${ghost.sanity}%`)).toBeNull()
    expect(screen.queryByText(/some strength/i)).toBeNull()
    expect(screen.queryByText(/some weakness/i)).toBeNull()
  })

  test('calls ghost toggle dispatch when ghost card is clicked', async () => {
    const ghost: Ghost = {
      name: 'Ghost',
      evidences: [
        Evidence.EMFLevelFive,
        Evidence.GhostOrb,
        Evidence.Ultraviolet,
      ],
      guaranteedEvidence: null,
      isFast: true,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness'],
    }

    contextRender(<GhostCard ghost={ghost} />, { dispatchHandler })

    await userEvent.click(screen.getByTestId('ghost-card'))

    expect(dispatchHandler).toHaveBeenCalledWith({
      name: 'Ghost',
      type: Action.GhostToggled,
    })
  })

  test('renders ghost card if fast selected and ghost is fast', () => {
    const ghost: Ghost = {
      name: 'Ghost',
      evidences: [
        Evidence.EMFLevelFive,
        Evidence.GhostOrb,
        Evidence.Ultraviolet,
      ],
      guaranteedEvidence: null,
      isFast: true,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness'],
    }

    contextRender(<GhostCard ghost={ghost} />, {
      filterOverrides: { isFast: true },
    })

    expect(screen.getByText(ghost.name)).toBeVisible()
    expect(screen.getByText(`Sanity: ${ghost.sanity}%`)).toBeVisible()
    expect(screen.getByText(/some strength/i)).toBeVisible()
    expect(screen.getByText(/some weakness/i)).toBeVisible()

    ghost.evidences.forEach((evidence) => {
      expect(screen.getByRole('img', { name: evidence })).toBeVisible()
    })
  })

  test('does not render ghost card if fast selected and ghost is not fast', () => {
    const ghost: Ghost = {
      name: 'Ghost',
      evidences: [
        Evidence.EMFLevelFive,
        Evidence.GhostOrb,
        Evidence.Ultraviolet,
      ],
      guaranteedEvidence: null,
      isFast: false,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness'],
    }

    contextRender(<GhostCard ghost={ghost} />, {
      filterOverrides: { isFast: true },
    })

    expect(screen.queryByText(ghost.name)).toBeNull()
    expect(screen.queryAllByRole('img').length).toEqual(0)
    expect(screen.queryByText(`Sanity: ${ghost.sanity}%`)).toBeNull()
    expect(screen.queryByText(/some strength/i)).toBeNull()
    expect(screen.queryByText(/some weakness/i)).toBeNull()
  })

  test('does not render ghost card if fast is indeterminate and ghost is fast', () => {
    const ghost: Ghost = {
      name: 'Ghost',
      evidences: [
        Evidence.EMFLevelFive,
        Evidence.GhostOrb,
        Evidence.Ultraviolet,
      ],
      guaranteedEvidence: null,
      isFast: true,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness'],
    }

    contextRender(<GhostCard ghost={ghost} />, {
      filterOverrides: { isFast: false },
    })

    expect(screen.queryByText(ghost.name)).toBeNull()
    expect(screen.queryAllByRole('img').length).toEqual(0)
    expect(screen.queryByText(`Sanity: ${ghost.sanity}%`)).toBeNull()
    expect(screen.queryByText(/some strength/i)).toBeNull()
    expect(screen.queryByText(/some weakness/i)).toBeNull()
  })

  test('renders ghost card if fast is unselected regardless of ghost speed', () => {
    ;[true, false].forEach((isFast) => {
      const ghost: Ghost = {
        name: 'Ghost',
        evidences: [
          Evidence.EMFLevelFive,
          Evidence.GhostOrb,
          Evidence.Ultraviolet,
        ],
        guaranteedEvidence: null,
        isFast,
        sanity: 40,
        strengths: ['some strength'],
        weaknesses: ['some weakness'],
      }

      const { unmount } = contextRender(<GhostCard ghost={ghost} />, {
        filterOverrides: { isFast: null },
      })

      expect(screen.getByText(ghost.name)).toBeVisible()
      expect(screen.getByText(`Sanity: ${ghost.sanity}%`)).toBeVisible()
      expect(screen.getByText(/some strength/i)).toBeVisible()
      expect(screen.getByText(/some weakness/i)).toBeVisible()

      ghost.evidences.forEach((evidence) => {
        expect(screen.getByRole('img', { name: evidence })).toBeVisible()
      })

      unmount()
    })
  })
})
