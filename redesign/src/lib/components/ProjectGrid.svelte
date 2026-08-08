<script>
	import Project from './Project.svelte';

	let { projects } = $props();
</script>

<div class="container-projects">
	<hr class="vert-line" />
	<div class="projects">
		{#each projects as project}
			<Project {...project} />
		{/each}
	</div>
</div>

<style>
	.container-projects {
		position: relative;
		margin-left: calc(var(--cell) * 2);
		margin-right: calc(var(--cell) * 2);
		margin-top: calc(var(--cell) * -1);
	}

	.vert-line {
		position: absolute;
		height: 100%;
		/* on the cell-25 line — dead-center of the 2-cell middle gutter, between
		   the two 1-cell paddings that flank it. */
		left: calc(var(--cell) * 23);
		margin: 0;
		width: var(--line-width);
	}

	.projects {
		display: grid;
		/* two 23-cell columns, flush (cell-2→cell-48). each card's own 1-cell
		   padding IS the gutter, so the strip reads:
		   2 margin · 1 pad · 21 project · 1 pad │ 1 pad · 21 project · 1 pad · 2 margin
		   keeping the pads INSIDE the fixed tracks makes them symmetric — a grid
		   column-gap / padding-inline sits outside the tracks and gets eaten by the
		   scrollbar on the right (left reads as 2 cells of pad, right as 1).
		   left-anchored; fixed cell tracks keep every edge on the painted vw grid. */
		grid-template-columns: repeat(2, calc(var(--cell) * 23));
		justify-content: start;
	}

	@media screen and (max-width: 768px) {
		.projects {
			grid-template-columns: 1fr;
		}

		.vert-line {
			display: none;
		}
	}
</style>
