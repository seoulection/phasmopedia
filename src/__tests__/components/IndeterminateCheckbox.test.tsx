import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IndeterminateCheckbox from '../../components/IndeterminateCheckbox'
import { CheckboxState } from '../../types'

describe('IndeterminateCheckbox', () => {
  test('renders a checkbox with label', () => {
    render(
      <IndeterminateCheckbox
        disabled={true}
        label="Hi"
        onChange={jest.fn}
        state={CheckboxState.Unchecked}
      />
    )

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox).toBeVisible()
    expect(checkbox.checked).toEqual(false)
    expect(checkbox.indeterminate).toEqual(false)
    expect(screen.getByText(/hi/i)).toBeVisible()
  })

  test('renders children', () => {
    render(
      <IndeterminateCheckbox
        disabled={true}
        label="Hi"
        onChange={jest.fn}
        state={CheckboxState.Unchecked}
      >
        <h1>Hello World</h1>
      </IndeterminateCheckbox>
    )

    expect(screen.getByText(/hello world/i)).toBeVisible()
  })

  test('renders a disabled checkbox', () => {
    render(<IndeterminateCheckbox disabled={true} label="Hi" onChange={jest.fn} state={CheckboxState.Unchecked} />)

    expect(screen.getByRole('checkbox')).toHaveAttribute('disabled')
  })

  test('renders a checked checkbox', () => {
    render(
      <IndeterminateCheckbox
        disabled={true}
        label="Hi"
        onChange={jest.fn}
        state={CheckboxState.Checked}
      />
    )

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(true)
    expect(checkbox.indeterminate).toEqual(false)
  })

  test('renders an indeterminate checkbox', () => {
    render(
      <IndeterminateCheckbox
        disabled={true}
        label="Hi"
        onChange={jest.fn}
        state={CheckboxState.Indeterminate}
      />
    )

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement

    expect(checkbox.checked).toEqual(false)
    expect(checkbox.indeterminate).toEqual(true)
  })

  test('calls click handler with checked state when clicking on an unchecked checkbox', async () => {
    const mockFn = jest.fn()

    render(
      <IndeterminateCheckbox
        disabled={false}
        label="Hi"
        onChange={mockFn}
        state={CheckboxState.Unchecked}
      />
    )

    const checkbox = screen.getByRole('checkbox')

    await userEvent.click(checkbox)

    expect(mockFn).toHaveBeenCalledWith(CheckboxState.Checked)
  })

  test('calls click handler with indeterminate state when clicking on a checked checkbox', async () => {
    const mockFn = jest.fn()

    render(
      <IndeterminateCheckbox
        disabled={false}
        label="Hi"
        onChange={mockFn}
        state={CheckboxState.Checked}
      />
    )

    const checkbox = screen.getByRole('checkbox')

    await userEvent.click(checkbox)

    expect(mockFn).toHaveBeenCalledWith(CheckboxState.Indeterminate)
  })

  test('calls click handler with unchecked state when clicking on an indeterminate checkbox', async () => {
    const mockFn = jest.fn()

    render(
      <IndeterminateCheckbox
        disabled={false}
        label="Hi"
        onChange={mockFn}
        state={CheckboxState.Indeterminate}
      />
    )

    const checkbox = screen.getByRole('checkbox')

    await userEvent.click(checkbox)

    expect(mockFn).toHaveBeenCalledWith(CheckboxState.Unchecked)
  })
})
