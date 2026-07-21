<script>
	import favicon from '$lib/assets/favicon.svg';
	import Footer from '$lib/components/Footer.svelte';

	import '../global.css';

	let { children } = $props();
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
		min-height: 100vh; /* fallback if round() unsupported */
		/* snap to the grid so the footer's bottom edge lands on a --cell line */
		min-height: round(down, 100vh, var(--cell));
	}

	/* grows to fill leftover space so the footer lands at the bottom of max(content, viewport) */
	.content {
		flex: 1 0 auto;
	}

	.side-left {
		position: fixed;
		top: 0;
		left: 0;
		transform: rotate(180deg);
		margin-left: calc(var(--cell) * 2);
		height: 100%;
		stroke: var(--color-text);
	}

	.side-right {
		position: fixed;
		top: 0;
		/* anchor from the left and snap to the grid (grid originates at the left edge) */
		left: calc(100% - var(--cell) * 2); /* fallback if round() unsupported */
		left: round(100% - var(--cell) * 2, var(--cell));
		height: 100%;
	}

	.top {
		position: absolute;
		top: 0;
		width: 100%;
		margin-top: calc(var(--cell) * 2);
	}

	@media (max-width: 600px) {
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
