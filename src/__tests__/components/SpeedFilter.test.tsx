import '@testing-library/jest-dom'
import { contextRender, screen } from '../test-utils'
import userEvent from '@testing-library/user-event'
import SpeedFilter from '@/components/SpeedFilter'
import { Action } from '@/types'

describe('SpeedFilter', () => {
  const dispatchHandler = jest.fn()

  test('renders a checkbox for speed', () => {
    contextRender(<SpeedFilter />)

    expect(screen.getByText(/speed/i)).toBeVisible()
    expect(
      screen.getByRole('checkbox', { name: 'Fast as Fuck Boi' }),
    ).toBeVisible()
  })

  test('renders a checked checkbox if isFast is true', () => {
    contextRender(<SpeedFilter />, { filterOverrides: { isFast: true } })

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(true)
  })

  test('renders an indeterminate checkbox if isFast is false', () => {
    contextRender(<SpeedFilter />, { filterOverrides: { isFast: false } })

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox.indeterminate).toEqual(true)
  })

  test('renders an unchecked checkbox if isFast is null', () => {
    contextRender(<SpeedFilter />, { filterOverrides: { isFast: null } })

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(false)
  })

  test('clicking on an unchecked checkbox calls fast selected dispatch', async () => {
    contextRender(<SpeedFilter />, { dispatchHandler })

    await userEvent.click(screen.getByRole('checkbox'))

    expect(dispatchHandler).toHaveBeenCalledWith({
      type: Action.FastSelected,
    })
  })

  test('clicking on a checked checkbox calls fast rejected dispatch', async () => {
    contextRender(<SpeedFilter />, {
      dispatchHandler,
      filterOverrides: { isFast: true },
    })

    await userEvent.click(screen.getByRole('checkbox'))

    expect(dispatchHandler).toHaveBeenCalledWith({
      type: Action.FastRejected,
    })
  })

  test('clicking on an indeterminate checkbox calls fast unselected dispatch', async () => {
    contextRender(<SpeedFilter />, {
      dispatchHandler,
      filterOverrides: { isFast: false },
    })

    await userEvent.click(screen.getByRole('checkbox'))

    expect(dispatchHandler).toHaveBeenCalledWith({
      type: Action.FastUnselected,
    })
  })
})
