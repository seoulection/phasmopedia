import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EvidenceFilter from '../../components/EvidenceFilter'
import { Evidence } from '../../types'

describe('EvidenceFilter', () => {
  test('creates checkboxes for each evidence', () => {
    const filters = {
      rejectedFilters: [],
      selectedFilters: []
    }

    render(<EvidenceFilter onFilterChange={jest.fn} filters={filters} />)

    expect(screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /EMF Level 5/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /Freezing Temperatures/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /Ghost Orb/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /Ghost Writing/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /Spirit Box/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /Ultraviolet/i })).toBeInTheDocument()
  })

  test('renders a checked checkbox if evidence is in selected filters', () => {
    const filters = {
      rejectedFilters: [],
      selectedFilters: [Evidence.Ultraviolet]
    }

    render(<EvidenceFilter onFilterChange={jest.fn} filters={filters} />)

    const uv = screen.getByRole('checkbox', { name: /Ultraviolet/i }) as HTMLInputElement
    const dots = screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i }) as HTMLInputElement

    expect(uv.checked).toEqual(true)
    expect(dots.checked).toEqual(false)
  })

  test('renders an indeterminate checkbox if evidence is in rejected filters', () => {
    const filters = {
      rejectedFilters: [Evidence.DOTSProjector],
      selectedFilters: []
    }

    render(<EvidenceFilter onFilterChange={jest.fn} filters={filters} />)

    const dots = screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i }) as HTMLInputElement

    expect(dots.indeterminate).toEqual(true)
  })

  test('clicking on a non-disabled checkbox calls onFilterChange', async () => {
    const mockFn = jest.fn()
    const filters = {
      rejectedFilters: [],
      selectedFilters: []
    }

    render(<EvidenceFilter onFilterChange={mockFn} filters={filters} />)

    await userEvent.click(screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i }))

    expect(mockFn).toHaveBeenCalled()
  })

  test('disables non-checked checkboxes if there are three selected filters', () => {
    const filters = {
      rejectedFilters: [],
      selectedFilters: [Evidence.DOTSProjector, Evidence.EMFLevelFive, Evidence.FreezingTemperatures]
    }

    render(<EvidenceFilter onFilterChange={jest.fn} filters={filters} />)

    const dots = screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i }) as HTMLInputElement
    const emf = screen.getByRole('checkbox', { name: /EMF Level 5/i }) as HTMLInputElement
    const freezingTemperatures = screen.getByRole('checkbox', { name: /Freezing Temperatures/i }) as HTMLInputElement
    const ghostOrb = screen.getByRole('checkbox', { name: /Ghost Orb/i }) as HTMLInputElement
    const ghostWriting = screen.getByRole('checkbox', { name: /Ghost Writing/i }) as HTMLInputElement
    const spiritBox = screen.getByRole('checkbox', { name: /Spirit Box/i }) as HTMLInputElement
    const uv = screen.getByRole('checkbox', { name: /Ultraviolet/i }) as HTMLInputElement

    [dots, emf, freezingTemperatures, ghostOrb, ghostWriting, spiritBox, uv].forEach((evidence, index) => {
      if (index <= 2) {
        expect(evidence.checked).toEqual(true)
        expect(evidence.disabled).toEqual(false)
      } else {
        expect(evidence.checked).toEqual(false)
        expect(evidence.disabled).toEqual(true)
      }
    })
  })
})