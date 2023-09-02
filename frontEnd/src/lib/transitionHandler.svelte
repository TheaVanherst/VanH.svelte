<script>
    import { fly } 	from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import { onMount } from "svelte";

	import { navigating } from "$app/stores";

    import { directionProcessing, directionX, directionY, pageLoaded }    from '$lib/accessibilityController';

    beforeNavigate(async (n) => {   //TODO: ONLY BROWSER NAVIGATION
        let to =    n?.to?.url?.pathname ?? "/",
            from =  n?.from?.url?.pathname ?? "/";
        // this fixes an issue relating to the root always requiring a "/" at the end.
        to = to.charAt(to.length - 1) !== "/" ? to + "/" : to;

        if (to !== from) { // checks for page reload & internal reference
            if (n.willUnload || $navigating) { // prevents _blank internal redirects
                event.preventDefault();} // haults the current transition if already transitioning.
            else {
                await directionProcessing(from, to);}}
    });

    afterNavigate(async (n) => {
        if (!$navigating) {            //TODO: ONLY BROWSER NAVIGATION
            let to =    n.to.url.pathname ?? "/",
                from =  n.type === "enter" ? to : n?.from?.url?.pathname ?? "/"; //checks reload vs browser
            await directionProcessing(from, to, to);} //resets x, y positions
    });

    export let refresh = '';

    onMount(() => {
        $pageLoaded = true;
	})

    let transitionSpeed = 150; // transition position multipliers
</script>

{#key refresh}
	<div class="transitionWrapper"
		 in:fly={{
           	easing: 	cubicOut,
            duration:   250,
            delay:      100,
            x: transitionSpeed * $directionX,
            y: transitionSpeed * -$directionY}}>
		<slot/>
	</div>
{/key}