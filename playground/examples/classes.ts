// tslint:disable:no-console
import { ChainingContainer, Container, DITools, toClass } from '../..'

class Genius {
    constructor(
        public answer: number,
        private connector: string
    ) { } // values are assigned automatically

    public explain(question: string) {
        console.log(question, this.connector, this.answer)
    }
}

// we will check container type against this one
interface FinalConfig {
    num: number
    connector: string
    genius: Genius
    sugar: Genius
    create: (answer: number) => Genius
}

const di = new DITools<FinalConfig>().makeFactory

const container: Container<FinalConfig> = new ChainingContainer()
    .bind('num').toValue(42)
    .bind('connector').toValue('is an alias to')
    .bind('genius').toFactory(di('num', 'connector', (ans, connector) => new Genius(ans, connector)))
    .bind('sugar').toFactory(di('num', 'connector', toClass(Genius)))
    .bind('create').toFactory(di('connector', (connector) => (ans: number) => new Genius(ans, connector)))

container.get('genius').explain('Universe') // Universe is an alias to 42

// code equal to binding to constructor
const create = container.get('create')
create(Infinity).explain('Your skill') // Your skill is an alias to Infinity
