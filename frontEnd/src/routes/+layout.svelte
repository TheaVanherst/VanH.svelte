<script>
    import '../styles.scss';
    import { fly } 				from 'svelte/transition';

    // page visuals
    import Header 				from "$root/components/layout/header/header.svelte";
    import PageFooter 			from "$root/components/layout/pageFooter.svelte";

    import SpaceshipCursor 		from "$root/components/layout/overlays/spaceshipCursor.svelte";
    import Background 			from "$root/components/layout/overlays/background.svelte";
    import MessengerPlugin 		from "$root/components/layout/overlays/messengerPlugin.svelte";
    import CometGenerator 		from "$root/components/layout/overlays/cometGenerator.svelte";
    import FullscreenGallery 	from "$root/components/generic/controllers/fullscreenGallery.svelte";

    import { navigationControls, deviceData } from "$lib/pageSettings/redirectHandling.js";
    import { pageTitlebar, loadingIco, titlebarScroller, websiteTag, pageName } from "$lib/controllers/titlebarScoller.js";

    import { onMount } from "svelte";
    import Device from "svelte-device-info";

    onMount(async () => {
        switch (true) {
            case Device.isPhone:  	$deviceData.deviceType = 0; break;
            case Device.isTablet: 	$deviceData.deviceType = 1; break;
            default:      			$deviceData.deviceType = 2; break;}
        $navigationControls.loaded = true;
    });

    let screenSize = 0,
        scrollPos = 0;

    $: $deviceData.screenSize = screenSize;
    $: $deviceData.scrollPos = scrollPos;

    $: $deviceData.screenType =
		$deviceData.screenSize > $deviceData.bandWidths[1] ?
			3 :
			$deviceData.screenSize < $deviceData.bandWidths[2] ?
				1 :
				2;
    $: $deviceData.deviceType === 2 ?
		$navigationControls.transitioning !== true ?
			titlebarScroller(`${websiteTag} // ${$pageName} `)
			: $pageTitlebar = loadingIco
		: $pageTitlebar = websiteTag;
</script>

<svelte:head>
	<title>{$pageTitlebar}</title>
</svelte:head>

<svelte:window bind:innerWidth={screenSize} bind:scrollY={scrollPos} />

<Background/>
<MessengerPlugin/>

{#if $deviceData.deviceType === 2}
	<CometGenerator/>
	<SpaceshipCursor/>
{/if}

<FullscreenGallery/>

{#if $navigationControls.loaded}
	<div id="scrollParent">
		<div id="layout" class="wrapCorrection" style="{$deviceData.deviceType < 2 ? 'overflow-x: hidden' : ''}">
			<div in:fly={{y: -100, duration: 500, delay: 350 }}> <!-- this needs a better delay calc -->
				<Header/>
			</div>

			<slot/>

			<div in:fly={{y: 100, duration: 500, delay: 350 }}>
				{#if $navigationControls.loaded}
						<PageFooter/>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	#scrollParent {
		min-height: 100vh;
		max-width: 	100%;
		margin: 	0 auto;}

	#layout {
		min-height: 100vh;

		max-width: 	820px;
		width: 		100%;
		min-width: 	300px;

		padding: 	0 15px;
		margin: 	0 auto;

		position: 			relative;
		display: 			flex;
		flex-direction: 	column;
		justify-content: 	space-between;}
</style>