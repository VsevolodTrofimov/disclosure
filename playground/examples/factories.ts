// tslint:disable:no-console
import { ChainingContainer, Container, DITools } from '../..'

// we will check container type against this one
interface FinalConfig {
    num: number
    str: string
    arr: number[]
    fun: (arg: any) => void
    obj: {
        a: string,
        b: number[]
    }
}

// Create makeFactory with predefined config
const di = new DITools<FinalConfig>().makeFactory

// di(...identifiers, (...identifierValues) => Instance))
const numNSquare = di('num', (base) => [base, base * base])

// There are no limitations on returned type
const log = di('str', (prefix) => (x: any) => console.log(prefix, x))

// You can depend on up to 20 identifiers
const obj = di('str', 'arr', (str, arr) => ({
    a: str,
    b: arr
}))

// You will get a typescript error if any identifier is missing / has incorrect type
const container: Container<FinalConfig> = new ChainingContainer()
    // binding exact values
    .bind('num').toValue(10)
    .bind('str').toValue('ok')
    .bind('arr').toFactory(numNSquare)
    .bind('fun').toFactory(log)
    .bind('obj').toFactory(obj)

console.log(
    container.get('num'), // 10
    container.get('arr'), // [10, 100]
    container.get('obj') // { a: 'ok', b: [10, 100] }
)

