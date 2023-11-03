<script>
    import NavigationComponent 	from "$root/components/layout/header/navBar.svelte";
    import { navigationVisibility, nsfw, socialMediaVisibility } from "$lib/controllers/pageControllers.js";
    import { slide } from "svelte/transition";

    export let data;

    $nsfw = data.dParams === 'nsfw'; // page initializing
</script>

{#if $socialMediaVisibility || $navigationVisibility}
	<div transition:slide>
		<NavigationComponent socials={data.featured}/>
	</div>
{/if}

<div class="flexBox">
	<slot/>
</div>

<style lang="scss">
	.flexBox { // this fixes issues with the footer that I can't be fucked to fix.
		position: 	relative;

		z-index: 	1;
		width: 		100%;
		margin: 	0 0 auto 0;}
</style>