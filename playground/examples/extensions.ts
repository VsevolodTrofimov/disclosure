// tslint:disable:no-console
import { ChainingContainer, Container, DITools } from '../..'

// we will check container type against this one
interface FinalConfig {
    spearLength: number,
    weapons: string[]
}

// Create makeFactory with predefined config
const di = new DITools<FinalConfig>().makeFactory
const spearFactory = di('spearLength', (len) => len > 3 ? 'long spear' : 'short spear')
// You will get a typescript error if any identifier is missing / has incorrect type
const container: Container<FinalConfig> = new ChainingContainer()
    // binding exact values
    .bind('weapons').toValue(['sword', 'bow'])
    .bindMore('weapons').toValue('knife')
    .bindMore('weapons').toFactory(spearFactory)
    .bind('spearLength').toValue(2.4)
// you can still use singleton bindings with bindMore, even though they are missing in this example

console.log(
    container.get('weapons') // [ 'sword', 'bow', 'knife', 'short spear' ]
)

