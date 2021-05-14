// .prettierrc.js
module.exports = {
  semi: false, // 是否加分号
  trailingComma: 'all', // 尾随逗号
  endOfLine: 'auto', // 行尾
  tabWidth: 2, // tabl 2个空格
  singleQuote: true, // 使用单引号
  // 要为特定类型的文件指定处理器
  overrides: [
    // js文件使用flow规范
    {
      files: ['*.js'],
      parser: 'flow',
    },
    {
			files: "*.json",
			options: {
				parser: "json",
				useTabs: false
			}
		},
		{
			files: "*.ts",
			options: {
				parser: "typescript"
			}
		}
  ],
}
