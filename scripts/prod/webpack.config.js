const webpack = require("webpack")
const {
  getEntry,
  getOutput,
  getResolve,
  getEslintRule,
  getTsRule,
  getVueRule,
  getJsRule,
  getLessRule,
  getImgRule,
  getSvgRule,
  getHtmlPlugin,
} = require("../utils/webpack-utils")

const { webpackConfig } = require("../utils/env")

module.exports = {
  mode: "production",
  bail: true, // Stop compilation early in production
  devtool: "source-map",
  target: "web", // 升级webpack5 以后要配置这个
  entry: getEntry(),
  output: getOutput(),
  resolve: getResolve(),

  module: {
    //https://blog.csdn.net/qq_17175013/article/details/86842321
    noParse: /^(vue|vue-router)$/, //不去解析vue 和vue-router 中的依赖库

    rules: [
      // Disable require.ensure as it's not a standard language feature.
      // { parser: { requireEnsure: false } },
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
    new (require("vue-loader/lib/plugin"))(),
    getHtmlPlugin(),

    // new (require("@vue/preload-webpack-plugin"))({
    //   rel: "preload",
    //   as: "script",
    // }),

    new (require("case-sensitive-paths-webpack-plugin"))(),

    // If you require a missing module and then `npm install` it, you still have
    // to restart the development server for webpack to discover it. This plugin
    // makes the discovery automatic so you don't have to restart.
    new (require("mini-css-extract-plugin"))({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),

    // Generate an asset manifest file with the following content:
    // - "files" key: Mapping of all asset filenames to their corresponding
    //   output file so that tools can pick it up without having to parse
    //   `index.html`
    // - "entrypoints" key: Array of files which are included in `index.html`,
    //   can be used to reconstruct the HTML if necessary
    new (require("webpack-manifest-plugin").WebpackManifestPlugin)({
      fileName: "asset-manifest.json",
      // publicPath: paths.publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path
          return manifest
        }, seed)
        const entrypointFiles = entrypoints.main.filter(
          fileName => !fileName.endsWith(".map"),
        )
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        }
      },
    }),

    // 在打包时忽略本地化内容，如引入了一个插件，只用到了中文语言包，打包的时候把非中文语言包排除掉
    // https://blog.csdn.net/qq_17175013/article/details/86845624
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/,  ),

    new (require("friendly-errors-webpack-plugin"))(),

    // 打包分析组件
    webpackConfig.analyzer &&
      new (require("webpack-bundle-analyzer").BundleAnalyzerPlugin)({
        analyzerMode: "static", // 生成report.html
        openAnalyzer: false, // 是否自动打开浏览器
        generateStatsFile: true,
        statsFilename: "webpack-stats.json",
        // 控制那些资源应该被排除
        // excludeAssets: assetName => {
        //   console.log("assetName", assetName)
        //   return true
        // },
      }),
  ].filter(Boolean),
  // Some libraries import Node modules but don't use them in the browser.
  optimization: {
    // minimize: true ,
    minimize: false, // TODO
    // usedExports: true,
    // Automatically split vendor and commons
    splitChunks: {
      chunks: "all",
      // chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      // name: true,
      cacheGroups: {
        corejs: {
          minSize: 1,
          test: /[\\/]node_modules[\\/]core-js[\\/]/,
          name: "vendor/core-js",
        },
        lodash: {
          minSize: 1,
          test: /[\\/]node_modules[\\/]lodash[\\/]/,
          name: "vendor/lodash",
        },
        // 提取所有的 svg sprite
        spriteSvg: {
          minSize: 1,
          test: /[\\/]src[\\/]svg[\\/]common[\\/]/,
          name: "svg-common",
        },
        // 提取vue全家桶
        vue: {
          minChunks: 1,
          test: /\/node_modules\/vue(-router)?\//,
          name: "vendor/vue-family",
        },
        vendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
        },
        common: {
          name: "chunk-common",
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true,
        },
      },
    },
    // https://github.com/facebook/create-react-app/issues/5358
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`,
    },
  },
}
