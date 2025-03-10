import js from '@eslint/js';
import ts from 'typescript-eslint';
import jest from 'eslint-plugin-jest';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default ts.config(
  {
    ignores: ['build/**'],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  jest.configs['flat/recommended'],
  prettierRecommended,
  {
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'prefer-const': 'off',
    },
  },
);
