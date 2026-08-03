<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { POSTS } from '$lib/posts.js';

	function filterBlog(event) {
		const filter = event.target.textContent;
		console.log(`Filtering blog by: ${filter}`);
		// Implement filtering logic here
	}
</script>

<Seo
	title="Blog"
	description="Writing on data visualization, design, and engineering by Austin Steinhart."
/>

<div class="container">
	<Nav blog={true} />
	<Spacer />
</div>

<hr class="full-line above" />
<hr class="full-line below" />

<div class="container">
	<table>
		<thead>
			<tr>
				<th scope="col">mm/dd/yyyy</th>
				<th scope="col" class="title">title</th>
				<th scope="col" class="tags">tags</th>
			</tr>
		</thead>
		<tbody>
			{#each POSTS as blog}
				<tr>
					<td scope="row">{blog.displayDate}</td>
					<td class="title">
						{#if blog.external}
							<a href={blog.url} target="_blank" rel="noopener noreferrer"
								>{blog.title} &#8599;&#xFE0E;</a
							>
						{:else}
							<a href={blog.url}>{blog.title}</a>
						{/if}
					</td>
					<td class="tags">{blog.tags.join(', ').toLowerCase()}</td>
				</tr>
			{/each}

			<tr> </tr></tbody
		>
	</table>
</div>

<Spacer />
<Spacer />

<div class="container">
	<Subscribe />
</div>

<style>
	table {
		border-collapse: collapse;
		width: 100%;
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

	thead {
		font-weight: bold;
	}

	th,
	td {
		vertical-align: top;
		text-align: left;
		padding-right: 20px;
	}

	@media screen and (max-width: 768px) {
		tr,
		td,
		th {
			font-size: calc(var(--cell) * 0.6);
		}

		.title {
			/* give the title column the available slack so long titles have more room */
			width: calc(var(--cell) * 7);
		}
		.tags {
			padding-right: 0;
			padding-left: calc(var(--cell) * -1);
		}
	}
</style>
