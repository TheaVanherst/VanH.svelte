<script>
    import { fly } 		from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    import { afterNavigate } 	from "$app/navigation";
    import { onMount } 			from "svelte";

    import { navigating, page } from "$app/stores";
    import {
        directionProcessing, nsfw,
        directionX, directionY, transitioning,
        pageLoaded, directory, pageName
    } from '$lib/controllers/accessibilityController.js';

    afterNavigate(async (n) => { //handles on mount
        if (!$navigating || !$pageLoaded) {
            let to =    n.to.url.pathname ?? "/",
                from =  n.type === "enter" ? to : n?.from?.url?.pathname ?? "/"; //checks reload vs browser
            await directionProcessing(from, to, to, 0);} //resets x, y positions
    });

    export let refresh = '';

    onMount(() => { // temp
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
            delay:      100,
            x: transitionSpeed * $directionX,
            y: transitionSpeed * -$directionY}}
		 out:fly={{
           	easing: 	cubicOut,
            duration:   300,
            x: transitionSpeed * -$directionX,
            y: transitionSpeed * $directionY}}>
		<slot/>
	</div>
{/if}