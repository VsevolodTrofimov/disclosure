import * as fs from 'fs'

const indent = '    '

const fileStart = `import { Container, Factory } from './types'

export default class DI<Config> {

`
const fileEnd = `
    public makeFactory(...args: any): Factory<any> {
        const hook = args.pop()
        const ids = args

        return {
            type: 'factory',
            factory(container: Container<any>) {
                const hookArgs = ids.map((id: any) => container.get(id))
                return hook(...hookArgs)
            }
        }
    }

}
`

const declStart = `public makeFactory<\n`
const idGeneric = (i: number) => `Id${i} extends keyof Config,\n`
const genericEnd = 'HookReturn\n>(\n'
const idArgBody = (i: number) => `id${i}: Id${i},\n`
const hookStart = `hook: (\n`
const hookArg = (i: number) => `value${i}: Config[Id${i}],\n`
const hookEnd = `) => HookReturn\n`
const declEnd = `): Factory<HookReturn>`


const createDeclFor = (n: number) => {
    let decl = declStart
    for (let i = 1; i <= n; ++i) { decl += indent + idGeneric(i) }
    decl += indent + genericEnd
    for (let i = 1; i <= n; ++i) { decl += indent + idArgBody(i) }
    decl += indent + hookStart
    for (let i = 1; i <= n; ++i) { decl += indent + indent + hookArg(i) }
    decl += indent + hookEnd
    decl += declEnd
    return decl
}

const createTypings = (n: number) => {
    let typings = fileStart
    for (let i = 1; i <= n; ++i) {
        typings += indent + createDeclFor(i).replace(/\n/g, '\n' + indent) + '\n\n'
    }
    typings += fileEnd
    return typings
}

// File generation
const upTo = parseInt(process.argv[2], 10)
const declarations = createTypings(upTo)
const filename = __dirname + '/../src/di.ts'

fs.writeFileSync(filename, declarations)
