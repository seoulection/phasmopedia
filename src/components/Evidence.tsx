import { Evidence as EvidenceEnum } from '../types'
import bookImg from '/book.png'
import dotsImg from '/dots.png'
import emfImg from '/emf.png'
import fingiesImg from '/fingies.png'
import orbsImg from '/ghost-orb.png'
import spiritBoxImg from '/spirit-box.png'
import tempsImg from '/temps.png'

interface IEvidence {
  evidence: EvidenceEnum
}

const EVIDENCE_MAP = {
  [EvidenceEnum.DOTSProjector]: dotsImg,
  [EvidenceEnum.EMFLevelFive]: emfImg,
  [EvidenceEnum.FreezingTemperatures]: tempsImg,
  [EvidenceEnum.GhostOrb]: orbsImg,
  [EvidenceEnum.GhostWriting]: bookImg,
  [EvidenceEnum.SpiritBox]: spiritBoxImg,
  [EvidenceEnum.Ultraviolet]: fingiesImg
}

function Evidence({ evidence }: IEvidence) {
  return (
    <img
      src={EVIDENCE_MAP[evidence]}
      alt={evidence}
      title={evidence}
      height={25}
      width={25}
    />
  )
}

export default Evidence
