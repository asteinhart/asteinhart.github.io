<script>
	import { page } from '$app/state';
	import { siteConfig } from '$lib/config/site';

	let {
		title = '',
		description = siteConfig.description,
		image = siteConfig.ogImage,
		type = 'website',
		jsonLd = null
	} = $props();

	// "Projects · Austin Steinhart" on inner pages, just the name on the home page.
	const fullTitle = $derived(title ? `${title} · ${siteConfig.name}` : siteConfig.name);
	const canonical = $derived(siteConfig.url + page.url.pathname);
	// Resolve relative image paths (e.g. "/og.png") to absolute URLs for crawlers.
	const ogImage = $derived(image ? (image.startsWith('http') ? image : siteConfig.url + image) : '');
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={canonical} />

	<!-- Open Graph -->
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={siteConfig.name} />
	{#if ogImage}
		<meta property="og:image" content={ogImage} />
	{/if}

	<!-- Twitter -->
	<meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	{#if ogImage}
		<meta name="twitter:image" content={ogImage} />
	{/if}

	<!-- Structured data -->
	{#if jsonLd}
		{@html '<script type="application/ld+json">' + JSON.stringify(jsonLd) + '<\/script>'}
	{/if}
</svelte:head>
