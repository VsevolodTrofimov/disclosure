import { ChainingContainer, Container, DI } from '..'

interface FinalConfig {
    bla: number
    lol: object
    arr: number[]
    blat: number
    blag: number
    blagSingle: number
    kek: () => void
}

const final = new DI<FinalConfig>().makeFactory

const bla10 = final('bla', (kek) => {
    const wow = kek + 10
    return wow
})

const bla20 = final('bla', (kek) => {
    const wow = kek + 20
    return wow
})

const blaStr = final('lol', () => {
    return 'str'
})

const c2 = new ChainingContainer()
    .bind('bla').toValue('wow')
    .bind('arr').toValue<number[]>([])
    .bindMore('arr').toFactory(bla10)
    .bindMore('arr').toFactory(bla10).asSingleton()
    .bind('bla').toValue(15)
    .bind('lol').toValue({
        kek: 10,
        pek: 40
    })
    .bind('kek').toValue(() => 255)

const moduleB = <T extends object>(
    container: ChainingContainer<T>
) => container
    .bind('blag').toFactory(bla10)
    .bind('blagSingle').toFactory(bla10).asSingleton()
    .bind('blat').toFactory(bla20)

const moduleС = <T extends object>(
    container: ChainingContainer<T>
) => container.bind('blat').toFactory(bla10)

const f2: Container<FinalConfig> = moduleB(c2)

const val21 = f2.get('lol')
const val22 = f2.get('bla')
const val23 = f2.get('kek')
const val24 = f2.get('blag')
const val25 = f2.get('blat')
const valArr = f2.get('arr')

const val242 = f2.get('blag')

const val24s1 = f2.get('blagSingle')
const val24s2 = f2.get('blagSingle')
const val24s3 = f2.get('blagSingle')

// tslint:disable-next-line:no-console
console.log(val21, val22, val23, val24, val242, valArr, val25, val24s1, val24s2, val24s3)
