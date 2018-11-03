import { Container, Factory, isFactory } from './container'


const factory = <Config extends object, HookReturn>(
    ids: any[],
    hook: (...args: any) => HookReturn
) => (container: Container<Config>) => {
    const hookArgs = ids.map((id) => container.get(id))
    return hook(...hookArgs)
}

export const di2 = <Config extends object>() => <
    Id1 extends keyof Config,
    Id2 extends keyof Config,
    HookReturn,
    >(
        ids: [Id1, Id2],
        hook: (arg1: Config[Id1], arg2: Config[Id2]) => HookReturn
    ): Factory<HookReturn> => ({
        [isFactory]: true,
        type: undefined as any as HookReturn,
        factory: factory<Config, HookReturn>(ids, hook),
    })

export const di1 = <Config extends object>() => <
    Id1 extends keyof Config,
    HookReturn,
    >(
        ids: [Id1],
        hook: (arg1: Config[Id1]) => HookReturn
    ) => ({
        [isFactory]: true,
        type: undefined as any as HookReturn,
        factory: factory<Config, HookReturn>(ids, hook),
    })
