import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  FiltersContext,
  FiltersDispatchContext,
} from '../../contexts/FiltersContext'
import EvidenceFilter from '../../components/EvidenceFilter'
import { Action, Evidence } from '../../types'
import { INITIAL_FILTERS } from '../../../static/common'

describe('EvidenceFilter', () => {
  const dispatchHandler = jest.fn()

  test('creates checkboxes for each evidence', () => {
    renderWithContexts()

    expect(screen.getByText(/evidences:/i)).toBeVisible()

    expect(
      screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i }),
    ).toBeVisible()
    expect(screen.getByRole('checkbox', { name: /EMF Level 5/i })).toBeVisible()
    expect(
      screen.getByRole('checkbox', { name: /Freezing Temperatures/i }),
    ).toBeVisible()
    expect(screen.getByRole('checkbox', { name: /Ghost Orb/i })).toBeVisible()
    expect(
      screen.getByRole('checkbox', { name: /Ghost Writing/i }),
    ).toBeVisible()
    expect(screen.getByRole('checkbox', { name: /Spirit Box/i })).toBeVisible()
    expect(screen.getByRole('checkbox', { name: /Ultraviolet/i })).toBeVisible()
  })

  test('renders a checked checkbox if evidence is in selected filters', () => {
    renderWithContexts({ selectedEvidences: [Evidence.Ultraviolet] })

    const uv = screen.getByRole('checkbox', {
      name: /Ultraviolet/i,
    }) as HTMLInputElement
    const dots = screen.getByRole('checkbox', {
      name: /D.O.T.S. Projector/i,
    }) as HTMLInputElement

    expect(uv.checked).toEqual(true)
    expect(dots.checked).toEqual(false)
  })

  test('renders an indeterminate checkbox if evidence is in rejected filters', () => {
    renderWithContexts({ rejectedEvidences: [Evidence.DOTSProjector] })

    const dots = screen.getByRole('checkbox', {
      name: /D.O.T.S. Projector/i,
    }) as HTMLInputElement

    expect(dots.indeterminate).toEqual(true)
  })

  test('clicking on an unchecked checkbox calls filter selected dispatch', async () => {
    renderWithContexts()

    await userEvent.click(
      screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i }),
    )

    expect(dispatchHandler).toHaveBeenCalledWith({
      evidence: Evidence.DOTSProjector,
      type: Action.EvidenceSelected,
    })
  })

  test('clicking on a checked checkbox calls filter rejected dispatch', async () => {
    renderWithContexts({ selectedEvidences: [Evidence.DOTSProjector] })

    await userEvent.click(
      screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i }),
    )

    expect(dispatchHandler).toHaveBeenCalledWith({
      evidence: Evidence.DOTSProjector,
      type: Action.EvidenceRejected,
    })
  })

  test('clicking on an indeterminate checkbox calls filter unselected dispatch', async () => {
    renderWithContexts({ rejectedEvidences: [Evidence.DOTSProjector] })

    await userEvent.click(
      screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i }),
    )

    expect(dispatchHandler).toHaveBeenCalledWith({
      evidence: Evidence.DOTSProjector,
      type: Action.EvidenceUnselected,
    })
  })

  test('disables non-checked checkboxes if there are three selected filters', () => {
    renderWithContexts({
      selectedEvidences: [
        Evidence.DOTSProjector,
        Evidence.EMFLevelFive,
        Evidence.FreezingTemperatures,
      ],
    })

    const dots = screen.getByRole('checkbox', {
      name: /D.O.T.S. Projector/i,
    }) as HTMLInputElement
    const emf = screen.getByRole('checkbox', {
      name: /EMF Level 5/i,
    }) as HTMLInputElement
    const freezingTemperatures = screen.getByRole('checkbox', {
      name: /Freezing Temperatures/i,
    }) as HTMLInputElement
    const ghostOrb = screen.getByRole('checkbox', {
      name: /Ghost Orb/i,
    }) as HTMLInputElement
    const ghostWriting = screen.getByRole('checkbox', {
      name: /Ghost Writing/i,
    }) as HTMLInputElement
    const spiritBox = screen.getByRole('checkbox', {
      name: /Spirit Box/i,
    }) as HTMLInputElement
    const uv = screen.getByRole('checkbox', {
      name: /Ultraviolet/i,
    }) as HTMLInputElement

    ;[
      dots,
      emf,
      freezingTemperatures,
      ghostOrb,
      ghostWriting,
      spiritBox,
      uv,
    ].forEach((evidence, index) => {
      if (index <= 2) {
        expect(evidence.checked).toEqual(true)
        expect(evidence.disabled).toEqual(false)
      } else {
        expect(evidence.checked).toEqual(false)
        expect(evidence.disabled).toEqual(true)
      }
    })
  })

  function renderWithContexts(overrides: object = {}) {
    render(
      <FiltersContext.Provider value={{ ...INITIAL_FILTERS, ...overrides }}>
        <FiltersDispatchContext.Provider value={dispatchHandler}>
          <EvidenceFilter />
        </FiltersDispatchContext.Provider>
      </FiltersContext.Provider>,
    )
  }
})
