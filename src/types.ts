export interface Container<Config extends object> {
    // Config is public so error messages are more straightforward
    config: Config
    get<Id extends keyof Config>(id: Id): Config[Id]
}

export interface Factory<T> {
    type: 'factory'
    factory: (container: any) => T
}

export interface Value<T> {
    type: 'value'
    value: T
}

export interface Many<T> {
    type: 'many'
    base: Value<T[]> | Factory<T[]>
    rest: Array<DisclosureItem<T>>
}

export type DisclosureItem<T> = Value<T> | Factory<T> | Many<T>


export interface Items {
    [key: string]: DisclosureItem<unknown>
    [key: number]: DisclosureItem<unknown>
}


export type Key = string | number


// we can't trigger custom typeerrors so we'll do this
// tslint:disable-next-line:no-empty-interface
export interface ContainerСorruptBy<T extends string> { }
