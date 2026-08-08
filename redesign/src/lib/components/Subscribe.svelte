<script>
	let { justify = 'left', border = false } = $props();
</script>

<div class="box" class:border style="text-align: {justify}">
	<p>want to stay up to date on my latest projects and blog posts?</p>
	<form
		action="https://buttondown.com/api/emails/embed-subscribe/asteinhart"
		method="post"
		class="embeddable-buttondown-form"
	>
		<label for="bd-email">enter your email</label>
		<input type="email" name="email" id="bd-email" />
		<input type="submit" value="subscribe" />
	</form>
</div>

<style>
	.box p {
		margin-bottom: 0;
	}
	/* flex, not inline flow: inline-block inputs sit on the text baseline and drag
	   descender space in with them, which made the form 21.8px tall — a fraction of
	   a cell, so everything under it drifted off the grid. */
	form {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0 calc(var(--cell) * 0.3);
	}
	input {
		font-family: inherit;
		font-size: calc(var(--cell) * 0.5);
		height: var(--cell);
	}
	.border {
		border: 1.5px solid rgb(0, 0, 0, 0.5);
	}

	input[type='email'] {
		padding: calc(var(--cell) * 0.2) calc(var(--cell) * 0.1);
		border: 1.5px solid rgb(0, 0, 0, 0.5);
	}

	input[type='email']:focus {
		outline: 1.5px solid rgb(0, 0, 0, 0.5);
	}

	input[type='submit'] {
		padding: calc(var(--cell) * 0.2) calc(var(--cell) * 0.3);
		border: 1.5px solid rgb(0, 0, 0, 0.5);
		background: none;
		cursor: pointer;
		color: rgb(0, 0, 0, 0.7);
	}

	@media screen and (max-width: 768px) {
		input[type='email'] {
			font-size: calc(var(--cell) * 0.4);
		}

		input[type='submit'] {
			font-size: calc(var(--cell) * 0.4);
		}

		.box {
			text-align: left !important;
		}
	}
</style>
