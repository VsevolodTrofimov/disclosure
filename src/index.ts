import { ChainingContainer } from './ChainingContainer'
import DI from './di'
import * as types from './types'

// babel has problems otherwise
export type Container<T extends object> = types.Container<T>

export {
    ChainingContainer,
    DI,
}
