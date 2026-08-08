import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { mdsvex } from 'mdsvex';
import { fileURLToPath } from 'node:url';

// The app is served from the domain root. Kept as a named constant because the
// prerender error handler below builds sub-site paths from it.
const BASE_PATH = '';

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

			// Prerendered to plain HTML and served by GitHub Pages.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				// GitHub Pages serves 404.html for any unmatched path. Emitting the
				// app shell there lets the client router boot and render
				// src/routes/+error.svelte instead of GitHub's default 404.
				fallback: '404.html',
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
