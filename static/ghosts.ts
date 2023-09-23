import { Evidence } from '../src/types'

export const GHOSTS = [
  {
    name: 'Banshee',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.GhostOrb,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Targets only one player at a time',
      'Drains more sanity during singing ghost events'
    ],
    weaknesses: [
      'Has a distinctive wail on the parabolic microphone'
    ]
  },
  {
    name: 'Demon',
    evidences: [
      Evidence.FreezingTemperatures,
      Evidence.GhostWriting,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: null,
    sanity: 70,
    strengths: [
      'Can initiate hunts more often',
      'Can hunt at max sanity'
    ],
    weaknesses: [
      'Crucifix range is 50% larger than placement range indicator'
    ]
  },
  {
    name: 'Deogen',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.GhostWriting,
      Evidence.SpiritBox
    ],
    guaranteedEvidence: Evidence.SpiritBox,
    sanity: 40,
    strengths: [
      'Always knows where a player is during hunts',
      'Moves very fast when going to player location'
    ],
    weaknesses: [
      'Moves very slowly when near its victim'
    ]
  },
  {
    name: 'Goryo',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.EMFLevelFive,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: Evidence.DOTSProjector,
    sanity: 50,
    strengths: [
      'Can only be seen with D.O.T.S. through a camera when nobody is nearby'
    ],
    weaknesses: [
      'Cannot wander far from its room or change favorite rooms'
    ]
  },
  {
    name: 'Hantu',
    evidences: [
      Evidence.FreezingTemperatures,
      Evidence.GhostOrb,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: Evidence.FreezingTemperatures,
    sanity: 50,
    strengths: [
      'Moves faster in lower temperatures'
    ],
    weaknesses: [
      'Warmer areas slow its movement',
      'Ocassionally produces freezing breath during a hunt if the breaker is off',
      'Will never turn the breaker on'
    ]
  },
  {
    name: 'Jinn',
    evidences: [
      Evidence.EMFLevelFive,
      Evidence.FreezingTemperatures,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Travels faster if a player is in line of sight'
    ],
    weaknesses: [
      'Cannot use its ability if the breaker is off',
      'Will never turn the fuse box off directly'
    ]
  },
  {
    name: 'Mare',
    evidences: [
      Evidence.GhostOrb,
      Evidence.GhostWriting,
      Evidence.SpiritBox
    ],
    guaranteedEvidence: null,
    sanity: 60,
    strengths: [
      'Increased chance to attack in the dark'
    ],
    weaknesses: [
      'Reduced chance of an attack if the lights are on',
      'Occasionally turns lights off right away',
      'Will never turn a light on'
    ]
  },
  {
    name: 'Moroi',
    evidences: [
      Evidence.FreezingTemperatures,
      Evidence.GhostWriting,
      Evidence.SpiritBox
    ],
    guaranteedEvidence: Evidence.SpiritBox,
    sanity: 50,
    strengths: [
      'Moves noticeably faster at low sanity',
      'Can curse players, making them lose sanity quicker than usual'
    ],
    weaknesses: [
      'Incense blinds the ghost for 50% longer during hunts'
    ]
  },
  {
    name: 'Myling',
    evidences: [
      Evidence.EMFLevelFive,
      Evidence.GhostWriting,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Produces quieter sounds during a hunt'
    ],
    weaknesses: [
      'Produces paranormal sounds more frequently on the parabolic microphone'
    ]
  },
  {
    name: 'Obake',
    evidences: [
      Evidence.EMFLevelFive,
      Evidence.GhostOrb,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: Evidence.Ultraviolet,
    sanity: 50,
    strengths: [
      'May leave fingerprints that disappear faster'
    ],
    weaknesses: [
      'Small chance of leaving unique fingerprints',
      'Can quickly shapeshift into another model during a hunt'
    ]
  },
  {
    name: 'Oni',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.EMFLevelFive,
      Evidence.FreezingTemperatures
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Increased activity when players are nearby'
    ],
    weaknesses: [
      'More visible during hunts',
      'Cannot perform the airball ghost event'
    ]
  },
  {
    name: 'Onryo',
    evidences: [
      Evidence.FreezingTemperatures,
      Evidence.GhostOrb,
      Evidence.SpiritBox
    ],
    guaranteedEvidence: null,
    sanity: 60,
    strengths: [
      'Can attack when a flame is extinguished'
    ],
    weaknesses: [
      'The presence of flames reduces its ability to attack'
    ]
  },
  {
    name: 'Phantom',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.SpiritBox,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      "Looking at a Phantom will considerably lower the player's sanity",
      'Occasionally walks to a random player'
    ],
    weaknesses: [
      'Taking a photo of it will cause it to briefly disappear',
      'Less visible during hunts'
    ]
  },
  {
    name: 'Poltergeist',
    evidences: [
      Evidence.GhostWriting,
      Evidence.SpiritBox,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Can throw multiple objects at once',
      'Can throw objects at high velocities'
    ],
    weaknesses: [
      'Becomes powerless with no throwables nearby'
    ]
  },
  {
    name: 'Raiju',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.EMFLevelFive,
      Evidence.GhostOrb
    ],
    guaranteedEvidence: null,
    sanity: 65,
    strengths: [
      'Moves faster near active electronic equipment'
    ],
    weaknesses: [
      'Disrupts electronic equipment from further away when it hunts'
    ]
  },
  {
    name: 'Revenant',
    evidences: [
      Evidence.FreezingTemperatures,
      Evidence.GhostOrb,
      Evidence.GhostWriting
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Moves significantly faster if player location is known during a hunt'
    ],
    weaknesses: [
      'Moves very slowly when not chasing a player'
    ]
  },
  {
    name: 'Shade',
    evidences: [
      Evidence.EMFLevelFive,
      Evidence.FreezingTemperatures,
      Evidence.GhostWriting
    ],
    guaranteedEvidence: null,
    sanity: 35,
    strengths: [
      'Less likely to perform interactions'
    ],
    weaknesses: [
      'Cannot hunt if people are nearby'
    ]
  },
  {
    name: 'Spirit',
    evidences: [
      Evidence.EMFLevelFive,
      Evidence.GhostWriting,
      Evidence.SpiritBox
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [],
    weaknesses: [
      'Incense is more effective, preventing a hunt for longer'
    ]
  },
  {
    name: 'Thaye',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.GhostOrb,
      Evidence.GhostWriting
    ],
    guaranteedEvidence: null,
    sanity: 75,
    strengths: [
      'Entering the location makes it active, defensive, and agile'
    ],
    weaknesses: [
      'Becomes slower and less active over time'
    ]
  },
  {
    name: 'The Mimic',
    evidences: [
      Evidence.FreezingTemperatures,
      Evidence.GhostOrb,
      Evidence.SpiritBox,
      Evidence.Ultraviolet
    ],
    guaranteedEvidence: Evidence.GhostOrb,
    sanity: 50,
    strengths: [
      'Can mimic the abilities and traits of other ghosts'
    ],
    weaknesses: [
      'Will present fake Ghost Orbs as secondary evidence'
    ]
  },
  {
    name: 'The Twins',
    evidences: [
      Evidence.EMFLevelFive,
      Evidence.FreezingTemperatures,
      Evidence.SpiritBox
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Either twin may start a hunt',
      'One twin is slow, the other is fast'
    ],
    weaknesses: [
      'Will often interact with the environment at the same time, but usually in different places'
    ]
  },
  {
    name: 'Wraith',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.EMFLevelFive,
      Evidence.SpiritBox
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Cannot be tracked by footsteps',
      'Occasionally teleports to a random player'
    ],
    weaknesses: [
      'Will not step in salt'
    ]
  },
  {
    name: 'Yokai',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.GhostOrb,
      Evidence.SpiritBox
    ],
    guaranteedEvidence: null,
    sanity: 80,
    strengths: [
      'Talking near it will increase chance of attack'
    ],
    weaknesses: [
      'Can only hear voices close to it during a hunt'
    ]
  },
  {
    name: 'Yurei',
    evidences: [
      Evidence.DOTSProjector,
      Evidence.FreezingTemperatures,
      Evidence.GhostOrb
    ],
    guaranteedEvidence: null,
    sanity: 50,
    strengths: [
      'Has a stronger effect on sanity'
    ],
    weaknesses: [
      'Smudging will reduce how often it wanders',
      'Using its ability causes it to shut doors'
    ]
  }
]
