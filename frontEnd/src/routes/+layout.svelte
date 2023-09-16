<script>
    import '../styles.scss';

    import { onMount } from 'svelte';

    import { fly } 				from 'svelte/transition';
    import TransitionHandler 	from "$lib/controllers/transitionHandler.svelte";

    import SpaceshipCursor 		from "$root/components/layout/overlays/spaceshipCursor.svelte";
    import Background 			from "$root/components/layout/overlays/background.svelte";
    import MessengerPlugin 		from "$root/components/layout/overlays/messengerPlugin.svelte";
    import CometGenerator 		from "$root/components/layout/overlays/cometGenerator.svelte";

    import Header 				from "$root/components/layout/header/header.svelte";
    import PageFooter 			from "$root/components/layout/pageFooter.svelte";

    import { scrollPos, bandWidths, screenSize, screenType, deviceType } from "$lib/controllers/accessibilityController.js";
    import { websiteTag, websiteDiv, transitioning, loadingIco, pageName } from "$lib/controllers/accessibilityController.js";


    import Device from "svelte-device-info";

    onMount(async () => {
        switch (true) {
            case Device.isPhone:  	$deviceType = 0; break;
            case Device.isTablet: 	$deviceType = 1; break;
            default:      			$deviceType = 2; break;}
    })

    $: $screenType = $screenSize > bandWidths[1] ? 3 : $screenSize < bandWidths[2] ? 1 : 2;
    // this deals with the bandwidth types via. bandWidths and simplifies it as a global value.
    // this prevents having to do if statements that constantly get fucked with a lot.
    // tldr; "theoretically" should be more optimal and generally easier to write for.
</script>

<svelte:head>
	<title>{$transitioning === true ? loadingIco : `${websiteTag} ${websiteDiv} ${$pageName}`}</title>
</svelte:head>

<svelte:window bind:innerWidth={ $screenSize } bind:scrollY={$scrollPos} />

<Background/>
<MessengerPlugin/>

{#if $deviceType === 2}
	<CometGenerator/>
	<SpaceshipCursor/>
{/if}

<div class="parentElement" id="scrollParent">
	<div id="layout">
		<Header/>

		<div class="flexBox">
			<TransitionHandler>
				<slot/>
			</TransitionHandler>
		</div>

		<div in:fly={{y: 100, duration: 500, delay: 350 }}>
			<PageFooter/>
		</div>
	</div>
</div>

<style lang="scss">
	* {	-webkit-box-sizing: border-box; 	/* Safari/Chrome, other WebKit */
		-moz-box-sizing: 	border-box; 	/* Firefox, other Gecko */
		box-sizing: 		border-box;} 	/* Opera/IE 8+ */

	.parentElement {
		display: 	block;
		position: 	relative;

		margin: 	0 auto;
		min-width: 	100%;
		max-width: 	800px;
		height: 	100vh;}

	// generic navigation

	#layout { // loaded page data
		min-height: 100vh;
		max-width: 	800px;

		min-width: 	300px;
		padding: 	0 15px;
		margin: 	0 auto;

		position: 			relative;
		display: 			flex;
		flex-direction: 	column;
		justify-content: 	space-between;

		.flexBox { // this fixes issues with the footer that I can't be fucked to fix.
			position: 	relative;

			z-index: 	1;
			width: 		100%;
			margin: 	0 0 auto 0;}
	}
</style>