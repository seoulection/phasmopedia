export enum CheckboxState {
  Checked = 'Checked',
  Indeterminate = 'Indeterminate',
  Unchecked = 'Unchecked'
}

export enum Evidence {
  DOTSProjector = 'D.O.T.S. Projector',
  EMFLevelFive = 'EMF Level 5',
  FreezingTemperatures = 'Freezing Temperatures',
  GhostOrb = 'Ghost Orb',
  GhostWriting = 'Ghost Writing',
  SpiritBox = 'Spirit Box',
  Ultraviolet = 'Ultraviolet'
}

export type Filter = {
  selectedFilters: Evidence[]
  rejectedFilters: Evidence[]
}

export type Ghost = {
  name: string
  evidences: Evidence[]
  sanity: number
  strengths: string[]
  weaknesses: string[]
}
