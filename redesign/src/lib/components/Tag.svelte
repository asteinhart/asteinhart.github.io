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
		color: rgb(0, 0, 0, 0.65);
		font-size: calc(var(--cell) * 0.6);
		height: calc(var(--cell) * 0.85);
		padding-inline: calc(var(--cell) * 0.15);
		border: none;
		background: none;
		cursor: cell;
	}
	.tag-text {
		display: flex;
		align-items: center;
		height: 100%;
		letter-spacing: -0.02em;
	}
	.tag.active {
		border: 2px solid rgb(0, 0, 0, 0.25);
	}

	@media screen and (max-width: 768px) {
		.tag.active {
			border: 1.5px solid rgb(0, 0, 0, 0.3);
		}
		.tag {
			font-size: calc(var(--cell) * 0.7);
			padding-inline: calc(var(--cell) * 0.19);
			padding-block: calc(var(--cell) * 0.4);
		}
	}
</style>
