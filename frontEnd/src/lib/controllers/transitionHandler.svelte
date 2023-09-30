<script>
    import { fly, scale } 	from 'svelte/transition';
    import { cubicOut } 	from 'svelte/easing';
    import LoadingFull from "$root/components/layout/loadingFull.svelte";

    import {afterNavigate, beforeNavigate} from "$app/navigation";
    import { navigating } from "$app/stores";

    import {directionProcessing, pageLoaded, direction, transitioning, directory, nsfw} from '$lib/controllers/accessibilityController.js';

    afterNavigate((n) => { // DEALS WITH BACKWARDS NAVIGATION
        if (!$navigating || !$pageLoaded) {
            let to =    "/" + ($nsfw ? 'nsfw' : '') + (n.to.url.pathname).slice(0, -1) ?? "/"; // FUCKING DUMB, IT'S TEMPORARY, IGNORE IT, PLEASE.
			directionProcessing(to, to, to, 0);
        } //resets x, y positions
    });

    beforeNavigate(async (n) => {
        if (n.delta !== 0 && n.type === "popstate") {
            let to = (n.to.url.pathname).slice(0, -1) ?? "/"; //checks reload vs browser

            await directionProcessing($directory, to, null, 0);
            $transitioning = true;
            setTimeout(async () => {
                $transitioning = false;
            }, 250);
        } //resets x, y positions
	})

    let transitionSpeed = 150; // transition position multipliers
</script>

{#if !$transitioning}
	<div class="transitionWrapper"
		in:fly={{
        	easing: 	cubicOut,
        	delay: 170, // specifically for social media transitions
            duration:   250,
            x: transitionSpeed * $direction[1],
            y: transitionSpeed * -$direction[0]}}
		out:fly={{
           	easing: 	cubicOut,
            duration:   250,
            x: transitionSpeed * -$direction[1],
            y: transitionSpeed * $direction[0]}}>
		<slot/>
	</div>
{:else}
	<div class="centre" in:scale={{duration: 200}} out:scale={{duration: 200}}>
		<div class="wrapper">
			<LoadingFull/>
		</div>
	</div>
{/if}

<style lang="scss">
	.transitionWrapper {
		position: static;
	}

	.centre {
		top: 		0;
		position: 	absolute;
		width: 		100%;

		.wrapper {
			margin: 50px auto;
			width: 	fit-content;}}
</style>