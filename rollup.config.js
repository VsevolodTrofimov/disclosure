import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import copy from 'rollup-plugin-copy'


export default {
    input: './src/index.ts',
    plugins: [
        resolve({
            extensions: ['.ts', '.js', '.json'],
        }),
        babel({
            extensions: ['.js', '.ts']
        }),
        copy({
            'src/di/index.d.ts': 'dist/di/index.d.ts'
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