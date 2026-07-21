<script>
	import Tag from '$lib/components/Tag.svelte';
	import Spacer from './Spacer.svelte';

	let { tags, title, img, description = null, url } = $props();
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
	<div class="tags">
		{#each tags as tag, index}
			{#if index >= 0}
				<Tag name={tag} />
			{/if}
		{/each}
	</div>
	<div class="title">{title} <span style="font-weight: normal;">&#8599;</span></div>
	<Spacer />
	{#if img.endsWith('.webm')}
		<video autoplay loop muted><source src={img} type="video/webm" /></video>
	{:else}
		<img src={img} alt={title} />
	{/if}
	{#if description}
		<Spacer />
		<div class="description">
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
	}

	img,
	video {
		width: 100%;
		height: calc(var(--cell) * 12);
		object-fit: cover;
		outline: 1px solid rgb(0, 0, 0, 0.2);
	}

	.description p {
		font-size: calc(var(--cell) * 0.65);
		color: rgb(0, 0, 0, 0.7);
		letter-spacing: -0.03em;
		padding-left: calc(var(--cell) * 0.1);
	}
</style>
