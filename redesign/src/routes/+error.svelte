<script>
	import Spacer from '$lib/components/Spacer.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { base } from '$app/paths';
</script>

<div class="container">
	<Nav all={true} />
	<Spacer />

	This ain't a page, this is an error. But you can try going back to the <a href="{base}/">home page</a>
	or checking out some of my
	<a href="{base}/projects">projects</a>
	or <a href="{base}/blog">blog posts</a>.
</div>
