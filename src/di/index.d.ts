import { Container, Factory } from '../types'

declare class DI<Config> {
    public makeFactory<
        IdA extends keyof Config,
        HookReturn
        >(
            id1: IdA,
            hook: (
                a: Config[IdA],
            ) => HookReturn
        ): Factory<HookReturn>


    public makeFactory<
        IdA extends keyof Config,
        IdB extends keyof Config,
        HookReturn
        >(
            id1: IdA,
            id2: IdB,
            hook: (
                a: Config[IdA],
                b: Config[IdB],
            ) => HookReturn
        ): Factory<HookReturn>
}

export default DI