import { pipe } from 'ramda'
import { add, bind, bindFactory, Container, create, merge } from './container'
import { di1 } from './di'

interface FinalConfig {
    bla: number,
    lol: object,
    blaf: number,
    blag: number,
    kek: () => void
}

const final1 = di1<FinalConfig>()

const bla10 = final1(['bla'], (kek) => {
    const wow = kek + 10
    return wow
})

const bla20 = final1(['bla'], (kek) => {
    const wow = kek + 20
    return wow
})

const base = bind({
    bla: 'wow',
    lol: {
        kek: 10,
        pek: 40
    }
})(create())

const fix = bind({
    bla: 15,
    kek: create
})(base)

const old = bindFactory({ bla10 }, bla10)(fix)

const basic = pipe(
    create,
    bind({
        bla: 'wow',
        lol: {
            kek: 10,
            pek: 40
        }
    }),
    bind({
        bla: 15,
        kek: create
    }),
)

const a = pipe(create, bindFactory({ blag: '' }, bla10))
const b = pipe(create, bindFactory({ blaf: '' }, bla20))
const c = pipe(create, bindFactory({ blaf: '' }, bla10))

const p = merge(
    basic(),
    merge(
        a(),
        merge(b(), c())
    )
) as Container<FinalConfig>

const pc = pipe(
    basic,
    add(a),
    add(b),
    add(c),
)() as Container<FinalConfig>

const val1 = pc.get('lol')
const val2 = pc.get('bla')
const val3 = pc.get('kek')
const val4 = pc.get('blag')
const val5 = pc.get('blaf')

console.log(val1, val2, val3, val4, val5)

