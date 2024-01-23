<script>
    import '../styles.scss';
    import '../commonStyles.scss';

    import { fly, fade } 				from 'svelte/transition';

    import Header 				from "$root/components/layout/headerElements/header.svelte";
    import PageFooter 			from "$root/components/layout/pageLayout/pageFooter.svelte";

    import SpaceshipCursor 		from "$root/components/layout/stylingComponents/spaceshipCursor.svelte";
    import Background 			from "$root/components/layout/stylingComponents/background.svelte";
    import MessengerPlugin 		from "$root/components/layout/pageLayout/messengerPlugin.svelte";
    import CometGenerator 		from "$root/components/layout/stylingComponents/cometGenerator.svelte";
    import FullscreenGallery 	from "$root/components/layout/fullscreenGallery.svelte";

    import { navigationControls, deviceData } from "$lib/controllers/layoutControllers/redirectHandling.js";
    import { pageTitlebar, loadingIco, titlebarScroller, websiteTag, pageName } from "$lib/controllers/stylingControllers/titlebarScoller.js";

    import { onMount } from "svelte";
    import Device from "svelte-device-info";

    onMount(async () => {
        switch (true) {
            case Device.isPhone:  	$deviceData.deviceType = 0; break;
            case Device.isTablet: 	$deviceData.deviceType = 1; break;
            default:      			$deviceData.deviceType = 2; break;}
        $navigationControls.loaded = true;
    });

    let screenSize = 0, scrollPos = 0;

    $: $deviceData.screenSize = screenSize;
    $: $deviceData.scrollPos = scrollPos;
    $: $deviceData.screenType =
		$deviceData.screenSize > $deviceData.bandWidths[1] ? 3 :
			$deviceData.screenSize < $deviceData.bandWidths[2] ? 1 : 2;
    $: $deviceData.deviceType === 2 ?
		$navigationControls.transitioning !== true ?
			titlebarScroller(`${websiteTag} // ${$pageName} `)
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
		<MessengerPlugin/>
		<FullscreenGallery/>
	</div>

	<div id="scrollParent">
		<div id="layout" class="wrapCorrection" style="{$deviceData.deviceType < 2 ? 'overflow-x: hidden' : ''}">
			<div in:fly={{y: -100, duration: 500, delay: 350 }}> <!-- this needs a better delay calc -->
				<Header/>
			</div>

			<slot/>

			<div in:fly={{y: 100, duration: 500, delay: 350 }}>
				<PageFooter/>
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
		justify-content: 	space-between;
	}
</style>