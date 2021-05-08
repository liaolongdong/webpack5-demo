const nodeEnv = process.env.NODE_ENV

console.log("NODE_ENV", nodeEnv)

// webpack配置
exports.webpackConfig = process.env.WEBPACK_CONFIG
  ? JSON.parse(process.env.WEBPACK_CONFIG)
  : {}
console.log("WEBPACK_CONFIG(webpack配置)", exports.webpackConfig)

exports.isDev = nodeEnv === "development"
exports.isPro = nodeEnv === "production"
