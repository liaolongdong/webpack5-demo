/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  // https://webpack.docschina.org/configuration/mode/
  // mode: 'development',
  // 通过为浏览器调试工具提供极其详细的源映射的元信息来增强调试能力，但会牺牲构建速度。
  devtool: 'inline-source-map',
  // https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    contentBase: './dist',
    host: '0.0.0.0', // 设置本地可以通过ip地址访问
    port: 8086, // 设置端口号
    hot: true, // 启用热模块替换
    open: true, // 服务启动后是否打开浏览器
    // openPage: ['/different/page1', '/different/page2'], // 指定打开浏览器时要浏览的页面
    compress: true, // 为每个静态文件开启 gzip compression
    // 出现编译器错误或警告时，在浏览器中显示全屏覆盖
    overlay: {
      warnings: false,
      errors: true,
    },
    // 详见 https://webpack.docschina.org/configuration/dev-server/#devserverproxy
    proxy: {
      // 以/api字符串开头的接口请求，都代理到服务器接口请求地址，解决本地环境请求测试环境接口跨域问题
      // '/api': 'http://test-server-api.com'
      // '/api': {
      //   target: 'http://test-server-api.com',
      //   changeOrigin: true,
      //   // 如果不希望传递/api，则需要重写路径
      //   pathRewrite: {
      //     '^/api': '/',
      //   },
      // },
      // 代理到模拟的fat环境
      '/fat': {
        target: 'http://localhost:3100',
        changeOrigin: true,
        pathRewrite: {
          '^/fat': '/',
        },
      },
      // 代理到模拟的uat环境
      '/uat': {
        target: 'http://localhost:3200',
        changeOrigin: true,
        pathRewrite: {
          '^/uat': '/',
        },
      },
      // 代理到模拟的pro环境
      '/pro': {
        target: 'http://localhost',
        changeOrigin: true,
        pathRewrite: {
          '^/pro': '/',
        },
      },
    },
  },
})
