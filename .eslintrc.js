module.exports = {
  extends: ['mantine'],
  rules: {
    'react/jsx-pascal-case': 'off',
    'newline-per-chained-call': 'off',
    'import/extensions': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/self-closing-comp': 'off',
    'react/jsx-closing-bracket-location': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    'no-restricted-syntax': 'off',
  },
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
};
