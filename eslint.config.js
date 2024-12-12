import globals from 'globals';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      // Add other ESLint rules here
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
    },
    ignores: [
      'node_modules',
      'dist',
      'build',
      '.env',
      'logs',
      'hedera-app-notes.docx',
      '~$dera-app-notes.docx',
    ],
  },
  eslintConfigPrettier,
];
