<script>
    import { fly, scale } 	from 'svelte/transition';
    import { cubicOut } 	from 'svelte/easing';
    import LoadingFull from "$root/components/layout/loadingFull.svelte";

    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { navigating, updated } from "$app/stores";

    import { directionProcessing, directory, navStatus } from '$lib/pageSettings/redirectHandling.js';

    afterNavigate((n) => {
        if ( n.type = "enter" || $navigating?.willUnload === true ) {  // this fixes an issue where the url doesn't update from the initial layout load.
            $navStatus.transitioning = false;
            let to = (n.to.url.pathname).slice(0, -1);
			to = to === "" ? "/" : to;
			directionProcessing(to, to, to, 0);}
    }); //resets x, y positions

    beforeNavigate(async (n, willUnload, to ) => {
        if (n.delta !== 0 && n.type === "popstate") {
            let to = (n.to.url.pathname).slice(0, -1) ?? "/"; //checks reload vs browser

            await directionProcessing($directory.raw, to, null, 0);
            $navStatus.transitioning = true;
            setTimeout(async () => {
                $navStatus.transitioning = false;
            }, 250);}

        if ($updated && !willUnload && to?.url) {
            location.href = to.url.href;}
    }); //resets x, y positions

    let transitionSpeed = 150; // transition position multipliers
</script>

<div class="parentElement">
	{#if !$navStatus.transitioning && !$navigating}
		<div class="transitionWrapper"
			 in:fly={{
        	easing: 	cubicOut,
        	delay: 		175, // specifically for social media transitions
            duration:   250,
            x: transitionSpeed * $navStatus.direction}}
			 out:fly={{
           	easing: 	cubicOut,
            duration:   250,
            x: transitionSpeed * -$navStatus.direction}}>
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