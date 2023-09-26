<script>
    import NavigationComponent 	from "$root/components/layout/header/navBar.svelte";
    import TransitionHandler 	from "$lib/controllers/transitionHandler.svelte";

    export let data;

    import { nsfw } from "$lib/controllers/accessibilityController.js";
    $nsfw = data.dParams === 'nsfw';
</script>

<NavigationComponent socials={data.socials}/>

<div class="flexBox">
	<TransitionHandler>
		<slot/>
	</TransitionHandler>
</div>

<style lang="scss">
	.flexBox { // this fixes issues with the footer that I can't be fucked to fix.
		position: 	relative;

		z-index: 	1;
		width: 		100%;
		margin: 	0 0 auto 0;}
</style>