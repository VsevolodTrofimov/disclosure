import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import copy from 'rollup-plugin-copy'

export default {
    input: './src/index.ts',
    plugins: [
        resolve({
            extensions: ['.ts'],
        }),
        babel({
            extensions: ['.ts']
        }),
        copy({
            [__dirname + '/dist/index.d.ts']: __dirname + '/dist/index.esm.d.ts'
        })
    ],
    output: [{
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
    }, {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
    }],
}