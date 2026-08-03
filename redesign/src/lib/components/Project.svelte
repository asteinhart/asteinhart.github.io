<script>
	import Tag from '$lib/components/Tag.svelte';
	import Spacer from './Spacer.svelte';

	let { tags, title, img, description = null, url, muted = false, imgScale = 'cover' } = $props();
	function createMediaElement(imageSrc, title) {
		if (imageSrc.endsWith('.webm')) {
			return `<video autoplay loop muted><source src="${imageSrc}" type="video/webm"></video>`;
		} else {
			return `<img src="${imageSrc}" alt="${title}">`;
		}
	}
</script>

<div class="project">
	<a href={url} target="_blank" rel="noopener noreferrer" class="card-link"></a>
	<div class="tags" class:muted>
		{#each tags as tag, index}
			{#if index >= 0}
				<Tag name={tag} />
			{/if}
		{/each}
	</div>
	<div class="title" class:muted>
		{title} <span style="font-weight: normal;">&#8599;</span>
	</div>
	<Spacer />
	<div class="media" class:muted style="--img-fit: {imgScale}">
		{#if img.endsWith('.webm')}
			<video autoplay loop muted><source src={img} type="video/webm" /></video>
		{:else}
			<img src={img} alt={title} />
		{/if}
	</div>
	{#if description}
		<Spacer />
		<div class="description" class:muted>
			<p>{description}</p>
		</div>
	{/if}
</div>

<style>
	.project {
		position: relative;
		display: flex;
		padding: calc(var(--cell));
		flex-direction: column;
		box-shadow: 0 1px 0 0 rgb(0, 0, 0, 0.5);
		/* allow the card to shrink below its media's intrinsic width so the
		   grid track can't blow past its half-share and shift the column */
		min-width: 0;
	}

	a.card-link {
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.muted {
		opacity: 0.4;
	}

	.tags {
		display: flex;
		gap: calc(var(--cell) * 0.5);
		padding-left: calc(var(--cell) * 0.1);
	}

	.title {
		font-weight: 700;
		font-size: calc(var(--cell) * 0.8);
		/* color: rgb(0, 0, 0, 0.9); */
		padding-left: calc(var(--cell) * 0.1);
		min-height: calc(var(--cell) * 2);
	}

	.media {
		/* fixed cell-multiple height keeps the card on the baseline grid;
		   at ~21 cells wide this box reads as 16:9 */
		height: calc(var(--cell) * 12);
	}

	.media img,
	.media video {
		width: 100%;
		height: 100%;
		object-fit: var(--img-fit, cover);
		outline: 1px solid rgb(0, 0, 0, 0.2);
	}

	.description p {
		font-size: calc(var(--cell) * 0.65);
		color: rgb(0, 0, 0, 0.7);
		letter-spacing: -0.03em;
		padding-left: calc(var(--cell) * 0.1);
	}

	@media screen and (max-width: 768px) {
		.project {
			padding: 0;
			padding-block: calc(var(--cell));
			box-shadow: none;
		}

		.title {
			min-height: calc(var(--cell));
		}

		/* single full-width column is ~16 cells wide, so a 9-cell box is
		   exactly 16:9 and stays on the baseline grid */
		.media {
			height: calc(var(--cell) * 9);
		}
	}
</style>
