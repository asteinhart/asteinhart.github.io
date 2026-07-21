<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Project from '$lib/components/Project.svelte';
	import Tag from '$lib/components/Tag.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { PROJECTS } from '$lib/projects.js';

	let projects = $state(PROJECTS);
	let filter = $state('all');
	let view = $state('visual');
	let allTags = $derived.by(() => {
		const tagsSet = new Set();
		Object.values(projects).forEach((project) => {
			project.tags.forEach((tag) => tagsSet.add(tag));
		});
		//sort
		return Array.from(tagsSet).sort();
	});

	let filteredProjects = $derived.by(() => {
		if (filter === 'all') {
			return Object.values(projects);
		} else {
			return Object.values(projects).sort((a, b) =>
				a.tags.map((t) => t.toLowerCase()).includes(filter.toLowerCase()) &&
				!b.tags.map((t) => t.toLowerCase()).includes(filter.toLowerCase())
					? -1
					: a.tags.map((t) => t.toLowerCase()).includes(filter.toLowerCase()) &&
						  b.tags.map((t) => t.toLowerCase()).includes(filter.toLowerCase())
						? 0
						: 1
			);
		}
	});

	$inspect(allTags, 'allTags');
	$inspect(filteredProjects, 'filteredProjects');
	$inspect(filter, 'filter');
</script>

<Seo
	title="Projects"
	description="Data visualization, design, and engineering projects by Austin Steinhart, spanning journalism, urban research, and civic data."
/>

<div class="container">
	<Nav projects={true} />
	<Spacer />
</div>

<div class="container">
	<div class="filter-container">
		<div class="filters">
			filter by:
			<Tag name="all" active={filter === 'all'} onclick={() => (filter = 'all')} />
			{#each allTags as tag}
				<Tag
					name={tag.toLowerCase()}
					active={filter.toLowerCase() === tag.toLowerCase()}
					onclick={() => (filter = tag.toLowerCase())}
				/>
			{/each}
		</div>
		<div class="views">
			show as:
			<Tag name="visual" active={view === 'visual'} onclick={() => (view = 'visual')} />
			<Tag name="list" active={view === 'list'} onclick={() => (view = 'list')} />
		</div>
	</div>
</div>
<Spacer />
<hr class="full-line above" />

{#if view === 'visual'}
	<Spacer />

	<div class="container-projects">
		<hr class="vert-line" />
		<div class="projects">
			{#each filteredProjects as project}
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
{:else if view === 'list'}
	<hr class="full-line below" />
	<div class="container">
		<table>
			<thead>
				<tr>
					<th scope="col">project</th>
					<th scope="col">tags</th>
				</tr>
			</thead>
			<tbody>
				{#each filteredProjects as project}
					<tr
						class:active={filter === 'all' ||
							project.tags.map((t) => t.toLowerCase()).includes(filter.toLowerCase())}
					>
						<td
							><a href={project.url} target="_blank" rel="noopener noreferrer"
								>{project.title} &#8599;</a
							></td
						>
						<td>{project.tags.join(', ').toLowerCase()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

<style>
	.filter-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.filters {
		display: flex;
		gap: 1rem;
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

	.projects {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	button.view {
		background: none;
		border: none;
		cursor: pointer;
	}

	tbody tr td,
	tbody tr td a {
		color: rgb(0, 0, 0, 0.2);
	}

	tbody tr.active td,
	tbody tr.active td a {
		color: rgb(0, 0, 0, 0.7);
	}

	.views {
		display: flex;
		gap: 1rem;
		margin-right: 0.5rem;
	}

	button.view.active {
		border: 2px solid rgb(0, 0, 0, 0.7);
	}

	.full-line {
		position: absolute;
		width: 100%;
		margin: 0;
		z-index: 5;
	}

	.full-line.below {
		margin-top: calc(var(--cell));
	}

	th,
	td {
		text-align: left;
		padding-right: calc(var(--cell) * 3);
		font-size: calc(var(--cell) * 0.72);
	}
</style>
