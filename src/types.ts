export interface Container<Config extends object> {
    // Config is public so error messages are more straightforward
    config: Config
    get<Id extends keyof Config>(id: Id): Config[Id]
}


export enum ItemType {
    factory,
    value
}

export interface ItemFactory<T> {
    type: ItemType.factory
    factory: (container: any) => T
}

export interface ItemValue<T> {
    type: ItemType.value
    value: T
}

export type Item<T> = ItemValue<T> | ItemFactory<T>

export interface Items {
    [key: string]: Item<unknown> | Array<Item<unknown>>
    [key: number]: Item<unknown> | Array<Item<unknown>>
}


export type Key = string | number
