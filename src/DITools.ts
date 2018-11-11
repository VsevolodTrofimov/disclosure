import { Container, Factory } from './types'

export default class DITools<Config> {

    public makeFactory<
        Id1 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        hook: (
            value1: Config[Id1],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        Id13 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        id13: Id13,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
            value13: Config[Id13],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        Id13 extends keyof Config,
        Id14 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        id13: Id13,
        id14: Id14,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
            value13: Config[Id13],
            value14: Config[Id14],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        Id13 extends keyof Config,
        Id14 extends keyof Config,
        Id15 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        id13: Id13,
        id14: Id14,
        id15: Id15,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
            value13: Config[Id13],
            value14: Config[Id14],
            value15: Config[Id15],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        Id13 extends keyof Config,
        Id14 extends keyof Config,
        Id15 extends keyof Config,
        Id16 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        id13: Id13,
        id14: Id14,
        id15: Id15,
        id16: Id16,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
            value13: Config[Id13],
            value14: Config[Id14],
            value15: Config[Id15],
            value16: Config[Id16],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        Id13 extends keyof Config,
        Id14 extends keyof Config,
        Id15 extends keyof Config,
        Id16 extends keyof Config,
        Id17 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        id13: Id13,
        id14: Id14,
        id15: Id15,
        id16: Id16,
        id17: Id17,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
            value13: Config[Id13],
            value14: Config[Id14],
            value15: Config[Id15],
            value16: Config[Id16],
            value17: Config[Id17],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        Id13 extends keyof Config,
        Id14 extends keyof Config,
        Id15 extends keyof Config,
        Id16 extends keyof Config,
        Id17 extends keyof Config,
        Id18 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        id13: Id13,
        id14: Id14,
        id15: Id15,
        id16: Id16,
        id17: Id17,
        id18: Id18,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
            value13: Config[Id13],
            value14: Config[Id14],
            value15: Config[Id15],
            value16: Config[Id16],
            value17: Config[Id17],
            value18: Config[Id18],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        Id13 extends keyof Config,
        Id14 extends keyof Config,
        Id15 extends keyof Config,
        Id16 extends keyof Config,
        Id17 extends keyof Config,
        Id18 extends keyof Config,
        Id19 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        id13: Id13,
        id14: Id14,
        id15: Id15,
        id16: Id16,
        id17: Id17,
        id18: Id18,
        id19: Id19,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
            value13: Config[Id13],
            value14: Config[Id14],
            value15: Config[Id15],
            value16: Config[Id16],
            value17: Config[Id17],
            value18: Config[Id18],
            value19: Config[Id19],
        ) => HookReturn
    ): Factory<HookReturn>

    public makeFactory<
        Id1 extends keyof Config,
        Id2 extends keyof Config,
        Id3 extends keyof Config,
        Id4 extends keyof Config,
        Id5 extends keyof Config,
        Id6 extends keyof Config,
        Id7 extends keyof Config,
        Id8 extends keyof Config,
        Id9 extends keyof Config,
        Id10 extends keyof Config,
        Id11 extends keyof Config,
        Id12 extends keyof Config,
        Id13 extends keyof Config,
        Id14 extends keyof Config,
        Id15 extends keyof Config,
        Id16 extends keyof Config,
        Id17 extends keyof Config,
        Id18 extends keyof Config,
        Id19 extends keyof Config,
        Id20 extends keyof Config,
        HookReturn
    >(
        id1: Id1,
        id2: Id2,
        id3: Id3,
        id4: Id4,
        id5: Id5,
        id6: Id6,
        id7: Id7,
        id8: Id8,
        id9: Id9,
        id10: Id10,
        id11: Id11,
        id12: Id12,
        id13: Id13,
        id14: Id14,
        id15: Id15,
        id16: Id16,
        id17: Id17,
        id18: Id18,
        id19: Id19,
        id20: Id20,
        hook: (
            value1: Config[Id1],
            value2: Config[Id2],
            value3: Config[Id3],
            value4: Config[Id4],
            value5: Config[Id5],
            value6: Config[Id6],
            value7: Config[Id7],
            value8: Config[Id8],
            value9: Config[Id9],
            value10: Config[Id10],
            value11: Config[Id11],
            value12: Config[Id12],
            value13: Config[Id13],
            value14: Config[Id14],
            value15: Config[Id15],
            value16: Config[Id16],
            value17: Config[Id17],
            value18: Config[Id18],
            value19: Config[Id19],
            value20: Config[Id20],
        ) => HookReturn
    ): Factory<HookReturn>


    public makeFactory(...args: any): Factory<any> {
        const hook = args.pop()
        const ids = args

        return {
            type: 'factory',
            factory(container: Container<any>) {
                const hookArgs = ids.map((id: any) => container.get(id))
                return hook(...hookArgs)
            }
        }
    }

}
