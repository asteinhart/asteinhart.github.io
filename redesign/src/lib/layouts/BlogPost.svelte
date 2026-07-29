<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Seo from '$lib/components/Seo.svelte';

	// Frontmatter from each post is passed in as props by mdsvex.
	let { title = '', description = '', date = '', author = 'Austin Steinhart', children } = $props();

	// Accepts ISO strings ("2025-07-13"), Date objects (unquoted YAML dates),
	// or an already-formatted string, and renders "July 13, 2025".
	const formattedDate = $derived.by(() => {
		if (!date) return '';
		const d = date instanceof Date ? date : new Date(`${date}T00:00:00`);
		return isNaN(d)
			? String(date)
			: d.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric'
				});
	});
</script>

<Seo {title} {description} type="article" />

<div class="container">
	<Nav blog={true} />
</div>
<Spacer />

<div class="blog">
	<div class="blog-container">
		<h1 class="blog-title">{title}</h1>
		{#if description}
			<div class="blog-desc">{description}</div>
		{/if}
		<div class="blog-byline">
			By <a href="/">{author}</a>
			{#if formattedDate}
				| {formattedDate}{/if}
		</div>
		<Spacer />

		<hr class="full-line" />
	</div>
	<Spacer />

	<div class="blog-container">
		<div class="blog-body">
			{@render children()}
		</div>
	</div>
	<Spacer />
</div>

<style>
	.blog :global(h1),
	.blog :global(h2),
	.blog :global(h3),
	.blog :global(p) {
		margin: 0;
		line-height: calc(var(--cell));
		margin-bottom: calc(var(--cell));
		width: 100%;
	}

	/* Body column: change --text-width to tune. Centered on the page,
	   text stays left-aligned inside the column. */
	.blog-container {
		--text-width: calc(var(--cell) * 25.9); /* 26 of 50 cells → 14-cell margins */
		width: var(--text-width);
		margin-inline: auto;
	}

	@media screen and (max-width: 768px) {
		.blog-container {
			--text-width: calc(var(--cell) * 18); /* 18 of 20 cells → 1-cell margins */
		}
	}

	h1 .blog-title {
		font-size: calc(var(--cell) * 0.9);
		font-weight: bold;
		margin: 0;
	}
	.blog-desc {
		font-size: calc(var(--cell) * 0.7);
	}
	.blog-byline {
		font-size: calc(var(--cell) * 0.55);
	}

	.full-line {
		margin-left: calc(var(--cell) * -10);
		margin-right: calc(var(--cell) * -10);
	}

	.blog-body :global(img) {
		width: 100%;
		height: auto;
		display: block;
		margin: var(--cell) 0;
	}

	.blog-body :global(ul),
	.blog-body :global(ol) {
		margin: 0 0 var(--cell);
		padding-left: calc(var(--cell) * 1.2);
	}

	.blog-body :global(a) {
		text-decoration: underline;
	}

	.blog-body :global(hr) {
		margin: var(--cell) 0;
	}

	.blog-body :global(blockquote) {
		margin: var(--cell) 0;
		padding-left: calc(var(--cell) * 0.6);
		border-left: 2px solid rgba(0, 0, 0, 0.3);
		font-style: italic;
	}

	.blog-body :global(code) {
		font-family: ui-monospace, 'SF Mono', Menlo, monospace;
		font-size: 0.9em;
		background: rgba(0, 0, 0, 0.05);
		padding: 0.1em 0.3em;
	}

	.blog-body :global(pre) {
		margin: var(--cell) 0;
		padding: calc(var(--cell) * 0.5);
		background: rgba(0, 0, 0, 0.05);
		overflow-x: auto;
		line-height: 1.5;
	}
	.blog-body :global(pre code) {
		background: none;
		padding: 0;
	}
</style>
