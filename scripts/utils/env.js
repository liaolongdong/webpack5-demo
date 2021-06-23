const NODE_ENV = process.env.NODE_ENV
console.log('NODE_ENV', NODE_ENV)
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.',
  )
}

// webpack配置
exports.webpackConfig = process.env.WEBPACK_CONFIG
  ? JSON.parse(process.env.WEBPACK_CONFIG)
  : {}
console.log('WEBPACK_CONFIG(webpack配置)', exports.webpackConfig)

exports.isDev = NODE_ENV === 'development'
exports.isPro = NODE_ENV === 'production'
