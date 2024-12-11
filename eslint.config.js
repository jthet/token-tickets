import globals from 'globals'
import eslintPluginPrettier from 'eslint-plugin-prettier'

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
]