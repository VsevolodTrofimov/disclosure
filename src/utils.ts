import {
    Container,
    DisclosureItem,
    Factory,
    Many,
    Value,
} from './types'

export function once<Args extends any[], Return>(f: (...args: Args) => Return) {
    let called = false
    let result: Return

    return function(this: unknown, ...args: Args) {
        if (!called) {
            result = f.apply(this, args)
            called = true
        }

        return result
    }
}

export const makeValueItem = <T>(source: T): Value<T> => ({
    type: 'value',
    value: source
})

export const ensureManyItem = <T>(item: Value<T[]> | Factory<T[]> | Many<T>): Many<T> => {
    if (item.type === 'many') { return item }

    return {
        type: 'many',
        base: item,
        rest: []
    }
}

export const makeInstanceCreator = <C extends object>(container: Container<C>) => {
    const create = <T>(item: DisclosureItem<T>) => {
        switch (item.type) {
            case 'factory': return item.factory(container)
            case 'value': return item.value
            case 'many':
                const base = create(item.base) as T[]
                const rest = item.rest.map(create) as T[]
                return base.concat(rest)
        }
    }

    return create
}

export const makeSingleton = <T>(item: DisclosureItem<T>) => {
    switch (item.type) {
        case 'factory':
            const onceFactory: Factory<T> = {
                ...item,
                factory: once(item.factory)
            }
            return onceFactory
        case 'value': return item
        // this is unsupported right now impossible though
        case 'many': return item
    }
}

export const toClass = <Args extends any[], R>(Cls: new (...args: Args) => R) => (...args: Args) => new Cls(...args)
