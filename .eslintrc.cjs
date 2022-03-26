module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'eslint:recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    'import/extensions': [
      'off',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-dynamic-require': 0,
    'import/no-unresolved': 'off',
    'global-require': 0,
    'import/prefer-default-export': 0,
    'no-unused-vars': 'off',
    'no-underscore-dangle': 0,
    'no-await-in-loop': 0,
    'no-restricted-syntax': 0,
    'no-return-await': 0,
    'no-console': 0,
    'prettier/prettier': 'error',
  },
};
