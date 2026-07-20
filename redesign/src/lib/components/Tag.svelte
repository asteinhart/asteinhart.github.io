<script>
	let { name } = $props();
</script>

<div class="tag">
	{name}
</div>

<style>
	.tag {
		display: inline-block;
		color: rgb(0, 0, 0, 0.7);
		background-color: var(--color-accent);
		border: 1px solid rgb(0, 0, 0, 0.7);
		font-size: 0.8rem;
		height: calc(var(--cell));
		padding-inline: calc(var(--cell) * 0.1);
	}
</style>
