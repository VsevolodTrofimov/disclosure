import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'


export default {
    input: './src/index.ts',
    plugins: [
        resolve({
            extensions: ['.ts'],
        }),
        babel({
            extensions: ['.ts']
        }),
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