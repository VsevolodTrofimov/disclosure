
import * as Build from '..'
import { Container } from '..'
import * as cjs from '../dist/index'
import * as esm from '../dist/index.esm'

describe('Package', () => {
    it('Includes working cjs build', () => {
        const container: Container<FinalConfig> = basicTest(cjs)
        expect(container).toBeDefined()
    })

    it('Includes working esm build', () => {
        const container: Container<FinalConfig> = basicTest(esm as any)
        expect(container).toBeDefined()
    })
})

interface FinalConfig {
    num: number,
    str: string,
    numF: number
}

function basicTest(build: typeof Build) {
    expect(build.ChainingContainer).toBeDefined()
    expect(build.DITools).toBeDefined()

    const makeFactory = new build.DITools<{ num: number }>().makeFactory

    const cont = new build.ChainingContainer()
        .bind('num').toValue(10)
        .bind('str').toValue('wow')
        .bind('num').toValue(20)
        .bind('numF').toFactory(makeFactory('num', (x) => x * 10))

    expect(cont.get('num')).toBe(20)
    expect(cont.get('numF')).toBe(200)
    expect(cont.get('str')).toBe('wow')

    return cont
}
