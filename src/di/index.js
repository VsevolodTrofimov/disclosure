// this is in JS to reduce bundle size and only generate declarations (insted of duplicative code)

function diBase(...args) {
    const hook = args.pop()
    const ids = args

    return {
        type: 'factory',
        factory(container) {
            const hookArgs = ids.map((id) => container.get(id))
            return hook(...hookArgs)
        }
    }
}

export function di() {
    return diBase
}