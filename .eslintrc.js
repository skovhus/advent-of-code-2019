module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['jest', '@typescript-eslint', 'simple-import-sort', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
  ],
  env: {
    node: true,
    es6: true,
  },
  root: true,
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 90,
        semi: false,
        tabWidth: 2,
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        ignoreRestSiblings: true,
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        array: false,
        object: true,
      },
    ],
    'prefer-const': 'error',
    'prefer-template': 'error',
    'simple-import-sort/sort': 'error',
    'no-console': 'off',
    'no-unused-vars': 'off', // replaced by @typescript-eslint/no-unused-vars
  },
}
