<script>
    import { slide } from "svelte/transition";

    import Container 		from "$root/components/generic/containers/container.svelte";
    import RedirectBuilder 	from "$root/components/generic/controllers/redirectBuilder.svelte";

    // setup
    import { socialMediaVisibility, navigationVisibility } from "$lib/controllers/pageControllers.js";
    $socialMediaVisibility = 	false;
    $navigationVisibility = 	false;

    // makes up for the lack of transitional handler
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { transitioning } from "$lib/controllers/pageControllers.js";

    afterNavigate(() => {	$transitioning = false;});
    beforeNavigate(() => {	$transitioning = true;});

    export let data;
</script>

{#if  !$transitioning}
	<div class="center" transition:slide>
		<Container>
			<div class="wrapper">
				<div class="textWrapper">
					<h2>NSFW Content</h2>
					<p>This website contains NSFW content, 'NSFW' meaning "Not Safe For Work" & is not suitable for all audiences, especially those under the age of 18.</p>
					<p>Do you wish to filter the website of any NSFW content?</p>
				</div>

				<div class="buttonTable">
					<div class="buttonWrapper">
						<RedirectBuilder url={"/homePage"} nsfwPointer={false}>
							<div class="button regularBorder filter">
								<h4>Filter</h4>
							</div>
						</RedirectBuilder>
					</div>

					<div class="buttonWrapper">
						<RedirectBuilder url={"/homePage"} nsfwPointer={true}>
							<div class="button regularBorder unfilter">
								<h4>Continue</h4>
							</div>
						</RedirectBuilder>
					</div>
				</div>
			</div>
		</Container>
	</div>
{/if}

<style lang="scss">
	.center {
		max-width: 	450px;
		width: 		100%;
		margin: 	20px auto auto auto;}

	.wrapper, .textWrapper, .buttonTable {
		display: 	grid;
		gap: 		10px;}

	.textWrapper {
		* {
			display: 	flex;
			margin: 	0 auto;
			text-align: center;}}

	.buttonTable {
		display: flex;

		.buttonWrapper {
			width: 50%;}}

	.button {
		transition: background .3s ease;

		h4 {
			width: 		max-content;
			margin: 	-2px auto 0 auto;
			padding: 	5px;
			color: 		black;
			transition: color .3s ease;
		}

		&.filter {	background: var(--accent9);}
		&.unfilter {background: var(--accent6);}
		&:hover {	background: var(--accent2);
			h4 {	color: 		var(--accent9);}}
	}
</style>