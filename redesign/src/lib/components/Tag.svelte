<script>
	let { name = '', active = true, onclick = () => {} } = $props();
</script>

<div class="tag-container">
	<button class="tag" class:active {onclick}>
		<div class="tag-text">{name.toLowerCase()}</div>
	</button>
</div>

<style>
	.tag-container {
		display: flex;
		align-items: center;
		justify-content: center;
		height: calc(var(--cell));
	}
	.tag {
		color: rgb(0, 0, 0, 0.7);
		font-size: calc(var(--cell) * 0.6);
		height: calc(var(--cell) * 0.8);
		padding-inline: calc(var(--cell) * 0.15);
		border: none;
		background: none;
	}
	.tag-text {
		display: flex;
		align-items: center;
		height: 100%;
	}
	.tag.active {
		border: 2px solid rgb(0, 0, 0, 0.5);
	}
</style>
