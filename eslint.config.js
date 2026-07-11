// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config'
import * as config from '@lvce-editor/eslint-config'

export default defineConfig([...config.default, globalIgnores(['**/*.js', '**/*.cjs', '**/*.mjs'])])

// export default [
//   ...config.default,
//   {
//     rules: {
//       '@typescript-eslint/prefer-readonly-parameter-types': 'off',
//       'prefer-destructuring': 'off',
//       '@cspell/spellchecker': 'off',
//     },
//   },
// ]
