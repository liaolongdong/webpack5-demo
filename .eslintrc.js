// 各参数配置 详见：http://eslint.cn/docs/user-guide/configuring
module.exports = {
  // ESLint 一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找
  root: true,
  // 要在配置文件里指定环境，使用 env 关键字指定你想启用的环境，并设置它们为 true
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  // 要在配置文件中配置全局变量，请将 globals 配置属性设置为一个对象，该对象包含以你希望使用的每个全局变量。
  // 对于每个全局变量键，将对应的值设置为 "writable" 以允许重写变量，或 "readonly" 不允许重写变量。
  globals: {
    loadsh: true,
  },
  // 解析器 ESLint 默认使用Espree作为其解析器
  // Babel-ESLint 一个对Babel解析器的包装，使其能够与 ESLint 兼容。
  // @typescript-eslint/parser 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。
  parser: 'vue-eslint-parser',
  // 解析器选项可以在 .eslintrc.* 文件使用 parserOptions 属性设置
  parserOptions: {
    parser: require.resolve('babel-eslint'), // 解析器
    // 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。
    // 你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)
    ecmaVersion: 2018,
    // 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)
    sourceType: 'module',
    // 这是个对象，表示你想使用的额外的语言特性
    ecmaFeatures: {
      globalReturn: false, // 允许在全局作用域下使用 return 语句
      impliedStrict: true, // impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
      jsx: true,
    },
  },
  // 基础配置规则列表 按顺序覆盖
  extends: [
    'eslint:recommended', // eslint自带的预设规则
    // "plugin:flowtype/recommended", // flowtype推荐规则
    'plugin:@typescript-eslint/recommended', // ts推荐规则
    // 'plugin:vue/recommended',
    'plugin:vue/essential', // eslint-plugin-vue必要（默认）规则
    'plugin:prettier/recommended',
  ],
  // 使用 plugins 关键字来存放插件名字的列表
  // 插件可以提供处理器。处理器可以从另一种文件中提取 JavaScript 代码，然后让 ESLint 检测 JavaScript 代码。
  // 或者处理器可以在预处理中转换 JavaScript 代码。
  plugins: ['@typescript-eslint'],
  // 重新设置默认规则
  // "off" or 0 - 关闭规则
  // "warn" or 1 - 将规则视为一个警告（不会影响退出码）
  // "error" or 2 - 将规则视为一个错误 (退出码为1)
  rules: {
    // 'no-console': process.env.NODE_ENV !== 'production' ? 0 : 2,
    'no-console': 0,
    'no-unused-vars': 1,
    'no-useless-escape': 0,
    'no-empty': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'no-undef': 1,
  },
  // 要为特定类型的文件指定处理器
  overrides: [
    // cypress测试文件
    {
      files: ['*.spec.js'],
      parser: '@typescript-eslint/parser', //
      extends: [
        'plugin:@typescript-eslint/recommended', //ts的推荐规则
        'plugin:cypress/recommended',
      ],
      rules: {
        // strict: 'off',
        'cypress/no-assigning-return-values': 0,
        'cypress/no-unnecessary-waiting': 0,
      },
    },
    {
      files: ['*.js'],
      parser: 'babel-eslint',
    },
  ],
}
