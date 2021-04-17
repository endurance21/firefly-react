import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import generatePackageJson from 'rollup-plugin-generate-package-json'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'
export default {
  input: 'src/index.tsx',
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: 'esm',

    }
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    sass(),
    typescript(),
    babel({
      extensions: ['.jsx', '.js', '.tsx'],
      exclude: 'node_modules/*'
    }),
    generatePackageJson({
      outputFolder: 'dist',
      baseContents: (pkg) => ({
        name: pkg.name,
        main: 'index.js',

      })
    }),
  ],

}