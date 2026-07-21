<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Subscribe from '$lib/components/Subscribe.svelte';
	import { BLOGS } from '$lib/blogs.js';

	function filterBlog(event) {
		const filter = event.target.textContent;
		console.log(`Filtering blog by: ${filter}`);
		// Implement filtering logic here
	}
</script>

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
				<th scope="col">title</th>
				<th scope="col">tags</th>
			</tr>
		</thead>
		<tbody>
			{#each Object.values(BLOGS) as blog}
				<tr>
					<td scope="row">{blog.date}</td>
					<td
						><a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.title} &#8599;</a
						></td
					>
					<td>{blog.tags.join(', ').toLowerCase()}</td>
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
		text-align: left;
		padding-right: 20px;
	}
</style>
