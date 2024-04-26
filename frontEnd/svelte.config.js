
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';
import path from 'path';

const config = {
	kit: {
		adapter: adapter({
			fallback: 'app.html' }),
		alias: {
			$routes: 		path.resolve('./src/routes'),
			$root: 			path.resolve('./src'),
		},
		prerender: {
			crawl: true,
			entries: [
				'*','/','/afterdark/',
				'/featured/','/afterdark/featured/',

				'/afterdark/latest',
				'/artwork/','/afterdark/artwork/',
				'/design/','/afterdark/design/',
				'/workshop','/afterdark/workshop/',

				'/afterdark/erotica/',

				'/personas','/afterdark/personas',

				'/carrd/','/afterdark/carrd/',
				'/commissions/','/afterdark/commissions/',
				'/authors','/afterdark/authors',
				'/members','/afterdark/members'
			],
		},
	},
	preprocess: preprocess(),
};

export default config;
