/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // mode: 'development',
  mode: 'production', // 默认情况下只有生产模式才会启用tree-shaking
  entry: {
    // index: './src/dynamic-import-index.js',

    index: './src/index.js',
    // print: './src/print.js',
    // other: './src/other.js',

    // 共享第三方库
    // index: {
    //     import: './src/index.js',
    //     dependOn: 'shared',
    // },
    // print: {
    //     import: './src/print.js',
    //     dependOn: 'shared',
    // },
    // other: {
    //     import: './src/other.js',
    //     dependOn: 'shared',
    // },
    // shared: 'lodash', // 共享第三方库
  },
  output: {
    // filename: '[name].bundle.js',
    filename: '[name].[contenthash:8].js', // contenthash 资源内容变动，自动生成唯一hash值，用于缓存
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0', // 设置本地可以通过ip地址访问
    hot: true, // 启用热模块替换
  },
  plugins: [
    // 自动生成html模板插件
    new HtmlWebpackPlugin({
      title: 'development',
    }),
  ],
  optimization: {
    usedExports: true,
    moduleIds: 'deterministic', // 防止没有发生变化的第三方库也变化bundle hash值
    runtimeChunk: 'single', // 将 runtime 代码拆分为一个单独的 chunk
    splitChunks: {
      // 代码分离
      cacheGroups: {
        vendor: {
          // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  // 从 CDN 加载 lodash
  // externalsType: 'script',
  // externals: {
  //     lodash: ['https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js', '_'],
  // },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
}
