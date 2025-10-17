// eslint.config.js
import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
	// Base JS support
	{
		files: ['**/*.ts'],
		...js.configs.recommended,
	},

	// TypeScript support
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: process.cwd(),
			},
		},
		plugins: {
			'@typescript-eslint': ts,
		},
		rules: {
			...ts.configs['eslint-recommended'].rules,
			...ts.configs.recommended.rules,

			'no-case-declarations': 'off',
			'no-constant-condition': ['error', { checkLoops: false }],
			'semi': ['error', 'never'],
			'eol-last': ['error', 'always'],
			'@typescript-eslint/no-unused-vars': ['error', { args: 'after-used' }],
			'indent': [2, 'tab', { SwitchCase: 1 }],
			'operator-linebreak': ['error', 'before'],
			'comma-dangle': ['error', 'always-multiline'],
			'quote-props': ['error', 'as-needed'],
			'quotes': ['error', 'single', { avoidEscape: true }],
			'array-bracket-spacing': ['error', 'always', { singleValue: false }],
			'no-undef': ['error', { typeof: true }],
			'no-console': 'off',
			'object-curly-spacing': ['error', 'always'],
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-non-null-assertion': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'@typescript-eslint/explicit-module-boundary-types': ['error', {
				allowArgumentsExplicitlyTypedAsAny: false,
				allowTypedFunctionExpressions: true,
			}],
			'@typescript-eslint/restrict-template-expressions': ['error', {
				allowAny: true,
				allowBoolean: true,
			}],
			'space-before-function-paren': ['warn', {
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			}],
			'keyword-spacing': 'error',
			'space-before-blocks': 'error',
		},
	},

	{
		files: ['src/**/*'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.es2020,
			},
		},
	},
	
	// Ignore dist
	{
		ignores: ['**/dist/**', '**/node_modules/**'],
	},
]