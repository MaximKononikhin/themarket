module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'nestjs',
		'simple-import-sort',
	],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	root: true,
	env: {
		node: true,
		jest: true,
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^@nest'],
					['^\\u0000'],
					['^'],
					['^@shared', '^@user', '@auth', '@file'],
					// Relative imports.
					// Anything that starts with a dot.
					['^\\.'],
				],
			},
		],
		indent: [
			'error',
			'tab',
			{
				ignoredNodes: [
					`FunctionExpression > .params[decorators.length > 0]`,
					`FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
					`ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`,
				],
				SwitchCase: 1,
			},
		],
	},
};
