<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { PHOTO_IDS } from '$lib/photos.js';

	const src = (id) => `https://lh3.googleusercontent.com/d/${id}`;
</script>

<Seo title="Photos" description="A collection of photos by Austin Steinhart." />

<div class="container">
	<Nav photos={true} />
	<Spacer />
</div>

<div class="container">
	<Spacer />
	<div class="gallery">
		{#each PHOTO_IDS as id}
			<img src={src(id)} alt="" loading="lazy" referrerpolicy="no-referrer" />
		{/each}
	</div>
</div>

<style>
	.full-line {
		position: absolute;
		width: 100%;
		margin: 0;
		z-index: 5;
	}

	.full-line.below {
		margin-top: calc(var(--cell));
	}

	/* Masonry via CSS columns; gutters are one grid cell so photos line up
	   with the page's background grid. */
	.gallery {
		column-count: 3;
		column-gap: var(--cell);
	}

	.gallery img {
		display: block;
		width: 100%;
		margin-bottom: var(--cell);
		break-inside: avoid;
	}

	@media screen and (max-width: 768px) {
		.gallery {
			column-count: 1;
		}
	}
</style>
