
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

const config = {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		alias: {
			$routes: 		path.resolve('./src/routes'),
			$root: 			path.resolve('./src'),
		},
		prerender: {
			entries: ["/sfw/home",'/nsfw/home','/home']
		}
	},
	preprocess: preprocess(),
};

export default config;
