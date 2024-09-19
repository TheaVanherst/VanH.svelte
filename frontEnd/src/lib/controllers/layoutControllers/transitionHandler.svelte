<script>
    import * as transitionFunctions from 'svelte/transition';
    import { scale } 				from "svelte/transition";
    import { cubicOut } 			from 'svelte/easing';

    import { afterNavigate, beforeNavigate } 	from "$app/navigation";
    import { navigating, updated } 				from "$app/stores";

    import { directoryProcessing, directoryStatus, navigationControls } from '$lib/controllers/layoutControllers/navigationHandling.js';

    import LoadingFull from "$root/components/layout/loadingFull.svelte";

    afterNavigate(async (n) => { // compensates for page refreshes / initial page loading
        if ( n.from === null && n.willUnload === false ) {  // this fixes an issue where the url doesn't update from the initial layout load.
            $navigationControls.transitioning = false;
            $directoryStatus.nsfwOptional = !!n.to.params.sfw ? $directoryStatus.nsfwKeyword : "";
            let to = n.to.url.search ? n.to.url.pathname + n.to.url.search : (n.to.url.pathname).slice(0, -1);
			to = to === "" ? "/" : to;
            await directoryProcessing(to, to);}
    }); //resets x, y positions

    beforeNavigate(async (n, willUnload, to) => {
        if (n.delta !== 0 && n.type === "popstate") {
            let to = (n.to.url.pathname).slice(0, -1) ?? "/"; //checks reload vs browser
            await directoryProcessing($directoryStatus.rawDirectory, to);
            $navigationControls.transitioning = true;
            setTimeout(async () => {
                $navigationControls.transitioning = false;
            }, 250);}

        if ($updated && !willUnload && to?.url) {
            location.href = to.url.href;}
    }); //resets x, y positions

    let transition,
        transitionSpeed = [50, 20]; // transition position multipliers

    $:  transition = $navigationControls.direction[1] === 0 ? transitionFunctions["fly"] : transitionFunctions["fly"];
</script>

<div class="parentElement">
	{#if !$navigationControls.transitioning}
		<div class="transitionWrapper"
			 in:transition={{
        	easing: 	cubicOut,
        	delay: 		175, // specifically for social media transitions
            duration:   225,
            x: $navigationControls.direction[0] * transitionSpeed[0],
            y: $navigationControls.direction[1] * transitionSpeed[1]}}
			 out:transition={{
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