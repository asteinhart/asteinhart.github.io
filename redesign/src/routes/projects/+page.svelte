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
		const matches = (project) =>
			project.tags.map((t) => t.toLowerCase()).includes(filter.toLowerCase());

		if (filter === 'all') {
			return Object.values(projects).map((p) => ({ ...p, muted: false }));
		}

		return Object.values(projects)
			.map((p) => ({ ...p, muted: !matches(p) }))
			.sort((a, b) => (matches(a) === matches(b) ? 0 : matches(a) ? -1 : 1));
	});

	// $inspect(allTags, 'allTags');
	// $inspect(filteredProjects, 'filteredProjects');
	// $inspect(filter, 'filter');
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
			<span class="label"><b>filter by:</b></span>
			<div class="tag-list">
				<Tag name="all" active={filter === 'all'} onclick={() => (filter = 'all')} />
				{#each allTags as tag}
					<Tag
						name={tag.toLowerCase()}
						active={filter.toLowerCase() === tag.toLowerCase()}
						onclick={() => (filter = tag.toLowerCase())}
					/>
				{/each}
			</div>
		</div>
		<div class="views">
			<span class="label"><b>show as:</b></span>
			<div class="tag-list">
				<Tag name="visual" active={view === 'visual'} onclick={() => (view = 'visual')} />
				<Tag name="list" active={view === 'list'} onclick={() => (view = 'list')} />
			</div>
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
					imgScale={project.imgScale}
					url={project.url}
					description={project.description}
					muted={project.muted}
				/>
				<hr class="divider" />
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
<Spacer />
<Spacer />

<style>
	.filter-container {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.filters {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.tag-list {
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

	.divider {
		display: none;
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
		align-items: center;
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

	table {
		border-collapse: collapse;
	}

	th,
	td {
		text-align: left;
		vertical-align: top;
		padding-right: calc(var(--cell));
		font-size: calc(var(--cell) * 0.7);
		height: calc(var(--cell));
	}

	@media screen and (max-width: 768px) {
		.filter-container {
			display: grid;
			grid-template-columns: auto 1fr;
			column-gap: 1rem;
			/* row-gap kept a whole multiple of --cell so rows stay on the baseline grid */
			row-gap: 0;
			align-items: start;
		}

		.filters,
		.views {
			/* drop the wrappers so label + tag-list become direct grid items,
			   letting both rows share the same two columns */
			display: contents;
		}

		.tag-list {
			flex-wrap: wrap;
			/* row-gap 0: each tag row is exactly --cell tall, so wrapped rows
			   land on the baseline grid. column-gap doesn't affect the baseline. */
			gap: 0 0.5rem;
		}

		.projects {
			grid-template-columns: 1fr;
		}

		.vert-line {
			display: none;
		}

		.divider {
			display: block;
			margin-left: calc(var(--cell) * -1);
			margin-right: calc(var(--cell) * -1);
		}
	}
</style>
