import { ChainingContainer } from '../src/ChainingContainer'
import { DITools } from '../src/DITools'
import { Container } from '../src/types'


describe('ChainingContainer', () => {

    it('supports value binding', () => {
        const container = new ChainingContainer().bind('str').toValue('it works')
        expect(container.get('str')).toBe('it works')
    })

    it('supports factory binding', () => {
        interface Config {
            str: string,
            strPlus: string,
            strDeep: string
        }
        const di = new DITools<Config>().makeFactory

        const container: Container<Config> = new ChainingContainer()
            .bind('str').toValue('it works')
            .bind('strPlus').toFactory(di('str', (str) => str + ' properly'))
            .bind('strDeep').toFactory(di('strPlus', (str) => 'usually ' + str))

        expect(container.get('str')).toBe('it works')
        expect(container.get('strPlus')).toBe('it works properly')
        expect(container.get('strDeep')).toBe('usually it works properly')
    })

    it('supports binding more', () => {
        interface Config {
            num: number,
            nums: number[]
        }
        const di = new DITools<Config>().makeFactory

        const makeHook = () => {
            let counter = 0
            return (num: number) => num + (++counter)
        }
        const factory = di('num', makeHook())
        const factory2 = di('num', makeHook())

        const container: Container<Config> = new ChainingContainer()
            .bind('num').toValue(10)
            .bind('nums').toValue([1, 2, 3])
            .bindMore('nums').toValue(4)
            .bindMore('nums').toFactory(factory2)
            .bindMore('nums').toFactory(factory).asSingleton()
            .bindMore('nums').toFactory(factory2)

        expect(container.get('nums')).toEqual([1, 2, 3, 4, 11, 11, 12])
        expect(container.get('nums')).toEqual([1, 2, 3, 4, 13, 11, 14])
        expect(container.get('nums')).toEqual([1, 2, 3, 4, 15, 11, 16])
    })

    it('supports binding singletons', () => {
        interface Config {
            isMagical: boolean
            magic: object
        }
        const di = new DITools<Config>().makeFactory
        const factory = di('isMagical', (is) => ({ magic: is }))

        // singletons should not be order dependent, just as any other factories
        const container: Container<Config> = new ChainingContainer()
            .bind('isMagical').toValue(false)
            .bind('magic').toFactory(factory).asSingleton()

        const initial = container.get('magic')
        expect(container.get('magic')).toBe(initial)
        expect(container.get('magic')).toBe(initial)
    })

    it('has lazy factories', () => {
        interface Config {
            str: string,
            strPlus: string,
            strDeep: string
        }
        const di = new DITools<Config>().makeFactory

        const container: Container<Config> = new ChainingContainer()
            .bind('strDeep').toFactory(di('strPlus', (str) => 'usually ' + str))
            .bind('strPlus').toFactory(di('str', (str) => str + ' properly'))
            .bind('str').toValue('it works')

        expect(container.get('str')).toBe('it works')
        expect(container.get('strPlus')).toBe('it works properly')
        expect(container.get('strDeep')).toBe('usually it works properly')
    })

    it('has lazy singleton bindings', () => {
        interface Config {
            isMagical: boolean
            magic: object
        }
        const di = new DITools<Config>().makeFactory
        const factory = di('isMagical', (is) => ({ magic: is }))

        // singletons should not be order dependent, just as any other factories
        const container: Container<Config> = new ChainingContainer()
            .bind('magic').toFactory(factory).asSingleton()
            .bind('isMagical').toValue(false)

        const initial = container.get('magic')
        expect(container.get('magic')).toBe(initial)
        expect(container.get('magic')).toBe(initial)
    })
})
