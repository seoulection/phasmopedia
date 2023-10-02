import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  test('renders the phasmopedia header', () => {
    expect(screen.getByText(/phasm/i)).toBeVisible()
  })

  test('renders the evidence filter', () => {
    expect(screen.getByTestId('evidence-filter')).toBeVisible()
  })

  test('renders the ghosts container', () => {
    expect(screen.getByTestId('ghosts-container')).toBeVisible()
  })

  test('renders ghost cards based on evidences', async () => {
    expect(screen.getAllByTestId('ghost-card').length).toEqual(24)

    const dots = screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i })

    await userEvent.click(dots)

    expect(screen.getAllByTestId('ghost-card').length).toEqual(10)
  })

  test('renders ghost cards based on speed', async () => {
    expect(screen.getAllByTestId('ghost-card').length).toEqual(24)

    const speed = screen.getByRole('checkbox', { name: 'Fast as Fuck Boi' })

    await userEvent.click(speed)

    expect(screen.getAllByTestId('ghost-card').length).toEqual(9)
  })
})
