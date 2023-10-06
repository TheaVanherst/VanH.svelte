<script>
    import { page } from "$app/stores";
    import { screenType, nsfw } 		from '$lib/controllers/pageControllers.js';

    import { slide } 			from "svelte/transition";
    import TransitionHandler 	from "$lib/transitions/transitionHandler.svelte";
    import RedirectBuilder 		from "$root/components/generic/controllers/redirectBuilder.svelte";
    import SanityImage 			from "$root/serializer/types/sanityImage.svelte";

    import { socialMediaVisibility } from "$lib/controllers/pageControllers.js";
    $socialMediaVisibility = true;

    export let data;
</script>

<!--<div class="table" id="characterSelect" transition:slide={{duration: 200}}-->
<!--	class:tablet={$screenType < 3}>-->
<!--	{#each data.preSearches[0].characters as character}-->
<!--		{#if character.NSFW && nsfw || !character.NSFW}-->
<!--			<RedirectBuilder url={$page.url.search === `?char=${character.slug}` ? `/artworks/` :  `/artworks/?char=${character.slug}`} internal={true}>-->
<!--				<div class="enlargedIcon"-->
<!--					 class:active={$page.url.search === `?char=${character.slug}` || $page.url.search === ''}>-->
<!--					<SanityImage image={character.icon}/>-->
<!--				</div>-->
<!--			</RedirectBuilder>-->
<!--		{/if}-->
<!--	{/each}-->
<!--</div>-->

<TransitionHandler>
	<slot/>
</TransitionHandler>

<style lang="scss">

	.table {
		display: 	flex;
		gap: 		10px;
		width: 		max-content;
		max-width: 	100%;
		margin: 	15px auto;

		&.tablet {
			display: 	grid;
			grid-template-columns: auto auto auto auto;}}

	.enlargedIcon {
		transition: .3s cubic-bezier(0.33, 1, 0.68, 1);;
		margin: 	0 auto;
		filter: brightness(0.5);

		&:hover {
			transform: scale(1.1);}
		&.active {
			filter: brightness(1);}}
</style>