import { DITools } from '../src/DITools'
import { Container } from '../src/types'


interface Config {
    num: number
    magic: { magic: boolean }
}

describe('DITools', () => {
    const tools = new DITools<Config>()
    const di = tools.makeFactory
    const magic = Object.freeze({ magic: true })
    const container: Container<Config> = {
        config: {} as any as Config,
        get(id) {
            if (id === 'magic') { return magic }
            return 10
        }
    }

    describe('MakeFactory', () => {

        it('Passes values to the hook', () => {
            const add10 = di('num', (num) => num + 10)

            expect(add10.factory(container)).toBe(20)
        })

        it('Passes values directly', () => {
            const magical = di('magic', (x) => x)

            expect(magical.factory(container)).toBe(magic)
        })

        it('has signature for 20 dependencies', () => {
            const fItem = di(
                'num', 'num', 'magic', 'magic',
                'num', 'num', 'magic', 'magic',
                'num', 'num', 'magic', 'magic',
                'num', 'num', 'magic', 'magic',
                'num', 'num', 'magic', 'magic',
                () => 42
            )

            expect(fItem.factory(container)).toBe(42)
        })
    })
})
