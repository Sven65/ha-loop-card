import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/loop-card.ts',
	output: {
		file: 'dist/loop-card.js',
		format: 'es'
	},
	plugins: [
		json(),
		resolve(),
		typescript()
	]
};

