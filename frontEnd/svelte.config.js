
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
				'/commissions/','/afterdark/commissions/',
				'/artwork/','/afterdark/artwork/',
				'/design/','/afterdark/design/',
				'/afterdark/latest',
				'/afterdark/erotica/',
				'/carrd/','/afterdark/carrd/',
				'/personas','/afterdark/personas',
				'/authors','/afterdark/authors',
				'/members','/afterdark/members'
			],
		},
	},
	preprocess: preprocess(),
};

export default config;
