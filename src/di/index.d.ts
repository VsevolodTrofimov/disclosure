import { Container, Factory } from '../types'


export function di<Config extends object>(): <
    IdA extends keyof Config,
    HookReturn
    >(
    id1: IdA,
    hook: (
        a: Config[IdA],
    ) => HookReturn
) => Factory<HookReturn>


export function di<Config extends object>(): <
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
) => Factory<HookReturn>


export function di<Config extends object>(): <
    IdA extends keyof Config,
    IdB extends keyof Config,
    IdC extends keyof Config,
    HookReturn
    >(
    id1: IdA,
    id2: IdB,
    id3: IdC,
    hook: (
        a: Config[IdA],
        b: Config[IdB],
        c: Config[IdC],
    ) => HookReturn
) => Factory<HookReturn>
