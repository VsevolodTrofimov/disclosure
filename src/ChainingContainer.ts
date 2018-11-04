import { Assign } from 'utility-types'
import { Container, Item, ItemFactory, Items, ItemType, Key } from './types'


export interface Binder<Config extends object, Id extends Key> {
    toValue: <Type>(
        value: Type
    ) => ChainingContainer<Assign<Config, { [K in Id]: Type }>>

    toFactory: <Return>(
        di: ItemFactory<Return>
    ) => ChainingContainer<Assign<Config, { [K in Id]: Return }>>
}


export class ChainingContainer<Config extends object> implements Container<Config> {
    // Config is public so error messages are more straightforward
    public config: Config = undefined as any


    // This is where all the work happens
    // real container content w/ resolve information
    private items: Items = {}

    // last key for binder & as signleton to use
    private lastKey: Key = ''

    // part of the chain that actually binds values by resetting, reused across bind calls
    private binder: Binder<Config, ''> = {
        toValue: (value) => {
            this.items[this.lastKey] = {
                type: ItemType.value,
                value
            }
            return this as any
        },

        toFactory: (factory) => {
            this.items[this.lastKey] = factory
            return this as any
        }
    }

    public bind = <Id extends Key>(id: Id) => {
        this.lastKey = id
        return this.binder as any as Binder<Config, Id>
    }

    public bindMore = <Id extends Key, T extends Id extends keyof Config ? Config[Id] : any>(id: Id, value: T) => {
        type NewConfig = Assign<Config, { [K in Id]: T[] }>

        // for some reason doing this on an object field doesn't trigger type guard
        const items = this.items[id]
        if (Array.isArray(items)) {
            items.push(value)
        } else {
            this.items[id] = value
        }

        return this as unknown as ChainingContainer<NewConfig>
    }


    public get<Id extends keyof Config>(id: Id): Config[Id] {
        // Typescript still lacks support for symbol indexing
        const item: Items[''] = (this.items as any)[id]

        if (Array.isArray(item)) {
            return item.map(this.makeInstance) as any as Config[Id]
        } else {
            return this.makeInstance<Config[Id]>(item as any)
        }
    }

    private makeInstance<T>(item: Item<T>) {
        switch (item.type) {
            case ItemType.factory: return item.factory(this)
            case ItemType.value: return item.value
        }
    }
}
