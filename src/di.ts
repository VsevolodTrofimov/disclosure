import { Container, isFactory } from './container'


const factory = <Config, HookReturn>(
    ids: any[],
    hook: (...args: any) => HookReturn
) => (container: Container<Config>) => {
    const hookArgs = ids.map((id) => container.get(id))
    return hook(...hookArgs)
}

export const di2 = <Config>() => <
    Id1 extends keyof Config,
    Id2 extends keyof Config,
    HookReturn,
    >(
        ids: [Id1, Id2],
        hook: (arg1: Config[Id1], arg2: Config[Id2]) => HookReturn
    ) => ({
        [isFactory]: true,
        factory: factory<Config, HookReturn>(ids, hook),
    })

export const di1 = <Config>() => <
    Id1 extends keyof Config,
    HookReturn,
    >(
        ids: [Id1],
        hook: (arg1: Config[Id1]) => HookReturn
    ) => ({
        [isFactory]: true,
        factory: factory<Config, HookReturn>(ids, hook),
    })
