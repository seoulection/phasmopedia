import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css|png?$': '<rootDir>/__mocks__/mock.ts'
  },
  testPathIgnorePatterns: ['/node_modules/', '<rootDir>/src/__tests__/helpers.ts'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true
}

export default config
