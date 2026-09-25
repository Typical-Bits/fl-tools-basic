import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] },
  },
  { ignores: ['dist/**', 'live-test/*.user.js', 'FL-Tools-*.user.js', 'node_modules/**'] },
];
