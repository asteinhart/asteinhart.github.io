import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

// The app is served from this subpath so it can live alongside the existing
// static site at the domain root.
const BASE_PATH = '/redesign';

// Pre-built static HTML sub-sites bundled in `static/` (each an `index.html`
// under its own folder). They're plain assets, not SvelteKit routes, so the
// prerender crawler can't resolve their directory index and reports a 404 for
// any internal link into them — even though the files ship in the build.
const STATIC_SUBSITES = ['ai-in-gov', 'docs', 'reading'];

// Markdown blog posts (`.svx`) render into this shared layout. Frontmatter
// (title/description/date/tags) is passed to the layout as props.
const mdsvexOptions = {
	extensions: ['.svx'],
	layout: {
		_: fileURLToPath(new URL('./src/lib/layouts/BlogPost.svelte', import.meta.url))
	}
};

export default defineConfig({
	server: {
		open: true // Automatically opens the browser
	},

	plugins: [
		sveltekit({
			// Every internal link and asset resolves against this base.
			paths: { base: BASE_PATH },

			prerender: {
				// Don't fail the build when the crawler can't resolve a link into
				// one of the bundled static sub-sites (see STATIC_SUBSITES). Every
				// other broken internal link still throws, which is what caught the
				// base-path link bugs in the first place.
				handleHttpError: ({ status, path, message }) => {
					const isSubsite = STATIC_SUBSITES.some(
						(dir) => path === `${BASE_PATH}/${dir}` || path.startsWith(`${BASE_PATH}/${dir}/`)
					);
					if (status === 404 && isSubsite) return;
					throw new Error(message);
				}
			},

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
		}),
		{
			name: 'watch-static',
			handleHotUpdate({ file, server }) {
				if (file.includes('/static/')) {
					server.ws.send({ type: 'full-reload' });
				}
			}
		}
	]
});
