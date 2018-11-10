import { Assign } from 'utility-types'
import {
    Container,
    DisclosureItem,
    Factory,
    Items,
    Key,
} from './types'
import { ensureManyItem, makeInstanceCreator, makeValueItem, once } from './utils'


export interface Binder<Config extends object, Id extends Key> {
    toValue: <Type>(
        value: Type
    ) => ChainingContainer<Assign<Config, { [K in Id]: Type }>>

    toFactory: <Return>(
        di: Factory<Return>
    ) => ChainingContainer<Assign<Config, { [K in Id]: Return }>>
}


export interface Adder<Config extends object, Id extends keyof Config> {
    toValue: <Type extends Config[Id] extends any[] ? Config[Id] : never> (
        value: Type[0]
    ) => ChainingContainer<Config>

    toFactory: <Return extends Config[Id] extends any[] ? Config[Id] : never> (
        di: Factory<Return[0]>
    ) => ChainingContainer<Config>
}

export class ChainingContainer<Config extends {}> implements Container<Config> {
    // Config is public so error messages are more straightforward
    public config: Config = undefined as any

    // binds last value as singleton
    public asSignleton() {
        const item = this.items[this.lastKey]

        if (item.type === 'many') {
            const end = item.rest.length - 1
            item.rest[end] = this.makeSingleton(item.rest[end])
        } else {
            this.items[this.lastKey] = this.makeSingleton(item)
        }

        return this
    }

    // returns a typed binder
    public bind<Id extends Key>(id: Id) {
        this.lastKey = id
        return this.binder as any as Binder<Config, Id>
    }

    // returns a typed adder
    public bindMore<Id extends keyof Config>(id: Id) {
        this.lastKey = id as Key
        return this.adder as any as Adder<Config, Id>
    }

    // returns final value for the given id
    public get<Id extends keyof Config>(id: Id): Config[Id] {
        // Typescript still lacks support for symbol indexing
        const item: Items[''] = (this.items as any)[id]
        return this.makeInstance(item) as Config[Id]
    }

    // This is where all the work happens
    // real container content with item type resolution information
    private items: Items = {}

    // last key for binder, adder & as signleton to use (required to provide efficient chainig api)
    private lastKey: Key = ''

    // part of the chain that binds values by resetting, reused across bind calls
    private binder: Binder<Config, never> = {
        toValue: (value) => {
            this.items[this.lastKey] = makeValueItem(value)
            return this as any
        },

        toFactory: (factory) => {
            this.items[this.lastKey] = factory
            return this as any
        }
    }

    // part of the chain that binds values by adding more to an array, reused across bindMore calls
    private adder: Adder<Config, never> = {
        toValue: (value) => {
            this.ensureLastMany().rest.push(makeValueItem(value))
            return this as any
        },

        toFactory: (factory) => {
            this.ensureLastMany().rest.push(factory)
            return this as any
        }
    }

    // Creates final values that are returned by get
    private makeInstance = makeInstanceCreator(this)

    // ensures that given value will be a singleton
    private makeSingleton = <T>(item: DisclosureItem<T>) => {
        switch (item.type) {
            case 'factory':
                const onceFactory: Factory<T> = {
                    ...item,
                    factory: once(item.factory)
                }
                return onceFactory
            case 'value': return item
            // this should impossible though
            case 'many': return item
        }
    }

    // used by adder, ensures that this.items[this.lastKey] is of type Many
    private ensureLastMany = () => {
        // this should only happen for items, that return array
        const item = ensureManyItem(this.items[this.lastKey] as any)

        this.items[this.lastKey] = item
        return item
    }
}
