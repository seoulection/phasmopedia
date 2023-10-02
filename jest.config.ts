import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.css|png?$': '<rootDir>/__mocks__/mock.ts',
    '@/(.*)$': '<rootDir>/src/$1',
    '@static/(.*)$': '<rootDir>/static/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/src/__tests__/test-utils.tsx',
  ],
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
}

export default config
