import * as fs from 'fs'
import { dirname } from 'path'

const fileStart = `import { Container, Factory, ItemType } from '../types'\n\n`
const fileEnd = `\n`

const declStart = `export function di<Config extends object>(): <`
const idGeneric = (i: number) => `Id${i} extends keyof Config,\n`
const genericEnd = 'HookReturn\n>('
const idArgBody = (i: number) => `id${i}: Id${i},`
const hookStart = `hook: (`
const hookArg = (i: number) => `value${i}: Config[Id${i}],`
const hookEnd = `) => HookReturn`
const declEnd = `) => Factory<HookReturn>`


const createDeclFor = (n: number) => {
    let decl = declStart
    for (let i = 0; i < n; ++i) { decl += idGeneric(i) }
    decl += genericEnd
    for (let i = 0; i < n; ++i) { decl += idArgBody(i) }
    decl += hookStart
    for (let i = 0; i < n; ++i) { decl += hookArg(i) }
    decl += hookEnd
    decl += declEnd
    return decl
}

const createTypings = (n: number) => {
    let typings = fileStart
    for (let i = 0; i < n; ++i) { typings += createDeclFor(i) }
    typings += fileEnd
    return typings
}

// File generation
const declarations = createTypings(parseInt(process.argv[0], 10))
const filename = __dirname + '/src/di/index.d.ts'

fs.writeFileSync(filename, declarations)
