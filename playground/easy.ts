import { ChainingContainer, Container, DI } from '..'

interface FinalConfig {
    num: number,
    npp: number,
    str: string,
    vm: ValueMaker
}

const di = new DI<FinalConfig>().makeFactory

const p10 = di('num', (num) => num + 10)

const p20 = di('num', (num) => num + 20)

class ValueMaker {
    constructor(num: number) {
        this.num = num
        console.warn('MADE')
    }

    public get() {
        return this.num
    }

    private num: number
}

const vm = di('npp', 'num', (num, num2) => new ValueMaker(num + num2))

const cont: Container<FinalConfig> = new ChainingContainer()
    .bind('num').toValue(10)
    .bind('npp').toFactory(p20)
    .bind('str').toValue('ok')
    .bind('vm').toFactory(vm).asSignleton()

// tslint:disable-next-line:no-console
console.log(cont.get('num'), cont.get('npp'), cont.get('str'))

console.log(cont.get('vm').get(), cont.get('vm').get())
