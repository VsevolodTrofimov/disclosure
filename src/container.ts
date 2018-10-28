import { Assign } from 'utility-types'


export const isFactory = Symbol('isFactory')

export interface Container<Config> {
    config: Config
    items: any,
    set: (kv: object) => void
    get<Id extends keyof Config>(id: Id): Config[Id]
}


export const bind = <KV extends object>(kv: KV) => <Config extends object>(container: Container<Config>) => {
    type NewConfig = Assign<Config, KV>

    container.set(kv)

    return container as Container<NewConfig>
}


export const bindFactory = <KV extends object, R>(kv: KV, di: {
    [isFactory]: boolean,
    factory: (...args: any[]) => R
}) => <Config extends object>(container: Container<Config>) => {
    type NewConfig = Assign<Config, { [key in keyof KV]: R }>

    container.set({
        [Object.keys(kv)[0]]: di
    })

    return container as Container<NewConfig>
}


export const create = (): Container<{}> => {
    const items = {}
    const container = {
        config: {},
        items,
        set: (kv: any) => Object.assign(items, kv),
        get: (id: any) => {
            const item = (items as any)[id]

            if (typeof item === 'object' && item[isFactory]) {
                return (item as any).factory(container)
            }

            return item
        }
    }

    return container
}


export const merge = <Config1 extends object, Config2 extends object>(
    container1: Container<Config1>,
    container2: Container<Config2>
) => {
    type NewConfig = Assign<Config1, Config2>

    const container = create()
    container.set(container1.items)
    container.set(container2.items)

    return container as Container<NewConfig>
}

export const add = <Config1 extends object>(
    container1: () => Container<Config1>,
) => <Config2 extends object>(
    container2: Container<Config2>
) => {
        type NewConfig = Assign<Config1, Config2>

        const container = create()
        container.set(container2.items)
        container.set(container1().items)

        return container as Container<NewConfig>
    }
