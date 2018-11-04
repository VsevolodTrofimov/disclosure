import { Assign } from 'utility-types'
import { Container, ContainerСorruptBy, DisclosureItemFactory, DisclosureItemType, Item, Items, Key } from './types'
import { once } from './utils'


export interface Binder<Config extends object, Id extends Key> {
    toValue: <Type>(
        value: Type
    ) => ChainingContainer<Assign<Config, { [K in Id]: Type }>>

    toFactory: <Return>(
        di: DisclosureItemFactory<Return>
    ) => ChainingContainer<Assign<Config, { [K in Id]: Return }>>
}


export interface Adder<Config extends object, Id extends Key> {
    toValue: <
        Type extends (
            Id extends keyof Config
            ? (Config[Id] extends any[] ? Config[Id] : never)
            : any
        ) >(
        value: Type[0]
    ) => Id extends keyof Config
        ? ChainingContainer<Config>
        : ContainerСorruptBy<'Using bindMore with a key that doesn`t exit'>

    toFactory: <
        Return extends (
            Id extends keyof Config
            ? (Config[Id] extends any[] ? Config[Id] : never)
            : any // for some strange reason all other types cannot be indexed
        ) >(
        di: DisclosureItemFactory<Return[0]>
    ) => Id extends keyof Config
        ? ChainingContainer<Config>
        : ContainerСorruptBy<'Using bindMore with a key that doesn`t exit'>
}


export class ChainingContainer<Config extends object> implements Container<Config> {
    // Config is public so error messages are more straightforward
    public config: Config = undefined as any


    // This is where all the work happens
    // real container content with item type resolution information
    private items: Items = {}

    // last key for binder, adder & as signleton to use (required to provide efficient chainig api)
    private lastKey: Key = ''

    // part of the chain that binds values by resetting, reused across bind calls
    private binder: Binder<Config, ''> = {
        toValue: (value) => {
            this.items[this.lastKey] = {
                type: DisclosureItemType.value,
                value
            }
            return this as any
        },

        toFactory: (factory) => {
            this.items[this.lastKey] = factory
            return this as any
        }
    }

    // part of the chain that binds values by adding more to an array, reused across bindMore calls
    private adder: Adder<Config, ''> = {
        toValue: (value) => {
            console.log(this.getItemArr(), this.lastKey)
            this.getItemArr().push({
                type: DisclosureItemType.value,
                value
            })
            return this as any
        },

        toFactory: (factory) => {
            console.log(this.getItemArr(), this.lastKey)
            this.getItemArr().push(factory)
            return this as any
        }
    }

    public asSignleton() {
        const item = this.items[this.lastKey]

        if (Array.isArray(item)) {
            item[item.length - 1] = this.makeSingleton(item[item.length - 1])
        } else {
            this.items[this.lastKey] = this.makeSingleton(item)
        }

        return this
    }

    public bind<Id extends Key>(id: Id) {
        this.lastKey = id
        return this.binder as any as Binder<Config, Id>
    }

    public bindMore<Id extends Key>(id: Id) {
        this.lastKey = id
        return this.adder as any as Adder<Config, Id>
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

    private makeInstance = <T>(item: Item<T>) => {
        switch (item.type) {
            case DisclosureItemType.factory: return item.factory(this)
            case DisclosureItemType.value: return item.value
        }
    }

    private makeSingleton = <T>(item: Item<T>) => {
        switch (item.type) {
            case DisclosureItemType.factory:
                return {
                    ...item,
                    factory: once(item.factory)
                }
            case DisclosureItemType.value: return item
        }
    }

    // used by adder
    private getItemArr = () => {
        const item = this.items[this.lastKey]
        if (Array.isArray(item)) { return item }

        // convert into array of identifiers
        const arr: Array<Item<unknown>> = []
        this.items[this.lastKey] = arr
        return arr
    }
}
