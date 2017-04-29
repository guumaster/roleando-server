module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: [ 'eslint:recommended', 'standard' ],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  rules: {
    'no-console': 0,
    'prefer-const': 2
  },
  globals: {}
}
