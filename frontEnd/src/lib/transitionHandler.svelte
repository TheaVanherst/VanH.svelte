<script>
    import { fly } 	from 'svelte/transition';
    import { cubicIn, cubicOut } from 'svelte/easing'

    import { navigationStatus, loadingStatus, directionProcessing,
        directionX, directionY }    from '$lib/accessibilityController';

    import { afterNavigate, beforeNavigate } from "$app/navigation";

    let pageUpdate = {};

    beforeNavigate(async (n) => {   //TODO: ONLY BROWSER NAVIGATION
        let to =    n?.to?.url?.pathname ?? "/",
            from =  n?.from?.url?.pathname ?? "/";

        // this fixes an issue relating to the root always requiring a "/" at the end.
        to = to.charAt(to.length - 1) !== "/" ? to + "/" : to;

        if (to !== from) { // checks for page reload & internal reference
            pageUpdate = {};

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

    let transitionSpeed = 50; // transition position multipliers
</script>

{#key pageUpdate}
	<div class="transitionWrapper"
		 in:fly={{
            easing: cubicOut,
            duration:   350,
            delay:      200,
            x: transitionSpeed * -$directionX,
            y: transitionSpeed * $directionY}}
		 out:fly={{
            easing: cubicIn,
            duration:   350,
            x: transitionSpeed * $directionX,
            y: transitionSpeed * -$directionY}}>
		<div class="absol">
			<slot/>
		</div>
	</div>
{/key}

<style lang="scss">
	// this is a backup to prevent pages from vertically stacking inside the page itself.

	:global(.transitionWrapper > .absol) {
		position: absolute;
		&:nth-child(1) {
			position: relative!important;}}
</style>