import { ChainingContainer } from './ChainingContainer'
import { DITools } from './DITools'
import * as types from './types'

// babel has problems otherwise
export type Container<T extends object> = types.Container<T>

export {
    ChainingContainer,
    DITools,
}
