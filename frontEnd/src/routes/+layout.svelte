<script>
    import '../styles.scss';
    import '../commonStyles.scss';

    import { fly, fade } 	from 'svelte/transition';

    import { onMount } 		from "svelte";
    import Device 			from "svelte-device-info";

    import { navigationControls, deviceData, directoryStatus }
							from "$lib/settings/navigationHandling.js";
    import { pageTitlebar, loadingIco, titlebarScroller, websiteTag, pageName }
							from "$lib/layout/titlebarScoller.js";

    import Header 				from "$root/components/layout/coreLayoutComponents/headerElements/header.svelte";
    import PageFooter 			from "$root/components/layout/coreLayoutComponents/pageLayout/pageFooter.svelte";

    import SpaceshipCursor 		from "$root/components/layout/coreLayoutComponents/idleElements/spaceshipCursor.svelte";
    import Background 			from "$root/components/layout/coreLayoutComponents/idleElements/background.svelte";
    import CometGenerator 		from "$root/components/layout/coreLayoutComponents/idleElements/cometGenerator.svelte";
    import FullscreenGallery 	from "$root/components/layout/fullscreenGallery.svelte";

    let screenSize = 		0,
        scrollPos = 		0,
        textscrollEnable = 	false;

    onMount(() => {
        switch (true) {
            case Device.isPhone:  	$deviceData.deviceType = 0; break;
            case Device.isTablet: 	$deviceData.deviceType = 1; break;
            default:      			$deviceData.deviceType = 2; textscrollEnable = true; break;}
        $navigationControls.loaded = true;
    });

    $: $deviceData.screenSize = screenSize;
    $: $deviceData.scrollPos = 	scrollPos;
    $: $deviceData.screenType =
		$deviceData.screenSize > $deviceData.bandWidths[1] ? 3 :
			$deviceData.screenSize < $deviceData.bandWidths[2] ? 1 : 2;
    $: textscrollEnable ?
		$navigationControls.transitioning !== true ?
			titlebarScroller(`${$pageName} ${websiteTag} ~ `)
			: $pageTitlebar = loadingIco
		: $pageTitlebar = websiteTag;

    export let data;
</script>

<svelte:head>
	<title>{$pageTitlebar}</title>
</svelte:head>

<svelte:window bind:innerWidth={screenSize} bind:scrollY={scrollPos} />

<Background/>
<CometGenerator/>

{#if $navigationControls?.loaded}
	<div transition:fade>
		{#if $deviceData.deviceType === 2}
			<SpaceshipCursor/>
		{/if}
		<FullscreenGallery/>
	</div>

	<div id="scrollParent">
		<div id="layout"
			 class="wrapCorrection"
			 class:dumbforceclip={$directoryStatus.currentRoot === "/"}
			 style="{$deviceData.deviceType < 2 ? 'overflow-x: hidden' : ''}">
			<div in:fly={{y: -100, duration: 500, delay: 350 }}> <!-- this needs a better delay calc -->
				<Header/></div>
			<div class="enforcedHeight">
				<slot/>
			</div>
			<div in:fly={{y: 100, duration: 500, delay: 350 }}>
				<PageFooter/></div>
		</div>
	</div>
{/if}

<style lang="scss">
	.dumbforceclip {
		// compensates for the banner circles.
		max-height: 100vh;
		overflow: hidden;}
	.enforcedHeight { // this fixes issues with the footer that I can't be fucked to fix.
		position: 	relative;
		z-index: 	1;
		width: 		100%;
		margin: 	0 0 auto 0;}

	#scrollParent {
		min-height: 100vh;
		max-height: 100vh;
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