import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  FiltersContext,
  FiltersDispatchContext,
} from '../../contexts/FiltersContext'
import SpeedFilter from '../../components/SpeedFilter'
import { Action } from '../../types'
import { INITIAL_FILTERS } from '../../../static/common'

describe('SpeedFilter', () => {
  const dispatchHandler = jest.fn()

  test('renders a checkbox for speed', () => {
    renderWithContexts()

    expect(screen.getByText(/speed/i)).toBeVisible()
    expect(
      screen.getByRole('checkbox', { name: 'Fast as Fuck Boi' }),
    ).toBeVisible()
  })

  test('renders a checked checkbox if isFast is true', () => {
    renderWithContexts({ isFast: true })

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(true)
  })

  test('renders an indeterminate checkbox if isFast is false', () => {
    renderWithContexts({ isFast: false })

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox.indeterminate).toEqual(true)
  })

  test('renders an unchecked checkbox if isFast is null', () => {
    renderWithContexts({ isFast: null })

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(false)
  })

  test('clicking on an unchecked checkbox calls fast selected dispatch', async () => {
    renderWithContexts()

    await userEvent.click(screen.getByRole('checkbox'))

    expect(dispatchHandler).toHaveBeenCalledWith({
      type: Action.FastSelected,
    })
  })

  test('clicking on a checked checkbox calls fast rejected dispatch', async () => {
    renderWithContexts({ isFast: true })

    await userEvent.click(screen.getByRole('checkbox'))

    expect(dispatchHandler).toHaveBeenCalledWith({
      type: Action.FastRejected,
    })
  })

  test('clicking on an indeterminate checkbox calls fast unselected dispatch', async () => {
    renderWithContexts({ isFast: false })

    await userEvent.click(screen.getByRole('checkbox'))

    expect(dispatchHandler).toHaveBeenCalledWith({
      type: Action.FastUnselected,
    })
  })

  function renderWithContexts(overrides: object = {}) {
    render(
      <FiltersContext.Provider value={{ ...INITIAL_FILTERS, ...overrides }}>
        <FiltersDispatchContext.Provider value={dispatchHandler}>
          <SpeedFilter />
        </FiltersDispatchContext.Provider>
      </FiltersContext.Provider>,
    )
  }
})
