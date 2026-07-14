<script>
	import favicon from '$lib/assets/favicon.svg';
	import '../global.css';

	import Nav from '$lib/components/Nav.svelte';
 

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>


<hr class="top" />
<hr class="side-left" />
<hr class="side-right" />

<Nav/>

<div class="container">
{@render children()}
</div>


<style>
	
	.side-left {
		position: fixed;
		top: 0;
		left: 0;
		transform: rotate(180deg);
		margin-left: 4vw;
		height: 100%;
		stroke: var(--color-text);
	}

	.side-right {
		position: fixed;
		top: 0;
		right: 0;
		margin-right: 4vw;
		transform: rotate(180deg);
		height: 100%;
		stroke: var(--color-text);
	}

	.top {
		width: 100%;
		margin-top: 4vw;
		margin-bottom: 4vw;
		stroke: var(--color-text);
	}

	.container {
		margin-left: 6.5vw;
		margin-right: 6.5vw;
	}
</style>
