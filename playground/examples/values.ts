// tslint:disable:no-console
import { ChainingContainer } from '../..'

// create container, matching FinalConfig will be type checked
const container = new ChainingContainer()
    // binding exact values
    .bind('num').toValue(10)
    .bind('str').toValue('ok')
    .bind('arr').toValue([10, 20])
    .bind('fun').toValue(console.log)
    .bind('obj').toValue({
        a: 'a',
        b: [15, 25]
    })

// tslint:disable-next-line:no-console
console.log(
    container.get('num'),  // 10
    container.get('arr')  // [10, 20]
)
