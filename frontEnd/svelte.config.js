
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

const config = {
	kit: {
		adapter: adapter({
			fallback: 'error.html' }),
		alias: {
			$routes: 		path.resolve('./src/routes'),
			$root: 			path.resolve('./src'),
		},
		prerender: {
			crawl: true,
			entries: [
				'*','/','/afterdark/',
				'/featured/','/afterdark/featured/',
				'/commissions/','/afterdark/commissions/',
				'/carrd/','/afterdark/carrd/',
				'/artwork/','/afterdark/artwork/',
				'/design/','/afterdark/design/',
				'/afterdark/erotica/','/afterdark/erotica/[slug]'
			],
		},
	},
	preprocess: preprocess(),
};

export default config;
