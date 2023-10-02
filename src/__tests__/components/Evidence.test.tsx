import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Evidence from '@/components/Evidence'
import { Evidence as EvidenceEnum } from '@/types'

describe('Evidence', () => {
  test('renders an image of evidence', () => {
    render(<Evidence evidence={EvidenceEnum.GhostOrb} isGuaranteed={false} />)

    expect(
      screen.getByRole('img', { name: EvidenceEnum.GhostOrb }),
    ).toBeVisible()
  })

  test('renders a highlight if evidence is guaranteed', () => {
    render(<Evidence evidence={EvidenceEnum.GhostOrb} isGuaranteed={true} />)

    const image = screen.getByRole('img', { name: EvidenceEnum.GhostOrb })

    expect(image.nextSibling).toHaveClass('evidence__highlight')
  })
})
