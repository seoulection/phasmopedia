import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Evidence from '../../components/Evidence'
import { Evidence as EvidenceEnum } from '../../types'

describe('Evidence', () => {
  test('renders an image of evidence', () => {
    render(<Evidence evidence={EvidenceEnum.GhostOrb} />)

    expect(screen.getByRole('img', { name: EvidenceEnum.GhostOrb })).toBeInTheDocument()
  })
})
