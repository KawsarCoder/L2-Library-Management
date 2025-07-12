// eslint.config.mjs

import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignores: ['node_modules', 'dist'],
  files: ['**/*.ts'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      sourceType: 'module',
      project: './tsconfig.json',
    },
  },
  rules: {
    'no-console': 'warn',
  },
});
