import { ChainingContainer, Container, di as diBase } from '..'

interface FinalConfig {
    num: number,
    npp: number
}

const di = diBase<FinalConfig>()

const p10 = di('num', (num) => num + 10)

const p20 = di('num', (num) => num + 20)

const cont: Container<FinalConfig> = new ChainingContainer()
    .bind('num').toValue(10)
    .bind('npp').toFactory(p20)

// tslint:disable-next-line:no-console
console.log(cont.get('num'), cont.get('npp'))
