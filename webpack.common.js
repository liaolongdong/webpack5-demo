const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WorkboxPlugin = require('workbox-webpack-plugin'); // 可帮助我们更简单地为 web app 提供离线支持
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk'); // node高亮输出内容
const ConsoleLogOnBuildWebpackPlugin = require('./plugins/ConsoleLogOnBuildWebpackPlugin');

console.log(chalk.bold.green('Hello world!'));

// 尝试使用环境变量，否则使用根路径
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
    //详见 https://webpack.docschina.org/configuration/entry-context/#entry
    entry: {
        // polyfills: './src/polyfills',
        index: './src/index.js',
        // index: './src/index.ts',

        // dependOn 选项你可以与另一个入口 chunk 共享模块
        // app: {
        //     import: './app.js',
        //     dependOn: 'react-vendors'
        // },
        // 'react-vendors': ['react', 'react-dom', 'prop-types'],
    },
    output: {
        // https://webpack.docschina.org/configuration/output/#outputfilename
        // entry chunk 的文件名模板
        filename: '[name].[contenthash:8].js', // contenthash 资源内容变动，自动生成唯一hash值，用于长效缓存
        // 所有输出文件的目标路径 必须是绝对路径（使用 Node.js 的 path 模块）
        path: path.resolve(__dirname, 'dist'),
        // 输出解析文件的目录，url 相对于 HTML 页面
        publicPath: '/',
        clean: true, // 清除上一次打包
        assetModuleFilename: 'images/[name].[hash:8][ext][query]', // 资源自定义输出文件名
    },
    module: {
        // https://webpack.docschina.org/configuration/module/#modulenoparse
        // noParse: /jquery|lodash/, // 防止 webpack 解析那些任何与给定正则表达式相匹配的文件
        rules: [
            // {
            //     test: /\.tsx?$/,
            //     use: 'ts-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.scss$/,
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ?
                    'style-loader' :
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
                include: [
                    path.resolve(__dirname, "src")
                ],
            },
            {
                test: /\.css$/i,
                // use: ['style-loader', 'css-loader'],
                use: [
                    // fallback to style-loader in development
                    process.env.NODE_ENV !== 'production' ?
                    'style-loader' :
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg/,
                type: 'asset/inline',
            },
            {
                test: /\.txt/,
                type: 'asset/source',
            },
            // webpack 将按照默认条件，自动地在 resource 和 inline 之间进行选择：
            // 小于 8kb 的文件，将会视为 inline 模块类型，否则会被视为 resource 模块类型
            // {
            //     test: /\.txt/,
            //     type: 'asset',
            //     parser: {
            //         dataUrlCondition: {
            //             maxSize: 4 * 1024 // 4kb
            //         }
            //     }
            // },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // 所有 html 文件都将被发送到输出目录中的 static 目录中
            // {
            //     test: /\.html/,
            //     type: 'asset/resource',
            //     generator: {
            //         filename: 'static/[name].[hash:8][ext][query]'
            //     }
            // },
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
    plugins: [
        // 自动生成html文件模板插件
        new HtmlWebpackPlugin({
            title: 'development',
            template: path.resolve('public', 'index.html')
        }),
        // 这可以帮助我们在代码中安全地使用环境变量
        new webpack.DefinePlugin({
            'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH),
        }),
        // https://webpack.docschina.org/guides/shimming/
        // new webpack.ProvidePlugin({
        //     _: 'lodash', // 导入全部
        //     // join: ['lodash', 'join'], // 只导入join方法，利用tree-shaking的优点
        // }),
        // 用于自定义编译过程中的进度报告
        new webpack.ProgressPlugin(),
        // 自定义的日志plugin
        new ConsoleLogOnBuildWebpackPlugin(),
        // new WorkboxPlugin.GenerateSW({
        //     // 这些选项帮助快速启用 ServiceWorkers
        //     // 不允许遗留任何“旧的” ServiceWorkers
        //     clientsClaim: true,
        //     skipWaiting: true,
        // }),
    ],
    optimization: {
        usedExports: true,
        moduleIds: 'deterministic', // 防止没有发生变化的第三方库也变化bundle hash值
        runtimeChunk: 'single', // 将 runtime 代码拆分为一个单独的 chunk
        splitChunks: { // 代码分离
            cacheGroups: {
                vendor: { // 将第三方库(library)（例如 lodash 或 react）提取到单独的 vendor chunk 文件中
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    // https://webpack.docschina.org/configuration/externals/
    // 从 CDN 加载 lodash
    externalsType: 'script',
    externals: {
        lodash: ['https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js', '_'],
    },
    // 不跟踪打包的模块
    // externals: ["react", /^@angular/],
    resolve: {
        // 使用的扩展名
        // https://webpack.docschina.org/configuration/resolve/#resolveextensions
        extensions: [".js", ".json", ".jsx", ".css"],
        // extensions: ['.tsx', '.ts', '.js'],
        // https://webpack.docschina.org/configuration/resolve/#resolvealias
        alias: {
            // "module": "new-module", // 别名："module" -> "new-module" 和 "module/path/file" -> "new-module/path/file"
            // Utilities: path.resolve(__dirname, 'src/utilities/'),
            // Templates: path.resolve(__dirname, 'src/templates/'),
            '@': path.resolve(__dirname, 'src'), // @/ -> src/
        }
    },
    // target: "browserslist", // use browserslist
    // target: ["web", "es5"], // combining targets
    stats: {
        assetsSort: '!size',
        builtAt: true,
        // 告知 stats 是否展示 --env 信息.
        env: true,
    },
};