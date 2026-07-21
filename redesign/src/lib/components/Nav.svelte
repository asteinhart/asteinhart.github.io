<script>
	import Spacer from './Spacer.svelte';

	let {
		all = false,
		projects = false,
		blog = false,
		docs = false,
		links = false,
		photos = false
	} = $props();
</script>

<Spacer />
<div class="header">
	<div class="name">
		<b
			><a href="/">
				<div>Austin</div>
				<div>Steinhart</div>
			</a></b
		>
	</div>
	<div class="nav">
		<a class:bold={projects | all} href="/projects" data-text={'/projects'}>/projects</a>
		<a class:bold={blog | all} href="/blog" data-text={'/blog'}>/blog</a>
		<a class:bold={links | all} href="/links" data-text={'/links'}>/links</a>
		<a class:bold={photos | all} href="/photos" data-text={'/photos'}>/photos</a>
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		margin-top: calc(var(--cell) * 2);
	}

	a {
		font-size: calc(var(--cell) * 0.7);
	}

	.bold {
		font-weight: bold;
	}

	.nav {
		display: flex;
		gap: 2vw;
		/* align-self: flex-end; */
	}
	/* Create a hidden, bold duplicate of the text */
	a::before {
		content: attr(data-text);
		font-weight: bold;
		visibility: hidden;
		height: 0;
		display: block;
		overflow: hidden;
	}

	a {
		text-decoration: none;
		color: var(--color-text);
	}

	a:hover {
		text-decoration: underline;
	}

	@media (max-width: 600px) {
		.nav {
			gap: 4vw;
		}
	}
</style>
