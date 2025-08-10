module.exports = {
	ignorePatterns: ['.eslintrc.cjs', 'vite.config.js'],
	extends: [
		'airbnb',
		'airbnb-typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'prettier'
	],
	env: {
		browser: true,
		es2021: true
	},
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: 'tsconfig.json'
	},
	rules: {
		'no-plusplus': 0,
		'@typescript-eslint/no-misused-promises': 0,
		'no-underscore-dangle': 0,
		'@typescript-eslint/no-floating-promises': 0,
		'@typescript-eslint/no-shadow': 0,
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{ prefer: 'type-imports', disallowTypeAnnotations: false }
		],
		'no-param-reassign': 0,
		'no-restricted-syntax': 0,
		'@typescript-eslint/no-loop-func': 0,
		'import/extensions': 0,
		'import/no-extraneous-dependencies': 0,
		'import/prefer-default-export': 0,
		'import/export': 0,
		'import/order': [
			2,
			{
				groups: [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index'
				],
				'newlines-between': 'always',
				pathGroups: [
					{
						pattern: '@/**',
						group: 'internal'
					}
				],
				alphabetize: {
					order: 'asc'
				}
			}
		]
	}
}
