import { base } from '$app/paths';
import { BLOGS } from './blogs.js';

// Native posts are authored in Markdown at src/routes/blog/<slug>/+page.svx.
// mdsvex exposes each post's frontmatter as the module's `metadata` export;
// `import: 'metadata'` pulls only that object, not the whole component.
const modules = import.meta.glob('/src/routes/blog/*/+page.svx', {
	eager: true,
	import: 'metadata'
});

const nativePosts = Object.entries(modules).map(([path, meta]) => {
	const slug = path.split('/').at(-2); // .../blog/<slug>/+page.svx
	meta = meta ?? {};
	return {
		slug,
		url: `${base}/blog/${slug}`,
		title: meta.title ?? slug,
		description: meta.description ?? '',
		date: meta.date ?? '',
		tags: meta.tags ?? [],
		external: false,
		draft: meta.draft ?? false
	};
});

// External write-ups that live on other sites (hand-maintained in blogs.js).
const externalPosts = Object.entries(BLOGS).map(([slug, post]) => ({
	slug,
	external: true,
	draft: false,
	...post
}));

// Normalize "07/02/2026" (external), "2026-07-02" (frontmatter string), and
// Date objects (unquoted YAML dates) to a comparable timestamp.
function toTime(date) {
	if (!date) return 0;
	const d = date instanceof Date ? date : new Date(date);
	return isNaN(d) ? 0 : d.getTime();
}

// Render any of the above as mm/dd/yyyy for the blog index.
function displayDate(date) {
	if (!date) return '';
	if (typeof date === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(date)) return date;
	const d = date instanceof Date ? date : new Date(`${date}T00:00:00`);
	if (isNaN(d)) return String(date);
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');
	return `${mm}/${dd}/${d.getFullYear()}`;
}

export const POSTS = [...nativePosts, ...externalPosts]
	.filter((p) => !p.draft)
	.map((p) => ({ ...p, displayDate: displayDate(p.date) }))
	.sort((a, b) => toTime(b.date) - toTime(a.date));
