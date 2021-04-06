// .eslintrc.js
module.exports = {
	env: {
            browser: true,
            node: true
	},
    // ts解析器
	parser: '@typescript-eslint/parser', 
	extends: [
            'eslint:recommended', 
            'plugin:@typescript-eslint/recommended', 
            'plugin:prettier/recommended'
        ], // 增加Prettier的核心规则
        plugins: ['@typescript-eslint'], 
	rules: {
            // semi: ["error", "always"],
            // quotes: ["error", "double"],
            '@typescript-eslint/no-explicit-any': 'error',
	},
}

