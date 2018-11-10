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
            result = f.apply(this, arguments)
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
