
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			$routes: 		path.resolve('./src/routes'),
			$stores: 		path.resolve('./src/controllers'),

			$cms:			path.resolve('./cms'),
			$root: 			path.resolve('./src'),
		}
	},
	preprocess: preprocess(),
	optimizeDeps: {
		exclude: ['svelte-bricks']
	},
};

export default config;
