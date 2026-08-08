<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { LINKS } from '$lib/links.js';
</script>

<Seo title="Links" description="Books and articles Austin Steinhart recommends." />

<div class="container">
	<Nav links={true} />
	<Spacer />
</div>

{#each Object.entries(LINKS) as [category, links]}
	<hr class="full-line above" />
	<hr class="full-line below" />
	<div class="container">
		<table>
			<thead>
				<tr>
					<th scope="col">{category}</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.values(links) as link}
					<tr>
						<td
							><a href={link.url} target="_blank" rel="noopener noreferrer"
								>{link.title} &#8599;&#xFE0E;</a
							></td
						>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<Spacer />
{/each}

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
