const webpack = require("webpack")
const paths = require("../utils/paths")
const {
  getEntry,
  getOutput,
  getResolve,
  getEslintRule,
  getTsRule,
  getJsRule,
  getVueRule,
  getLessRule,
  getImgRule,
  getSvgRule,
  getHtmlPlugin,
} = require("../utils/webpack-utils")
module.exports = {
  mode: "development", // 有三种值  development production  none
  bail: false,
  target: "web", // 升级webpack5 以后要配置这个
  devtool: "cheap-module-source-map",
  entry: getEntry(),
  output: getOutput(),
  resolve: getResolve(),
  module: {
    noParse: /^(vue|vue-router)$/,

    rules: [
      getEslintRule(),
      getTsRule(),
      getVueRule(),
      getJsRule(),
      getLessRule(),
      getSvgRule(),
      getImgRule(),
    ],
  },
  plugins: [
    // 解析式.vue文件
    new (require("vue-loader/lib/plugin"))(),

    // 提取svg文件
    // new (require("svg-sprite-loader/plugin"))(),

    getHtmlPlugin(),

    new webpack.HotModuleReplacementPlugin(),

    // https://www.npmjs.com/package/case-sensitive-paths-webpack-plugin
    new (require("case-sensitive-paths-webpack-plugin"))({ debug: false }),

    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    new (require("friendly-errors-webpack-plugin"))(), //日志打印插件
  ],

  // performance: false,
}
