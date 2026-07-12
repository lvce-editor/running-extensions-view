import pluginTypeScript from '@babel/preset-typescript'
import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { join } from 'path'
import { rollup, type RollupOptions } from 'rollup'
import { root } from './root.ts'

const options: RollupOptions = {
  input: join(root, 'packages/running-extensions-view/src/runningExtensionsViewMain.ts'),
  preserveEntrySignatures: 'strict',
  treeshake: {
    propertyReadSideEffects: false,
  },
  output: {
    file: join(root, '.tmp/dist/dist/runningExtensionsViewMain.js'),
    format: 'es',
    freeze: false,
    generatedCode: {
      constBindings: true,
      objectShorthand: true,
    },
  },
  external: ['electron', 'ws'],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      presets: [pluginTypeScript],
    }),
    nodeResolve(),
  ],
}

export const bundleJs = async (): Promise<void> => {
  const input = await rollup(options)
  if (Array.isArray(options.output)) {
    for (const output of options.output) {
      await input.write(output)
    }
  } else if (options.output) {
    await input.write(options.output)
  }
}
