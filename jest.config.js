module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  collectCoverageFrom: [
    'src/**.ts',
    '!src/index.ts', // checked by dist test
  ]
};