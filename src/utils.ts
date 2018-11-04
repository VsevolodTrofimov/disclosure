export function once<Args extends any[], Return>(f: (...args: Args) => Return) {
    let called = false
    let result: Return

    return function(this: unknown, ...args: Args) {
        if (!called) {
            result = f.apply(this, arguments)
            called = true
        }

        return result
    }
}
