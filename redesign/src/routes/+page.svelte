<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
</script>

<div class="container">
	<Nav all={true} />
	<Spacer />

	<div class="intro">
		<p>
			using <b>data</b>, <b>design</b>,and <b>engineering</b> to solve problems and tell stories that
			matter.
		</p>
		<Spacer />
		<p>
			<b>data visuals editor</b> at the
			<a href="https://www.cfr.org/">council on foreign relations</a>.
		</p>
		<p>
			previously, a <b>research engineer</b> at the
			<a href="https://miurban.uchicago.edu/">mansueto institute for urban innovation</a>
			helping academics and journalists understand public transportation, property ownership networks,
			public finance, property taxes, etc. before that <b>data editor</b> at the
			<a href="https://www.chicagomaroon.com/">chicago maroon</a>,
			<b>analytics</b>
			at the dnc, <b>youth programming</b> at <a href="https://changeist.org/">changeist</a>.
		</p>
		<Spacer />
		<p>
			Find me on <a href="https://www.linkedin.com/in/austin-steinhart/">linkedin</a>,
			<a href="https://github.com/asteinhart">github</a>, or reach out via email at asteinhart3 at
			gmail dot com.
		</p>
		<Spacer />
		<div class="nav-small">
			<b><a href="/projects">explore all projects &#8599; </a></b>
			<b><a href="/blog">read the blog <span style="font-weight: normal;">&#8599;</span></a></b>
			<b><a href="/links">follow the links &#8599;</a></b>
		</div>
	</div>
</div>
<Spacer />

<hr class="full-line" />

<style>
	.nav-small {
		display: flex;
		gap: calc(var(--cell) * 2);
	}

	.full-line {
		width: 100%;
	}
</style>
