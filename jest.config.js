module.exports = {
  cacheDirectory: 'node_modules/.jest-cache',
  setupFiles: [],
  testMatch: [
    '<rootDir>/test/**/?(*.)(spec|test).{js,jsx,mjs}',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/lib'],
  moduleFileExtensions: [
    'web.js',
    'mjs',
    'js',
    'json',
    'web.jsx',
    'jsx',
    'node',
  ],
};
