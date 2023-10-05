<script>
    import { fly, scale } 	from 'svelte/transition';
    import { cubicOut } 	from 'svelte/easing';
    import LoadingFull from "$root/components/layout/loadingFull.svelte";

    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { navigating } from "$app/stores";

    import { directionProcessing, pageLoaded, direction, transitioning, directory } from '$lib/controllers/pageControllers.js';

    afterNavigate((n) => {
        if (!$navigating || !$pageLoaded) {  // this fixes an issue where the url doesn't update from the initial layout load.
            let to = (n.to.url.pathname).slice(0, -1);
			to = to === "" ? "/" : to;
			directionProcessing(to, to, to, 0);}}); //resets x, y positions

    beforeNavigate(async (n) => {
        if (n.delta !== 0 && n.type === "popstate") {
            let to = (n.to.url.pathname).slice(0, -1) ?? "/"; //checks reload vs browser

            await directionProcessing($directory, to, null, 0);
            $transitioning = true;
            setTimeout(async () => {
                $transitioning = false;
            }, 250);}}); //resets x, y positions

    let transitionSpeed = 150; // transition position multipliers
</script>

<div class="parentElement">
	{#if !$transitioning && !$navigating}
		<div class="transitionWrapper"
			 in:fly={{
        	easing: 	cubicOut,
        	delay: 		170, // specifically for social media transitions
            duration:   250,
            x: transitionSpeed * $direction[0]}}
			 out:fly={{
           	easing: 	cubicOut,
            duration:   250,
            x: transitionSpeed * -$direction[0]}}>
			<div>
				<slot/>
			</div>
		</div>
	{:else if $navigating}
		<div class="centre" in:scale={{duration: 200}} out:scale={{duration: 200}}>
			<div class="wrapper">
				<LoadingFull/>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.parentElement {
		position: relative;
	}

	.transitionWrapper {
		position: 	static;
		margin-top: 15px;

		div {
			position: 	fixed;
			display: 	contents;
			max-width: 	100%;}}

	.centre {
		top: 		0;
		position: 	absolute;
		width: 		100%;

		.wrapper {
			margin: 50px auto;
			width: 	fit-content;}}
</style>