// babel.config.js

module.exports = api => {
    return {
        plugins: [
            "@babel/plugin-proposal-nullish-coalescing-operator",
            "@babel/plugin-proposal-optional-chaining"
        ],
        presets: [
            [
                "@babel/preset-env",
                {
                    useBuiltIns: "entry",
                    // caller.target 等于 webpack 配置的 target 选项
                    targets: api.caller(caller => caller && caller.target === "node") ? {
                        node: "current"
                    } : {
                        chrome: "58",
                        ie: "11"
                    }
                }
            ]
        ]
    }
}