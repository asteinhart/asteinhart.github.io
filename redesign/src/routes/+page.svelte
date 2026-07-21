<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Project from '$lib/components/Project.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { PROJECTS } from '$lib/projects.js';
	import { siteConfig } from '$lib/config/site.js';

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

	$inspect(proj_favs, 'proj_favs');
</script>

<Seo
	description="Austin Steinhart uses data, design, and engineering to solve problems and tell stories that matter."
/>

<div class="container">
	<Nav all={true} />
	<Spacer />

	<div class="intro">
		<p>
			using <b>data</b>, <b>design</b>,and <b>engineering</b> to solve problems and tell stories that
			matter
		</p>
		<Spacer />
		<p>
			<b>data visuals editor</b> at the
			<a href="https://www.cfr.org/">council on foreign relations</a>
		</p>
		<p>
			previously, a <b>research engineer</b> at the
			<a href="https://miurban.uchicago.edu/">mansueto institute for urban innovation</a>
			helping academics and journalists understand public transportation, property ownership networks,
			public finance, property taxes, etc. before that the <b>data editor</b> at the
			<a href="https://www.chicagomaroon.com/">chicago maroon</a>,
			<b>analytics</b>
			at the dnc, and <b>youth programming</b> at <a href="https://changeist.org/">changeist</a>
		</p>
		<Spacer />
		<p>
			find me on <a href="https://www.linkedin.com/in/austin-steinhart/">linkedin</a>,
			<a href="https://github.com/asteinhart">github</a>, or reach out via email at asteinhart3 at
			gmail dot com
		</p>
		<Spacer />
		<div class="nav-small">
			<b
				><a href="/projects"
					>explore all projects <span style="font-weight: normal;">&#8599;</span>
				</a></b
			>
			<b><a href="/blog">read the blog <span style="font-weight: normal;">&#8599;</span></a></b>
			<b><a href="/links">follow the links <span style="font-weight: normal;">&#8599;</span></a></b>
		</div>
	</div>
</div>
<Spacer />

<hr class="full-line" />
<Spacer />

<div class="container-projects">
	<hr class="vert-line" />
	<div class="projects">
		{#each proj_favs as project}
			<Project
				tags={project.tags}
				title={project.title}
				img={project.img}
				url={project.url}
				description={project.description}
			/>
		{/each}
	</div>
</div>

<style>
	.nav-small {
		display: flex;
		gap: 3vw;
	}
	.vert-line {
		position: absolute;
		height: 100%;
		left: calc(100% / 2); /*middle of the page*/
		margin: 0;
		transform: rotate(180deg);
	}

	.container-projects {
		position: relative;

		margin-left: calc(var(--cell) * 2);
		margin-right: calc(var(--cell) * 2);
		margin-top: calc(var(--cell) * -1);
	}

	.full-line {
		position: absolute;
		width: 100%;
		margin: 0;
		z-index: 5;
	}

	.projects {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	@media (max-width: 600px) {
		.projects {
			grid-template-columns: 1fr;
		}

		.vert-line {
			display: none;
		}
	}
</style>
