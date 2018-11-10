module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/env", {
                targets: {
                    browsers: [
                        "last 2 versions"
                    ]
                }
            }
        ],
        "@babel/typescript"
    ]
    const plugins = [
        '@babel/plugin-proposal-class-properties'
    ]


    return {
        presets,
        plugins,
    }
}