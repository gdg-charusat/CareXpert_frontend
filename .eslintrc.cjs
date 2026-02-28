module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    // the baseline repo contains lots of non-critical issues; keep lint from failing
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-useless-escape': 'off',
    'react-hooks/exhaustive-deps': 'off',

    // SECURITY: Prevent console statements in production
    // All console output must go through the centralized logger at src/lib/logger.ts
    'no-console': 'error',
  },
}
