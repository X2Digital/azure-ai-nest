import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import x2dEslintConfig from '@x2d/eslint-config';

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),
  { files: ['**/*.{js,mjs,cjs,ts}'], extends: [x2dEslintConfig] },
  { files: ['**/*.{js,mjs,cjs,ts}'], plugins: { js }, extends: ['js/recommended'] },
  { files: ['**/*.{js,mjs,cjs,ts}'], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
]);
