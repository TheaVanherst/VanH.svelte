<script>
    import '../styles.scss';

    import { fly } 	from 'svelte/transition';
    import TransitionHandler from "$lib/controllers/transitionHandler.svelte";

    import ProfileBar 			from "$root/components/layout/bannerAnimation.svelte";
    import Background 			from "$root/components/layout/background.svelte";
    import MessengerPlugin 		from "$root/components/layout/messengerPlugin.svelte";

    import NavigationComponent 	from "$root/components/layout/navBar.svelte";
    import PageFooter 			from "$root/components/layout/pageFooter.svelte";

    import { directory, deviceType, scrollPos, pageLoaded,
		bandWidths, screenSize, screenType } from "$lib/controllers/accessibilityController.js";

    $: $screenType = $screenSize > bandWidths[1] ? 3 : $screenSize < bandWidths[2] ? 1 : 2;
    // this deals with the bandwidth types via. bandWidths and simplifies it as a global value.
    // this prevents having to do if statements that constantly get fucked with a lot.
    // tldr; "theoretically" should be more optimal and generally easier to write for.

	export let data;
</script>

<svelte:window bind:innerWidth={ $screenSize } bind:scrollY={$scrollPos} />

<Background/>
<MessengerPlugin/>

<div class="parentElement" id="scrollParent">
	<div id="layout">
		{#if $pageLoaded} <!-- this is a placeholder -->
			<div in:fly={{y: -100, duration: 500, delay: 350 }}> <!-- this needs a better delay calc -->
				{#if deviceType === 2}
					<div class="desktop">
						<ProfileBar/>
					</div>
				{:else if deviceType === 1}
					<div class="tablet">
						<div class="logo">
							<img src="/branding/vanhlogo.webp">
						</div>
						<div class="imageWrapper banner regularBorder">
							<img src="/branding/banneralt.webp">
						</div>
					</div>
				{:else}
					<div class="mobile imageWrapper">
						<img src="/branding/vanhlogo.webp">
					</div>
				{/if}
				<NavigationComponent/>
			</div>
		{/if}

		<div class="flexBox">
			<TransitionHandler>
				<slot/>
			</TransitionHandler>
		</div>

		{#if $directory !== "/"} <!-- this is a placeholder -->
			<div in:fly={{y: 100, duration: 500, delay: 350 }}>
				<PageFooter/>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	* {	-webkit-box-sizing: border-box; 	/* Safari/Chrome, other WebKit */
		-moz-box-sizing: 	border-box; 	/* Firefox, other Gecko */
		box-sizing: 		border-box;} 	/* Opera/IE 8+ */

	.parentElement {
		display: block;
		position: relative;
		overflow: 	hidden visible;

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

		.mobile {
			margin: 5px 0 -25px -5px;}

		.tablet {
			position: relative;
			margin-top: 15px;

			> * {
				height: 	200px;}

			.banner {
				overflow: hidden;
				border: 1px solid var(--accent8);}

			.logo {
				position: 	absolute;
				z-index: 	1;
				width: 		100%;

				img {
					margin: 	-10px 0 -10px -3px;
					left: 		50%;
					transform: 	translateX(-50%);
					height: 	calc(100% + 20px);

					position: 	relative;
					display: 	block;}}}

		.desktop {
			position: 	relative;
			padding: 	15px 0;
			margin: 	0 auto;}}
</style>