import packageMetadata from './package.json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import { babel } from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import bundleSize from 'rollup-plugin-bundle-size';
// import analyze from 'rollup-plugin-analyzer';

export default {
  input: 'src/index.js',
  output: [
    {
      file: packageMetadata.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageMetadata.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['framer-motion', 'rxjs', 'rxjs/operators', 'rxjs-hooks'],
  plugins: [
    peerDepsExternal(),
    resolve(),
    postcss(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    terser(),
    bundleSize(),
    // analyze(),
  ],
};
