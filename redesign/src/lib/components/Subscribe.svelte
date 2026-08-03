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

<style>
	input {
		font-family: inherit;
		font-size: calc(var(--cell) * 0.5);
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
	}
</style>
