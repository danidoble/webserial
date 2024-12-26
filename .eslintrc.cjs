module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    files: ['**/*.{js,jsx,cjs,mjs}'],
  settings: {
      'eslint/report-unused-disable-directives': 'error',
  },
  plugins: [],
  rules: {
      'no-unused-vars': 'error', // Opcional, para reforzar reglas específicas
      'no-undef': 'error',
      'no-unused-expressions': 'error',
      'no-unused-labels': 'error',
  },
    reportUnusedDisableDirectives: true,
    maxWarnings: 0,
}
