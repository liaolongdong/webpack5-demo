const WebpackDevServer = require("webpack-dev-server")
const devServerConfig = require("./webpackDevServer.config")
const webpack = require("webpack")
const config = require("./webpack.config")

const chalk = require("chalk")

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
process.on("unhandledRejection", err => {
  throw err
})

let compiler
try {
  compiler = webpack(config)
} catch (err) {
  console.log(chalk.red("Failed to compile."))
  console.log()
  console.log(err.message || err)
  console.log()
  process.exit(1)
}

const devServer = new WebpackDevServer(compiler, devServerConfig)

devServer.listen(3000, "0.0.0.0", err => {
  if (err) return console.log(err)
  console.log(chalk.cyan("Starting the development server...\n"))
  // openBrowser(urls.localUrlForBrowser)
})
