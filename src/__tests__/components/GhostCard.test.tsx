import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { setupFilters } from '../helpers'
import GhostCard from '../../components/GhostCard'
import { Evidence } from '../../types'

describe('GhostCard', () => {
  test('renders ghost card', () => {
    const filters = setupFilters()

    const ghost = {
      name: 'Ghost',
      evidences: [Evidence.GhostOrb, Evidence.GhostWriting, Evidence.Ultraviolet],
      guaranteedEvidence: null,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness']
    }

    render(<GhostCard ghost={ghost} filters={filters} onClick={jest.fn} />)

    expect(screen.getByText(ghost.name)).toBeInTheDocument()
    expect(screen.getByText(`Sanity: ${ghost.sanity}%`)).toBeInTheDocument()
    expect(screen.getByText(/some strength/i)).toBeInTheDocument()
    expect(screen.getByText(/some weakness/i)).toBeInTheDocument()

    ghost.evidences.forEach((evidence) => {
      expect(screen.getByRole('img', { name: evidence })).toBeInTheDocument()
    })
  })

  test("does not render ghost card if evidences are not in selected filters", () => {
    const filters = setupFilters({ selectedFilters: [Evidence.Ultraviolet] })

    const ghost = {
      name: 'Ghost',
      evidences: [Evidence.EMFLevelFive, Evidence.GhostOrb, Evidence.GhostWriting],
      guaranteedEvidence: null,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness']
    }

    render(<GhostCard ghost={ghost} filters={filters} onClick={jest.fn}/>)

    expect(screen.queryByText(ghost.name)).toBeNull()
    expect(screen.queryAllByRole('img').length).toEqual(0)
    expect(screen.queryByText(`Sanity: ${ghost.sanity}%`)).toBeNull()
    expect(screen.queryByText(/some strength/i)).toBeNull()
    expect(screen.queryByText(/some weakness/i)).toBeNull()
  })

  test("does not render ghost card if evidences are in rejected filters", () => {
    const filters = setupFilters({ rejectedFilters: [Evidence.Ultraviolet] })


    const ghost = {
      name: 'Ghost',
      evidences: [Evidence.EMFLevelFive, Evidence.GhostOrb, Evidence.Ultraviolet],
      guaranteedEvidence: null,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness']
    }

    render(<GhostCard ghost={ghost} filters={filters} onClick={jest.fn} />)

    expect(screen.queryByText(ghost.name)).toBeNull()
    expect(screen.queryAllByRole('img').length).toEqual(0)
    expect(screen.queryByText(`Sanity: ${ghost.sanity}%`)).toBeNull()
    expect(screen.queryByText(/some strength/i)).toBeNull()
    expect(screen.queryByText(/some weakness/i)).toBeNull()
  })

  test('calls props onClick handler when ghost card is clicked', async () => {
    const mockFn = jest.fn()

    const filters = setupFilters()

    const ghost = {
      name: 'Ghost',
      evidences: [Evidence.EMFLevelFive, Evidence.GhostOrb, Evidence.Ultraviolet],
      guaranteedEvidence: null,
      sanity: 40,
      strengths: ['some strength'],
      weaknesses: ['some weakness']
    }

    render(<GhostCard ghost={ghost} filters={filters} onClick={mockFn} />)

    await userEvent.click(screen.getByTestId('ghost-card'))

    expect(mockFn).toHaveBeenCalledWith('Ghost')
  })
})
