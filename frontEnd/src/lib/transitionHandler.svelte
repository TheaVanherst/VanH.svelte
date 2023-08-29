<script>
    import { fly } 	from 'svelte/transition';
    import { cubicOut } from 'svelte/easing'

    import { navigationStatus, loadingStatus, directionProcessing,
        directionX, directionY, directory }    from '$lib/accessibilityController';

    import { afterNavigate, beforeNavigate } from "$app/navigation";

    beforeNavigate(async (n) => {   //TODO: ONLY BROWSER NAVIGATION
        let to =    n?.to?.url?.pathname ?? "/",
            from =  n?.from?.url?.pathname ?? "/";

        // this fixes an issue relating to the root always requiring a "/" at the end.
        to = to.charAt(to.length - 1) !== "/" ? to + "/" : to;

        if (to !== from) { // checks for page reload & internal reference
            if (n.willUnload || // prevents _blank internal redirects
                $navigationStatus || $loadingStatus) { // haults the current transition if already transitioning.
                event.preventDefault();}
            else {
                loadingStatus.set(true);
                await directionProcessing(from, to);}}
    });

    afterNavigate(async (n) => {
        if (!$loadingStatus) {            //TODO: ONLY BROWSER NAVIGATION
            let to =    n.to.url.pathname ?? "/",
                from =  n.type === "enter" ? to :
                    n?.from?.url?.pathname ?? "/"; //checks reload vs browser
            await directionProcessing(from, to, to);} //resets x, y positions
        else {                      //TODO: AUTOMATED DIRECTING
            navigationStatus.set(true); //sets navigation to default value
            loadingStatus.set(false);} // indicates page is fully preloaded.

        navigationStatus.set(false); // indicates page has transitioned
    });

    let transitionSpeed = 150; // transition position multipliers
</script>

{#key $directory}
	<div class="transitionWrapper"
		 in:fly={{
           	easing: 	cubicOut,
            duration:   300,
            delay:      50,
            x: transitionSpeed * -$directionX,
            y: transitionSpeed * $directionY}}>
		<slot/>
	</div>
{/key}
