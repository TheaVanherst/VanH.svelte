<script>
    import { fly, scale } 	from 'svelte/transition';
    import { cubicOut } 	from 'svelte/easing';

    import { afterNavigate } 	from "$app/navigation";
    import { onMount } 			from "svelte";

    import { navigating, page } from "$app/stores";
    import {
        directionProcessing, nsfw,
        directionX, directionY, transitioning,
        pageLoaded, directory
    } from '$lib/controllers/accessibilityController.js';

    afterNavigate(async (n) => { //handles on mount
        if (!$navigating || !$pageLoaded) {
            let to =    n.to.url.pathname ?? "/",
                from =  n.type === "enter" ? to : n?.from?.url?.pathname ?? "/"; //checks reload vs browser
            await directionProcessing(from, to, to, 0);} //resets x, y positions
    });

    export let refresh = '';

    onMount(async () => { // temp
        $pageLoaded = true;
        $nsfw = $page.params.sfw === "nsfw";
        $directory = "/home";
	});

    let transitionSpeed = 150; // transition position multipliers
</script>

{#if !$transitioning}
	<div class="transitionWrapper"
		in:fly={{
        	easing: 	cubicOut,
            duration:   300,
            delay:      200,
            x: transitionSpeed * $directionX,
            y: transitionSpeed * -$directionY}}
		out:fly={{
           	easing: 	cubicOut,
            duration:   300,
            x: transitionSpeed * -$directionX,
            y: transitionSpeed * $directionY}}>
		<slot/>
	</div>
{:else}
	<div class="centre"
		transition:scale={{duration: 200}}>
		<div class="plane tilt2">
			<div class="circle decorationRing2"></div>
		</div>
	</div>
{/if}

<style lang="scss">
	.centre {
		position: absolute;
		width: 100%;

		.plane {
			border-radius: 	50%;
			border: 		6px solid var(--accent2);
			border-left-color: 		transparent;
			border-right-color: 	transparent;

			margin: 50px auto;
			width: 	40px;
			height: 40px;

			animation: 2s spin ease-in-out infinite;}

		@keyframes spin {
			from {	transform: rotate(0deg);}
			to {	transform: rotate(-360deg);}}
	}
</style>