<script>
	let { src, alt, caption = null, border = false, height = null } = $props();
</script>

<div class="img-container">
	<div class="blog-img" class:border style="--img-height: {height}">
		<img {src} {alt} />
	</div>
	{#if caption}
		<div class="caption">{caption}</div>
	{/if}
</div>

<style>
	div.img-container {
		margin-bottom: calc(var(--cell));
	}
	.blog-img {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
	}
	.blog-img.border {
		border: 1px solid rgb(0, 0, 0, 0.2);
	}
	.blog-img img {
		max-height: var(--img-height);
		object-fit: contain;
		margin: 0;
	}
	.caption {
		font-size: calc(var(--cell) * 0.6);
		color: rgb(0, 0, 0, 0.5);
		text-align: left;
	}
</style>
