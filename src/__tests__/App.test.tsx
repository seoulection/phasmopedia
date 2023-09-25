import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App', () => {
  beforeEach(() => {
    render(<App />)
  })

  test('renders the phasmopedia header', () => {
    expect(screen.getByText(/phasm/i)).toBeInTheDocument()
  })

  test('renders the evidence filter', () => {
    expect(screen.getByTestId('evidence-filter')).toBeInTheDocument()
  })

  test('renders the ghosts container', () => {
    expect(screen.getByTestId('ghosts-container')).toBeInTheDocument()
  })

  test('renders ghost cards based on filter', async () => {
    expect(screen.getAllByTestId('ghost-card').length).toEqual(24)

    const dots = screen.getByRole('checkbox', { name: /D.O.T.S. Projector/i })

    await userEvent.click(dots)

    expect(screen.getAllByTestId('ghost-card').length).toEqual(10)
  })

  test('adds OOOOOHHHHHHHHHHHHHHHH easter egg', async () => {
    window.open = jest.fn();

    await userEvent.click(screen.getByTestId('ooohhhhh'))

    expect(window.open).toHaveBeenCalledWith('https://youtu.be/y1LUYJnGu-M?si=HjydhP5WwsFacuHi&t=30')
  })
})
