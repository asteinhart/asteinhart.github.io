<script>
	import Nav from '$lib/components/Nav.svelte';
	import Spacer from '$lib/components/Spacer.svelte';
	import blogTest from '$lib/assets/blog-test.png';
	import { base } from '$app/paths';
</script>

<div class="container">
	<Nav blog={true} />
</div>
<Spacer />

<div class="blog-container">
	<h1 class="blog-title">Here is a title for a blog post.</h1>
	<div class="blog-desc">
		Here is an optional description for a blog post. It can be a few sentences long and provide an
		overview of the content of the blog post.
	</div>
	<div class="blog-byline">By <a href="{base}/">Austin Steinhart</a> | July 1, 2023</div>
	<Spacer />

	<hr class="full-line" />
</div>
<Spacer />

<div class="blog-container">
	<div class="blog-body">
		<p>
			This is the body of the blog post. It can contain multiple paragraphs, images, and other
			content. The text should be clear and engaging, providing valuable information to the reader.
		</p>

		<h2 class="blog-section">How it works</h2>
		<p>
			How it works diagram of how the app works 1. Take snapshots of the sunset every day Using the
			Python package astral, I check what the time of sunset is and schedule a Python script to run
			using the schedule package. The script takes a picture using a Raspberry Pi every 5 minutes
			starting 40 minutes before sunset and continuing for 10 minutes after sunset for a total of 12
			images. I temporarily save these locally on the SD card on the Raspberry Pi. A short aside.
			Holy s*** was the Raspberry Pi a pain to get set up. A friend found one on the street and gave
			it to me so at least it was free.
		</p>

		<h3 class="blog-subsection">Setup Challenges</h3>

		<p>
			A short chronicle of my woes follows. Start by trying to download the OS on a provided SD
			card. The Raspberry Pi OS is now 5GB but the old SD card it came with only is 4GB. Get new SD
			card. Load on the OS. Plug in Pi, try to SSH in, nothing happens. Plug into a monitor to see
			what's happening. Confirm everything is working (yay) but realize you need to log in the first
			time meaning you need a keyboard. Track down a USB keyboard to log in. Log in (yay). Try to
			connect to WiFi and realize you have an o
		</p>

		<img class="blog-media" src={blogTest} alt="Test Image" />

		<p>
			ld Pi that does not have a built in WiFi adapter. Realize your kit includes one. Plug in and
			connect to WiFi (yay) for two minutes. However, then adapter gets too hot and stops working.
			Get new WiFi adapter. Connect to WiFi again (yay). Generate SSH key for GitHub and clone repo
			(yay). Try to get UV working. Realize Pi does not play nice with UV. Eventually give up and
			just use venv. Have issue with new version of Python Imaging Library (PIL) called pillow,
			which seems to be a known issue. Find fix. Finally get everything working and can run the full
			script (yay). 2. Score each snapshot and save the best image Using the Python packages Pillow
			(a fork of the no longer maintained original Python Imaging Library PIL) and OpenCV, I compute
			a series of metrics, from simply the average amount of red in every pixel to the percentage of
			pixels that fall within color ranges for sunset hues. This is an area where a machine learning
			model could possibly be helpful, but since I'm simply comparing the same scene over time in
			this project, I believe this simpler approach yields acceptable results. After an image is
			selected, the best image is uploaded to an S3 bucket along with some metadata and the rest of
			the files are removed from the Raspberry Pi to ensure there are no memory issues down the
			road. AWS permissions are the trickiest part of an otherwise simple process, but LLMs are
			quite good these days at explaining the process and creating the permission files needed. This
			project lent itself to an object-oriented approach. I created a `SunsetDetector` class with
			adapters to modify the scoring and saving methods. Therefore, in the future if I want to
			explore new scoring methods or a different image storing platform, most of the code will stay
			the same and I will just have to change the underlying scoring and saving function used. 3.
			Single Page Application with Svelte As someone who loves type hints in Python, this project
			was a good excuse to finally switch over to TypeScript from JavaScript. I also continued to
			build my experience with Svelte 5 and spent some extra time learning more about AWS S3
			configurations and permissions. Since the images are stored on S3, I can simply make the
			bucket public for read access (bots pls ignore), removing the need for a backend. Therefore, I
			can use a simple Svelte application to display the images and metadata. The Svelte app fetches
			the images from the S3 bucket and displays them on the page. I still have free credits from
			Heroku from a previous project, so I am hosting the Svelte app there. Future Work There are
			two main areas for improvement: Explore better methods to determine the "best" sunset. While
			my simple scoring system works well, more sophisticated computer vision techniques or even a
			machine learning model trained on sunset aesthetics could improve selection quality. Find
			collaborators to run the pipeline in different cities and add their images to this workflow.
			This would create a network of sunset captures from across the world! I don't consider myself
			primarily a data scientist, but I have enough experience to know that a more robust analysis
			of color distribution, cloud formations, and overall composition could yield better results
			than my current metrics. However, this was primarily a passion project to keep me busy before
			starting a new job, and it works pretty well as is. Once I actually get a digital picture
			frame, there will be some additional work to figure out how to automate picture uploads and
			display rotations.
		</p>
	</div>
</div>

<style>
	h1,
	h2,
	h3,
	p {
		margin: 0;
		line-height: calc(var(--cell));
		margin-bottom: calc(var(--cell));
	}

	/* Body column: change --text-width to tune. Centered on the page,
	   text stays left-aligned inside the column. */
	.blog-container {
		--text-width: calc(var(--cell) * 25.9); /* 26 of 50 cells → 14-cell margins */
		width: var(--text-width);
		margin-inline: auto;
	}

	.blog-container :is(h2, h3, p) {
		width: 100%;
	}

	@media screen and (max-width: 768px) {
		.blog-container {
			--text-width: calc(var(--cell) * 18); /* 18 of 20 cells → 1-cell margins */
		}
	}

	.blog-container .blog-media {
		width: 100%;
		height: auto;
	}

	h1 .blog-title {
		font-size: calc(var(--cell) * 0.9);
		font-weight: bold;
	}
	.blog-desc {
		font-size: calc(var(--cell) * 0.7);
	}
	.blog-byline {
		font-size: calc(var(--cell) * 0.55);
	}

	.full-line {
		margin-left: calc(var(--cell) * -10);
		margin-right: calc(var(--cell) * -10);
	}
</style>
