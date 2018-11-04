export interface Container<Config extends object> {
    // Config is public so error messages are more straightforward
    config: Config
    get<Id extends keyof Config>(id: Id): Config[Id]
}


export enum DisclosureItemType {
    factory,
    value
}

export interface DisclosureItemFactory<T> {
    type: DisclosureItemType.factory
    factory: (container: any) => T
}

export interface DisclosureItemValue<T> {
    type: DisclosureItemType.value
    value: T
}

export type Item<T> = DisclosureItemValue<T> | DisclosureItemFactory<T>

export interface Items {
    [key: string]: Item<unknown> | Array<Item<unknown>>
    [key: number]: Item<unknown> | Array<Item<unknown>>
}


export type Key = string | number


// we can't trigger custom typeerrors so we'll do this
// tslint:disable-next-line:no-empty-interface
export interface ContainerСorruptBy<T extends string> { }
