# Disclosure

Minimalistic typesafe IOC container written in strict-mode typescript

## Installation

## Usage

### Binding values
```ts
import { ChainingContainer } from 'disclosure-di'

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

container.get('num') // 10
container.get('arr') // [10, 20]
```

### Binding factories
The heart of this lib

```ts
import { ChainingContainer, Container, DITools } from 'disclosure-di'

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

container.get('num') // 10
container.get('arr') // [10, 100]
container.get('obj') // { a: 'ok', b: [10, 100] }


// --CAVEAT--
// Even though this api uses chaining you won't get the right type if you do this
const container = new ChainingContainer()

container
    .bind('num').toValue(10)
    .bind('str').toValue('ok')
    .bind('arr').toFactory(numNSquare)
    .bind('fun').toFactory(log)
    .bind('obj').toFactory(obj) 
    
container // sadly, container is still Container<{}>
```

### Binding classes
Boils down to factories

```ts
import { ChainingContainer, Container, DITools } from 'disclosure-di'

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
```

toClass helper just converts class construction to factory

This approach is used because using classes (in our experience) 
makes refactoring code to plain values really hard, while classes tend to get fat, 
while method overriding makes code harder to reason about.

Also this approach gives you more control in terms of splitting values into 
received from container and received from usage without unclear limitations like being unable
to use values from DI container in the constructor

### Binding as singletons
Useful for shared objects, event buses and any other integration 

```ts
// tslint:disable:no-console
import { ChainingContainer, Container, DITools } from 'disclosure-di'

type Subscriber = () => any

interface FinalConfig {
    tickInterval: number
    tick: (cb: Subscriber) => void
}

const di = new DITools<FinalConfig>().makeFactory

const tick = di('tickInterval', (time) => {
    const subs = [] as Subscriber[]
    setInterval(() => subs.forEach((sub) => sub()), time)

    return (cb: Subscriber) => subs.push(cb)
})

const container: Container<FinalConfig> = new ChainingContainer()
    .bind('tickInterval').toValue(1000)
    .bind('tick').toFactory(tick).asSingleton() // we want everything to trigger together

container.get('tick')(() => console.log('logic'))

setTimeout(() => {
    // it's pretty safe to use container as service locator if you bind everything in the beginning
    container.get('tick')(() => console.log('render\n\n'))
}, 600)

// logic
// render // instantly, instead of 600ms late
```

### Binding as extensions
Useful for all sorts of plugins


## Cookbook

🛠 TBD 🛠

### Composing container of modules

### Using disclosure for A / B tests