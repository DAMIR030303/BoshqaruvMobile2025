module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:react-hooks/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint','unused-imports','import'],
  env: {
    jest: true,
    node: true,
  },
  globals: {
    jest: 'readonly',
  },
  rules: {
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'import/order': ['error', { 'newlines-between': 'always', alphabetize: { order: 'asc' } }]
  }
}
