<script>
    import NavigationComponent 	from "$root/components/layout/header/navBar.svelte";

    export let data;

    import { nsfw } from "$lib/controllers/pageControllers.js";
    $nsfw = data.dParams === 'nsfw'; // page initializing
</script>

<NavigationComponent socials={data.featured}/>

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