import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

// Markdown blog posts (`.svx`) render into this shared layout. Frontmatter
// (title/description/date/tags) is passed to the layout as props.
const mdsvexOptions = {
	extensions: ['.svx'],
	layout: {
		_: fileURLToPath(new URL('./src/lib/layouts/BlogPost.svelte', import.meta.url))
	}
};

export default defineConfig({
	plugins: [
		sveltekit({
			// Treat `.svx` files as routes/components in addition to `.svelte`.
			extensions: ['.svelte', '.svx'],
			preprocess: [mdsvex(mdsvexOptions)],
			compilerOptions: {
				// Force runes mode for the project, except for libraries and mdsvex
				// output (`.svx`), whose generated wrapper still uses legacy `$$props`.
				// Those fall back to auto-detection. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') || filename.endsWith('.svx')
						? undefined
						: true
			},

			// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
			// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
			// See https://svelte.dev/docs/kit/adapters for more information about adapters.
			adapter: adapter({
				// default options are shown. On some platforms
				// these options are set automatically — see below
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: true
			})
		})
	]
});
