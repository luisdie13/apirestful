module.exports = {
  // Jest will look for test files in the `tests` directory
  roots: ['<rootDir>/tests'],
  // This tells Jest to use Babel to transform any JavaScript files
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  // Ensure Jest doesn't ignore our project files in `node_modules`
  // for transformation
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  // The test environment to use for the tests
  testEnvironment: 'node',
};