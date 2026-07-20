<script>
	let { all = false, project = false, blog = false, docs = false, links = false } = $props();
</script>

<div class="header">
	<div class="name">
		<b
			><a href="/">
				<div>Austin</div>
				<div>Steinhart</div>
			</a></b
		>
	</div>
	<div class="nav">
		<a class:bold={project | all} href="/projects" data-text={"/projects"}>/projects</a>
		<a class:bold={blog | all} href="/blog" data-text={"/blog"}>/blog</a>
		<a class:bold={links | all} href="/links" data-text={"/links"}>/links</a>
	</div>
</div>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		margin-top: -3vh;
		margin-right: 6.5vw;
		font-size: 1.1rem;
	}

	.bold {
		font-weight: bold;
	}

	.nav {
		display: block;
	}

	.nav {
		display: flex;
		gap: 2vw;
	}
    /* Create a hidden, bold duplicate of the text */
    a::before {
    	content: attr(data-text);
        font-weight: bold;
        visibility: hidden;
        height: 0;
        display: block;
        overflow: hidden;
  }

	a {
		text-decoration: none;
		color: var(--color-text);
	}

	a:hover {
		text-decoration: underline;
	}
</style>
