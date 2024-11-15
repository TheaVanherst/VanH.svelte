<script>
    import { scale, fly  } 				from "svelte/transition";
    import { cubicOut } 			from 'svelte/easing';

    import { afterNavigate, beforeNavigate } 	from "$app/navigation";
    import { navigating, updated } 				from "$app/stores";

    import { directoryProcessing, directoryStatus, navigationControls } from '$lib/settings/navigationHandling.js';

    import LoadingFull from "$root/components/layout/loadingFull.svelte";

    afterNavigate(async (n) => { // compensates for page refreshes / initial page loading
        if ( n.from === null && n.willUnload === false ) {  // this fixes an issue where the url doesn't update from the initial layout load.
            navigationControls.transitioning = false;

            // Update NSFW settings based on route params
            directoryStatus.nsfwOptional = n.to.params.sfw
                ? directoryStatus.nsfwKeyword : "";

            // Normalize and process the target directory
            const toPath = n.to.url.search
                ? n.to.url.pathname + n.to.url.search
                : n.to.url.pathname.endsWith("/")
                    ? n.to.url.pathname.slice(0, -1) || "/"
                    : n.to.url.pathname;

            await directoryProcessing(toPath, toPath);}
    }); //resets x, y positions

    beforeNavigate(async (n, willUnload, to) => {
        if (n.delta !== 0 && n.type === "popstate") {
            // Normalize the target path
            const toPath = n.to.url.pathname.endsWith("/")
                ? n.to.url.pathname.slice(0, -1) || "/"
                : n.to.url.pathname;

            await directoryProcessing(directoryStatus.rawDirectory, toPath);
            navigationControls.transitioning = true;

            // Ensure transitioning resets after a delay
            setTimeout(() => {
                navigationControls.transitioning = false;
            }, 250);
        }

        // Handle page updates for navigation
        if (updated && !willUnload && to?.url) {
            location.href = to.url.href;
        }
    }); //resets x, y positions

    let transitionSpeed = [50, 20]; // transition position multipliers
</script>

<div class="parentElement">
	{#if !$navigationControls.transitioning}
		<div class="transitionWrapper"
			 in:fly={{
        	easing: 	cubicOut,
        	delay: 		175, // specifically for social media transitions
            duration:   225,
            x: $navigationControls.direction[0] * transitionSpeed[0],
            y: $navigationControls.direction[1] * transitionSpeed[1]}}
			 out:fly={{
           	easing: 	cubicOut,
            duration:   225,
            x: -$navigationControls.direction[0] * transitionSpeed[0],
            y: -$navigationControls.direction[1] * transitionSpeed[1]}}>
			<div class="pageData">
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
		position: relative;}

	.transitionWrapper {
		position: 	static;
		margin: 	15px 0;

		.pageData {
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