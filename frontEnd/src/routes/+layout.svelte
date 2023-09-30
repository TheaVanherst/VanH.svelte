<script>
	// TODO: this page manages just general aesthetic initialization. Don't touch it.

    import '../styles.scss';
    import { fly } 				from 'svelte/transition';

    // page visuals
    import Header 				from "$root/components/layout/header/header.svelte";
    import PageFooter 			from "$root/components/layout/pageFooter.svelte";

    import SpaceshipCursor 		from "$root/components/layout/overlays/spaceshipCursor.svelte";
    import Background 			from "$root/components/layout/overlays/background.svelte";
    import MessengerPlugin 		from "$root/components/layout/overlays/messengerPlugin.svelte";
    import CometGenerator 		from "$root/components/layout/overlays/cometGenerator.svelte";


    import { scrollPos, screenSize, deviceType, transitioning, screenType, bandWidths, pageLoaded,
    	} from "$lib/controllers/accessibilityController.js";
    import { pageTitlebar, loadingIco, titlebarScroller, websiteTag, pageName
    	} from "$lib/controllers/titlebarScoller.js";

    import { onMount } from "svelte";
    import Device from "svelte-device-info";

    onMount(async () => {
        switch (true) {
            case Device.isPhone:  	$deviceType = 0; break;
            case Device.isTablet: 	$deviceType = 1; break;
            default:      			$deviceType = 2; break;}

        $pageLoaded = 	true;
    });

    $: $screenType = $screenSize > bandWidths[1] ? 3 : $screenSize < bandWidths[2] ? 1 : 2;
    $: $transitioning !== true && $deviceType === 2 ? titlebarScroller(`${websiteTag} ${$pageName} `) : false;
</script>

<svelte:head>
	<title>{$transitioning ? loadingIco : $pageTitlebar}</title>
</svelte:head>

<svelte:window bind:innerWidth={$screenSize} bind:scrollY={$scrollPos} />

<Background/>
<MessengerPlugin/>

{#if $deviceType === 2}
	<CometGenerator/>
	<SpaceshipCursor/>
{/if}

{#if $pageLoaded}
	<div class="parentElement" id="scrollParent">
		<div id="layout">
			<div in:fly={{y: -100, duration: 500, delay: 350 }}> <!-- this needs a better delay calc -->
				<Header/>
			</div>

			<slot/>

			<div in:fly={{y: 100, duration: 500, delay: 350 }}>
				{#if $pageLoaded} <!-- this is a placeholder -->
						<PageFooter/>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.parentElement,
	#layout {
		-webkit-box-sizing: border-box; 	/* Safari/Chrome, other WebKit */
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
		justify-content: 	space-between;}
</style>