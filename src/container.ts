import { Assign } from 'utility-types'

export const isFactory = Symbol('isFactory')

export interface Factory<T> {
    [isFactory]: boolean,
    type: T,
    factory: (...args: any[]) => T
}

export class Container<Config extends object> {
    public config: Config = undefined as any

    private items: any = {}

    public get<Id extends keyof Config>(id: Id): Config[Id] {
        const item = (this.items as any)[id]

        if (typeof item === 'object' && item[isFactory]) {
            return (item as any).factory(this)
        }

        return item
    }

    public bind = <Id extends string, T>(id: Id, value: T) => {
        type NewConfig = Assign<Config, { [K in Id]: T }>

        this.items[id] = value

        return this as unknown as Container<NewConfig>
    }

    public bindMore = <Id extends string, T extends Id extends keyof Config ? Config[Id] : any>(id: Id, value: T[]) => {
        type NewConfig = Assign<Config, { [K in Id]: T[] }>

        this.items[id] = this.items[id] || []
        this.items[id].push(value)

        return this as unknown as Container<NewConfig>
    }

    public bindFactory = <R, F extends string>(field: F, di: Factory<R>) => {
        type NewConfig = Assign<Config, { [key in F]: R }>

        this.items[field] = di

        return this as unknown as Container<NewConfig>
    }
}
