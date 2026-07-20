<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../global.css';
	import Nav from '$lib/components/Nav.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<hr class="top" />
<hr class="side-left" />
<hr class="side-right" />

{@render children()}

<style>
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
