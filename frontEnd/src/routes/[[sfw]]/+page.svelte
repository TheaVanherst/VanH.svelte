<script>
    import Container 		from "$root/components/generic/containers/container.svelte";
    import RedirectBuilder 	from "$root/components/generic/controllers/redirectBuilder.svelte";
    import { slide } from "svelte/transition";

    import { socialMediaVisibility, navigationVisibility } from "$lib/controllers/pageControllers.js";
    $socialMediaVisibility = 	false;
    $navigationVisibility = 	false;

    import { afterNavigate, beforeNavigate } from "$app/navigation";
    afterNavigate(() => {	active = true;});
    beforeNavigate(() => {	active = false;});

    export let data;

    let active = false;

    // this is all kinda dumb and just has to exist because the transition handlers are done via group folders.
	// at some point I'll remove all this ballocks.
</script>

{#if active}
	<div class="center" transition:slide>
		<Container>
			<div class="wrapper">
				<div class="textWrapper">
					<h2>NSFW Content</h2>
					<p>This website contains NSFW content, 'NSFW' meaning "Not Safe For Work" & is not suitable for all audiences, especially those under the age of 18.</p>
					<p>Do you wish to filter the website of any NSFW content?</p>
				</div>

				<div class="buttonWrapper">
					<div class="button regularBorder filter">
						<RedirectBuilder internal={true} url={"/home"} nsfwPointer={false}>
							<h4>Filter</h4>
						</RedirectBuilder>
					</div>

					<div class="button regularBorder unfilter">
						<RedirectBuilder internal={true} url={"/nsfw/home"} nsfwPointer={true}>
							<h4>Continue</h4>
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

	.wrapper, .textWrapper, .buttonWrapper {
		display: 	grid;
		gap: 		10px;}

	.textWrapper {
		* {
			display: 	flex;
			margin: 	0 auto;
			text-align: center;}}

	.buttonWrapper {
		display: flex;}

	.button {
		width: 50%;
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