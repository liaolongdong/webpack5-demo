const fs = require('fs-extra')
const webpack = require('webpack')
const chalk = require('chalk')
const config = require('./webpack.config')
const paths = require('../utils/paths')

process.on('unhandledRejection', (err) => {
  throw err
})
// 清空dist文件夹
fs.emptyDirSync(paths.appDist)
// 复制public里面的文件
fs.copySync(paths.appPublic, paths.appDist, {
  dereference: true,
  filter: (file) => file !== paths.appHtml,
})

let compiler
try {
  compiler = webpack(config)
} catch (err) {
  console.log(chalk.red('Failed to compile.'))
  console.log()
  console.log(err.message || err)
  console.log()
  process.exit(1)
}

compiler.run()
