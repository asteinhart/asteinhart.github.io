<script>
	// mobileSrc: optional alternate image used at the mobile breakpoint (≤768px)
	let { src, alt, caption = null, border = false, mobileSrc = null } = $props();
</script>

<div class="img-container">
	<div class="blog-img" class:border>
		<picture>
			{#if mobileSrc}
				<source media="(max-width: 768px)" srcset={mobileSrc} />
			{/if}
			<img {src} {alt} />
		</picture>
	</div>
	{#if caption}
		<div class="caption">{caption}</div>
	{/if}
</div>

<style>
	div.img-container {
		margin-bottom: calc(var(--cell));
	}
	/* The box is a whole number of cells — the 16:9 box for the body column's
	   width — so the text below always lands back on the baseline grid. A ~16:9
	   image fills it; anything else letterboxes inside it via object-fit. */
	.blog-img {
		height: calc(var(--cell) * 15); /* 27 cells wide ÷ 16:9 ≈ 15 */
		margin: 0;
	}
	/* outline, not border: a border adds 2px to the box and pushes everything
	   below it off the grid. */
	.blog-img.border {
		outline: 1px solid rgb(0, 0, 0, 0.2);
	}
	.blog-img picture {
		display: block;
		width: 100%;
		height: 100%;
	}
	.blog-img img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
		margin: 0;
	}
	.caption {
		font-size: calc(var(--cell) * 0.6);
		color: rgb(0, 0, 0, 0.5);
		text-align: left;
	}

	@media screen and (max-width: 768px) {
		.blog-img {
			height: calc(var(--cell) * 9); /* ~16 cells wide ÷ 16:9 = 9 */
		}
	}
</style>
