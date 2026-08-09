<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import ProjectGrid from '$lib/components/ProjectGrid.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { PROJECTS } from '$lib/projects.js';
	import { siteConfig } from '$lib/config/site.js';
	import { base } from '$app/paths';

	const personJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: siteConfig.name,
		url: siteConfig.url,
		sameAs: ['https://www.linkedin.com/in/austin-steinhart/', 'https://github.com/asteinhart']
	};
	const favs = [
		'stories_nyc_mapped',
		'food-weap',
		'scrollytelling',
		'mapping-uchi',
		'thesunset',
		'great_aid_recession'
	];

	let projects = $state(PROJECTS);

	let proj_favs = $derived.by(() => {
		return favs.map((key) => PROJECTS[key]).filter(Boolean);
	});

	//$inspect(proj_favs, 'proj_favs');
</script>

<Seo
	description="Austin Steinhart uses data, design, and engineering to solve problems and tell stories that matter."
/>

<div class="container">
	<Nav />
	<Spacer />

	<div class="intro">
		<p>
			using <b>data</b>, <b>design</b>, and <b>engineering</b> to solve problems and tell stories that
			matter
		</p>
		<Spacer />
		<p>
			<b>data visuals editor</b> at the
			<a href="https://www.cfr.org/">
				council on<br class="mobile-break" /> foreign relations</a
			>
		</p>
		<p>
			previously, a <b>research engineer</b> at the
			<a href="https://miurban.uchicago.edu/">mansueto institute for urban innovation</a>
			helping academics and journalists understand public transportation, property ownership networks,
			public finance, property taxes, etc. before that, the <b>data editor</b> at the
			<a href="https://www.chicagomaroon.com/">chicago maroon</a>,
			<b>analytics</b>
			at the dnc, and <b>youth programming</b> at <a href="https://changeist.org/">changeist</a>
		</p>
		<Spacer />
		<p>
			find me on <a class="nav-link" href="https://www.linkedin.com/in/austin-steinhart/"
				>linkedin</a
			>,
			<a class="nav-link" href="https://github.com/asteinhart">github</a>, or reach out via email at
			asteinhart3 at gmail dot com
		</p>
		<p>
			follow my work via <a class="nav-link" href="{base}/rss.xml">rss</a> or
			<a class="nav-link" href="https://buttondown.com/asteinhart">email subscription</a>
		</p>
		<Spacer />
		<div class="nav-small">
			<b
				><a href="{base}/projects"
					>explore all projects <span style="font-weight: normal;">&#8599;&#xFE0E;</span>
				</a></b
			>
			<b
				><a href="{base}/blog"
					>read the blog <span style="font-weight: normal;">&#8599;&#xFE0E;</span></a
				></b
			>
			<b
				><a href="{base}/links"
					>follow the links <span style="font-weight: normal;">&#8599;&#xFE0E;</span></a
				></b
			>
		</div>
	</div>
</div>
<Spacer />

<hr class="full-line" />
<Spacer />

<ProjectGrid projects={proj_favs} />

<style>
	.nav-small {
		display: flex;
		gap: 3vw;
	}

	.intro {
		width: 80%;
	}

	.nav-link {
		text-decoration: underline;
	}

	.mobile-break {
		display: none;
	}

	.full-line {
		position: absolute;
		width: 100%;
		margin: 0;
		z-index: 5;
	}

	@media screen and (max-width: 768px) {
		.intro {
			width: 100%;
		}

		.nav-small {
			flex-direction: column;
			gap: 0;
		}

		.mobile-break {
			display: initial;
		}
	}
</style>
