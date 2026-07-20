<script>
	import Tag from '$lib/components/Tag.svelte';
	import Spacer from './Spacer.svelte';

	let { tags, title, img, description = null, url } = $props();
</script>

<div class="project">
	<a href={url} target="_blank" rel="noopener noreferrer" class="card-link"></a>
	<div class="tags">
		{#each tags as tag, index}
			{#if index > 0}
				<Tag name={tag} />
			{/if}
		{/each}
	</div>
	<div class="title">{title}</div>
	<img src={img} alt={title} />
	{#if description}
		<Spacer />
		<p>{description}</p>
	{/if}
</div>

<style>
	.project {
		position: relative;
		display: flex;
		padding: calc(var(--cell));
		flex-direction: column;
		outline: 1px solid #000000;
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
		gap: calc(var(--cell) * 1);
	}

	.title {
		font-size: 1rem;
		font-weight: bold;
		margin-bottom: calc(var(--cell) * 1);
	}

	img {
		width: 100%;
		height: auto;
		object-fit: cover;
	}
</style>
