const { isDev, isPro } = require("./env")
const paths = require("../utils/paths")

// 入口配置
exports.getEntry = () => {
  return { main: paths.appIndexJs }
}

// 出口配置
exports.getOutput = () => {
  const obj = {
    path: paths.appDist,
    // 告诉 webpack 在 bundle 中引入「所包含模块信息」的相关注释。此选项默认值是 false，并且不应该用于生产环境(production)，但是对阅读开发环境(development)中的生成代码(generated code)极其有用。
    pathinfo: isDev,
  }
  if (isDev) {
    obj.filename = "js/[name].bundle.js"
    obj.chunkFilename = "js/[name].chunk.js"
  } else {
    obj.filename = "js/[name].[contenthash:8].js"
    obj.chunkFilename = "js/[name].[contenthash:8].chunk.js"
    obj.publicPath = "/" // 使用绝对路径
  }
  return obj
}

// resolve配置
exports.getResolve = () => {
  return {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".vue", ".json"],
    alias: {
      "@": paths.appSrc,
    },
  }
}

// eslint 打包配置
exports.getEslintRule = () => {
  return {
    test: /\.(vue|(j|t)sx?)$/,
    exclude: /node_modules/,
    enforce: "pre", // 优先执行
    use: [
      {
        loader: require.resolve("eslint-loader"),
        options: {
          // cache: true,
          fix: false, // 自动修复源文件
          eslintPath: require.resolve("eslint"),
          emitError: true,
        },
      },
    ],
  }
}

// typescript配置
exports.getTsRule = () => {
  return {
    test: /\.(ts|tsx)$/,
    include: paths.appSrc,
    use: [
      {
        loader: require.resolve("babel-loader"),
      },
      {
        loader: require.resolve("ts-loader"),
        options: {
          transpileOnly: true,
          happyPackMode: isPro, // 开启多线程打包
          appendTsxSuffixTo: ["\\.vue$"],
        },
      },
    ],
  }
}

// JavaScript配置
exports.getJsRule = () => {
  return {
    test: /\.(js|jsx)$/,
    include: paths.appSrc,
    loader: require.resolve("babel-loader"),
    options: {
      // This is a feature of `babel-loader` for webpack (not Babel itself).
      // It enables caching results in ./node_modules/.cache/babel-loader/
      // directory for faster rebuilds.
      cacheDirectory: true,
      // See #6846 for context on why cacheCompression is disabled
      cacheCompression: false,
      compact: false,
    },
  }
}

// 处理.vue文件
exports.getVueRule = () => {
  return {
    test: /\.vue$/,
    include: [paths.appSrc],
    use: [
      {
        loader: require.resolve("vue-loader"),
        options: {
          compilerOptions: {
            whitespace: "condense",
          },
        },
      },
    ],
  }
}

// 处理less模块
exports.getLessRule = () => {
  const miniCssLoader = {
    loader: require("mini-css-extract-plugin").loader,
    // options: {
    //   hmr: false,
    //   publicPath: "../",
    // },
  }
  const styleLoader = { loader: require.resolve("style-loader") }
  const cssLoader = {
    loader: require.resolve("css-loader"),
    options: {
      sourceMap: false,
      esModule: false,
      modules: {
        localIdentName: "[name]_[local]_[hash:base64:5]",
      },
      importLoaders: 2,
    },
  }
  const postcssLoader = {
    loader: require.resolve("postcss-loader"),
    options: {
      sourceMap: false,
      postcssOptions: {
        plugins: [require("autoprefixer")()],
      },
    },
  }
  const lessLoader = {
    loader: require.resolve("less-loader"),
    options: {
      sourceMap: false,
    },
  }

  return {
    test: /\.less$/,
    include: [paths.appSrc],
    oneOf: [
      {
        // 模块化less配置  index.module.less
        test: /\.module\.\w+$/,
        use: [
          isDev ? styleLoader : miniCssLoader,
          cssLoader,
          postcssLoader,
          lessLoader,
        ],
      },
      {
        // vue.less?module
        // .vue 文件里面的 模块化 less
        resourceQuery: /module/,
        use: [
          isDev ? styleLoader : miniCssLoader,
          cssLoader,
          postcssLoader,
          lessLoader,
        ],
      },
      {
        // 普通的less 文件配置
        use: [
          isDev ? styleLoader : miniCssLoader,
          {
            loader: require.resolve("css-loader"),
            options: {
              sourceMap: false,
              esModule: false,
              modules: false,
              importLoaders: 2,
            },
          },
          postcssLoader,
          lessLoader,
        ],
      },
    ],
  }
}

// 处理svg模块
exports.getSvgRule = () => {
  return {
    test: /\.svg$/,

    oneOf: [
      {
        exclude: [paths.appSvg],
        use: [
          {
            loader: require.resolve("babel-loader"),
          },
          {
            loader: require.resolve("vue-svg-loader"),
            options: {
              svgo: {
                plugins: [
                  { removeDoctype: true },
                  { removeComments: true },
                  { removeViewBox: false },
                ],
                removeViewBox: false,
              },
            },
          },
        ],
      },
      {
        include: [paths.appSvg],
        use: [
          {
            loader: require.resolve("svg-sprite-loader"),
            options: {
              symbolId: "icon-[name]",
              // extract: true, // 单独文件导出
              // spriteFilename: (svgPath) => `sprite${svgPath.substr(-4)}`,
            },
          },
        ],
      },
    ],
  }
}

// 处理图片模块
exports.getImgRule = () => {
  return {
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    loader: require.resolve("url-loader"),
    options: {
      limit: "10000",
      name: "static/media/[name].[hash:8].[ext]",
    },
  }
}

// {
//     loader: require.resolve("file-loader"),
//     exclude: [
//       /\.(js|jsx|ts|tsx)$/,
//       /\.html$/,
//       /\.json$/,
//       /\.vue$/,
//       /\.svg$/,
//       /\.bmp$/,
//       /\.gif$/,
//       /\.jpe?g$/,
//       /\.png$/,
//     ],
//     options: {
//       name: "media/[name].[ext]",
//     },
//   },

exports.getHtmlPlugin = () => {
  const options = {
    template: paths.appHtml,
    inject: "body",
    // templateParameters: function() {
    // },
  }
  if (isPro) {
    Object.assign(options, {
      minify: false, // TODO:
      // removeComments: false,
      // collapseWhitespace: false,
      // removeRedundantAttributes: false,
      // useShortDoctype: false,
      // removeEmptyAttributes: false,
      // removeStyleLinkTypeAttributes: false,
      // keepClosingSlash: false,
      // minifyJS: false,
      // minifyCSS: false,
      // minifyURLs: false,
    })
  }
  return new (require("html-webpack-plugin"))(options)
}
