import adapter from '@sveltejs/adapter-node';
import { mdsvex } from 'mdsvex';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [sveltePreprocess(), mdsvex()],
	kit: {
		adapter: adapter() 
	},
	extensions: ['.svelte', '.svx']
};

export default config;
