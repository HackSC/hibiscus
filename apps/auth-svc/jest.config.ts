/* eslint-disable */
export default {
  displayName: 'auth-svc',
  // preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  transform: {
    // '^.+\\.[tj]s$': 'babel-jest',
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  // transformIgnorePatterns: ['/node_modules/(?!lucia/)'],
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/auth-svc/dist',
};
