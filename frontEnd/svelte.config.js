
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

const config = {
	kit: {
		adapter: adapter({
			fallback: 'fallback.html' }),
		alias: {
			$routes: 		path.resolve('./src/routes'),
			$root: 			path.resolve('./src'),
		},
		prerender: {
			entries: [
				'*','/','/nsfw/',
				'/home/','/nsfw/home/',
				'/commissions/','/nsfw/commissions/',
				'/carrd/','/nsfw/carrd/',
				'/artwork/','/nsfw/artwork/',
				'/design/','/nsfw/design/',
				'/erotica/'
			],
		},
	},
	preprocess: preprocess(),
};

export default config;
