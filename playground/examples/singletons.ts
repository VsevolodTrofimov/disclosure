// tslint:disable:no-console
import { ChainingContainer, Container, DITools } from '../..'

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
