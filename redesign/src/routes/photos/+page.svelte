<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Seo from '$lib/components/Seo.svelte';
</script>

<Seo title="Photos" description="A collection of photos by Austin Steinhart." />

<div class="container">
	<Nav photos={true} />
	<Spacer />
	<div class="spacer"></div>

	photos
</div>
