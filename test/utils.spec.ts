import { Container, Factory, Many, Value } from '../src/types'
import { ensureManyItem, makeInstanceCreator, makeSingleton, makeValueItem, once, toClass } from '../src/utils'

describe('Utils', () => {
    const magic = Object.freeze({ magic: true })

    const vItem: Value<typeof magic> = {
        type: 'value',
        value: magic
    }

    const fItem: Factory<typeof magic> = {
        type: 'factory',
        factory: () => magic
    }

    const mItem: Many<typeof magic> = {
        type: 'many',
        base: makeValueItem([magic]),
        rest: []
    }

    interface Config {
        num: number
    }

    const container: Container<Config> = {
        config: {} as any as Config,
        get() {
            return 10
        }
    }

    Object.freeze(mItem)
    Object.freeze(fItem)
    Object.freeze(vItem)
    Object.freeze(container)


    describe('once', () => {
        it('returns function`s first result', () => {
            const f = jest.fn().mockReturnValueOnce(magic)
            const fOnce = once(f)

            expect(fOnce()).toBe(magic)
        })

        it('Passes arguments to wrapped function', () => {
            const f = (x: number) => x + 10
            const fOnce = once(f)

            expect(fOnce(10)).toBe(20)
        })

        it('Only runs function once', () => {
            const f = jest.fn().mockImplementation((x: number) => x + 10)
            const fOnce = once(f)

            expect(fOnce(10)).toBe(20)
            expect(fOnce(100)).toBe(20)
            expect(fOnce('wtf')).toBe(20)

            expect(f).toBeCalledTimes(1)
        })
    })

    describe('makeValueItem', () => {
        it('Creates a valid value item with given value', () => {
            expect(vItem.type).toBe('value')
            expect(vItem.value).toBe(magic)
        })
    })

    describe('makeValueItem', () => {
        it('Creates a valid value item with given value', () => {
            expect(vItem.type).toBe('value')
            expect(vItem.value).toBe(magic)
        })
    })

    describe('ensureManyItem', () => {
        it('Returns many item as is', () => {
            expect(ensureManyItem(mItem)).toBe(mItem)
        })

        it('Converts other items into ManyItem', () => {
            const fItemArr: Factory<Array<typeof magic>> = {
                type: 'factory',
                factory: () => [magic]
            }

            const vItemArr: Value<Array<typeof magic>> = {
                type: 'value',
                value: [magic]
            }

            expect(ensureManyItem(vItemArr).type).toBe('many')
            expect(ensureManyItem(vItemArr).base).toBe(vItemArr)
            expect(ensureManyItem(vItemArr).rest).toEqual([])

            expect(ensureManyItem(fItemArr).type).toBe('many')
            expect(ensureManyItem(fItemArr).base).toBe(fItemArr)
            expect(ensureManyItem(fItemArr).rest).toEqual([])
        })
    })

    describe('makeInstanceCreator', () => {
        it('Creates from value', () => {
            const ic = makeInstanceCreator(container)
            expect(ic(vItem)).toBe(magic)
        })

        it('Creates factory', () => {
            const ic = makeInstanceCreator(container)
            const add10: Factory<number> = {
                type: 'factory',
                factory: (cont: Container<Config>) => cont.get('num') + 10
            }

            expect(ic(fItem)).toBe(magic)
            expect(ic(add10)).toBe(20)
        })

        it('Creates many', () => {
            const ic = makeInstanceCreator(container)
            const add10n20: Factory<number[]> = {
                type: 'factory',
                factory: (cont: Container<Config>) => [cont.get('num') + 10, cont.get('num') + 20]
            }
            const numMany: Many<number> = {
                type: 'many',
                base: add10n20,
                rest: [{
                    type: 'value',
                    value: 15
                }, {
                    type: 'factory',
                    factory: (cont: Container<Config>) => cont.get('num') + 15
                }]
            }

            expect(ic(numMany)).toEqual([20, 30, 15, 25])
        })
    })

    describe('makeSingleton', () => {
        it('Returns Value and Many items as is', () => {
            expect(makeSingleton(vItem)).toBe(vItem)
            expect(makeSingleton(mItem)).toBe(mItem)
        })

        it('Makes factories run once, without mutating them', () => {
            const getNum = jest.fn().mockImplementation((cont: Container<Config>) => cont.get('num'))
            const fact: Factory<number> = {
                type: 'factory',
                factory: getNum
            }
            Object.freeze(fact)

            const singleFactory = makeSingleton(fact) as Factory<number>

            expect(singleFactory.factory(container)).toBe(container.get('num'))
            expect(singleFactory.factory(container)).toBe(container.get('num'))
            expect(singleFactory.factory(container)).toBe(container.get('num'))

            expect(getNum).toHaveBeenCalledTimes(1)
        })
    })

    describe('toClass', () => {
        it('Converts class into a factory that creates it`s instance', () => {
            class Adder {
                constructor(private a: number, private b: number) { }
                public sum = () => this.a + this.b
            }

            const factoryHook = toClass(Adder)

            expect(factoryHook(5, 4).sum()).toBe(9)
        })
    })
})
