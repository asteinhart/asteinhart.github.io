<script>
	// Example custom component for use inside Markdown posts.
	let { type = 'note', children } = $props();
</script>

<aside class="callout {type}">
	{@render children()}
</aside>

<style>
	.callout {
		margin: var(--cell) 0;
		padding: calc(var(--cell) * 0.4) calc(var(--cell) * 0.7);
		border-left: 3px solid rgba(0, 0, 0, 0.7);
		background: rgba(0, 0, 0, 0.04);
		font-size: calc(var(--cell) * 0.65);
		line-height: var(--cell);
	}
	.callout.warn {
		border-left-color: #c0392b;
	}
</style>
