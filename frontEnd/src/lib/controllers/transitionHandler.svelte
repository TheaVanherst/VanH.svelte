<script>
    import { fly, scale } 	from 'svelte/transition';
    import { cubicOut } 	from 'svelte/easing';

    import { afterNavigate } 	from "$app/navigation";
    import { onMount } 			from "svelte";
    import Device from "svelte-device-info";

    import LoadingFull from "$root/components/layout/loadingFull.svelte";

    import { navigating, page } from "$app/stores";
    import {
        directionProcessing, nsfw,
        directionX, directionY, transitioning,
        pageLoaded, directory, deviceType
    } from '$lib/controllers/accessibilityController.js';

    afterNavigate(async (n) => { //handles on mount
        if (!$navigating || !$pageLoaded) {
            let to =    n.to.url.pathname ?? "/",
                from =  n.type === "enter" ? to : n?.from?.url?.pathname ?? "/"; //checks reload vs browser
            await directionProcessing(from, to, to, 0);} //resets x, y positions
    });

    export let refresh = '';

    onMount(async () => { // dumb page setup stuff
        $pageLoaded = 	true;
        $nsfw = 		$page.params.sfw === "nsfw";
        $directory = 	"/home";

        switch (true) {
            case Device.isPhone:  	$deviceType = 0; break;
            case Device.isTablet: 	$deviceType = 1; break;
            default:      			$deviceType = 2; break;}
	});

    let transitionSpeed = 150; // transition position multipliers
</script>

{#if !$transitioning}
	<div class="transitionWrapper"
		in:fly={{
        	easing: 	cubicOut,
            duration:   250,
            delay:      250,
            x: transitionSpeed * $directionX,
            y: transitionSpeed * -$directionY}}
		out:fly={{
           	easing: 	cubicOut,
            duration:   250,
            x: transitionSpeed * -$directionX,
            y: transitionSpeed * $directionY}}>
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
	.centre {
		top: 		0;
		position: 	absolute;
		width: 		100%;

		.wrapper {
			margin: 50px auto;
			width: 	fit-content;}}
</style>