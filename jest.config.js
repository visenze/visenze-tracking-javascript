const config = {
  verbose: true,
  testMatch: ['<rootDir>/test/**'],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '(.+)\\.js': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
};

module.exports = config;
