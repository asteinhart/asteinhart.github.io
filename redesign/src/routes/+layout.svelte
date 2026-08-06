<script>
	import { tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';

	import '../global.css';

	let { children } = $props();

	// count.js counts the initial page load on its own, but SvelteKit swaps pages
	// client-side without a reload, so every navigation after that has to be
	// counted by hand — otherwise only the entry page ever shows up.
	afterNavigate(async (nav) => {
		if (nav.type === 'enter') return; // the full page load count.js already counted

		// Let <svelte:head> flush so the canonical link and title count.js reads
		// belong to the page we just navigated to, not the one we left.
		await tick();

		// Empty referrer: document.referrer still holds whatever sent the visitor
		// to the site, and reusing it here would re-credit that source on every
		// internal click.
		window.goatcounter?.count?.({ referrer: '' });
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="app">
	<hr class="top" />
	<hr class="side-left" />
	<hr class="side-right" />

	<main class="content">
		{@render children()}
	</main>
	<!-- <Footer /> -->
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100%; /* fallback if round() unsupported */
		/* snap to the grid so the footer's bottom edge lands on a --cell line */
		min-height: round(down, 100vh, var(--cell));
		/* positioning context for the rails/lines: :root has container-type, which
		   makes it the containing block for fixed descendants — so anchor the lines
		   to .app (content width) instead, and let them span the full document. */
		position: relative;
	}

	/* grows to fill leftover space so the footer lands at the bottom of max(content, viewport) */
	.content {
		flex: 1 0 auto;
	}

	.side-left {
		position: absolute;
		top: 0;
		left: 0;
		margin-left: calc(var(--cell) * 2);
		height: 100%;
		width: var(--line-width);
	}

	.side-right {
		position: absolute;
		top: 0;
		/* anchor from the left and snap to the grid (grid originates at the left edge) */
		left: calc(100% - var(--cell) * 2); /* fallback if round() unsupported */
		left: round(100% - var(--cell) * 2, var(--cell));
		height: 100%;
		width: var(--line-width);
	}

	.top {
		position: absolute;
		top: 0;
		width: 100%;
		margin-top: calc(var(--cell) * 2);
	}

	@media screen and (max-width: 768px) {
		.top {
			margin-top: calc(var(--cell) * 1);
		}

		.side-left {
			margin-left: calc(var(--cell) * 1);
		}
		.side-right {
			left: calc(100% - var(--cell) * 1); /* fallback if round() unsupported */
			left: round(100% - var(--cell) * 1, var(--cell));
		}
	}
</style>
