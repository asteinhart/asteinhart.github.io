<script>
	import { onMount } from 'svelte';

	// Table of contents for a blog post. Reads the post's headings from the DOM
	// (rehype-slug already gives each one an id) so nothing has to be kept in sync
	// by hand. Drop `<Toc />` anywhere in a post; `<Toc depth={3} />` includes h3s.
	let { title = 'Table of contents', depth = 2 } = $props();

	let items = $state([]);

	onMount(() => {
		const selector = Array.from({ length: depth - 1 }, (_, i) => `h${i + 2}`).join(',');
		items = Array.from(document.querySelectorAll(`.blog-body :is(${selector})`))
			.filter((h) => h.id)
			.map((h) => ({ id: h.id, text: h.textContent, level: Number(h.tagName[1]) }));
	});
</script>

{#if items.length}
	<nav class="toc" aria-label={title}>
		<div class="toc-title">{title}</div>
		<ul>
			{#each items as item (item.id)}
				<li class:sub={item.level > 2}><a href="#{item.id}">{item.text}</a></li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.toc {
		margin: var(--cell) 0;
		line-height: var(--cell);
	}
	.toc-title {
		font-weight: bold;
	}
	.toc ul {
		list-style: none;
		margin: 0;
		padding: 0;
		padding-left: calc(var(--cell) * 1.2);
		font-size: calc(var(--cell) * 0.68);
	}
	.toc li.sub {
		padding-left: calc(var(--cell) * 1.2);
	}

	a {
		text-decoration: none !important;
	}

	a:hover {
		text-decoration: underline !important;
	}
	@media screen and (max-width: 768px) {
		.toc {
			font-size: calc(var(--cell) * 0.85);
		}
	}
</style>
