<script>
    import '../styles.scss';

    import { directory } from "$lib/accessibilityController.js";

    import { fly } 	from 'svelte/transition';
    import TransitionHandler from "$lib/transitionHandler.svelte";

    import ProfileBar 			from "$root/components/layout/bannerAnimation.svelte";
    import Background 			from "$root/components/layout/background.svelte";
    import MessengerPlugin 		from "$root/components/layout/messengerPlugin.svelte";

    import NavigationComponent 	from "$root/components/layout/navigationComponent.svelte";
    import PageFooter 			from "$root/components/layout/pageFooter.svelte";

    import { scrollPos, bandWidths, screenSize, screenType } from "$lib/accessibilityController.js";

    $: $screenType = $screenSize > bandWidths[1] ? 3 : $screenSize < bandWidths[2] ? 1 : 2;
    // this deals with the bandwidth types via. bandWidths and simplifies it as a global value.
    // this prevents having to do if statements that constantly get fucked with a lot.
    // tldr; "theoretically" should be more optimal and generally easier to write for.
</script>

<svelte:window bind:innerWidth={ $screenSize }/>

<Background/>
<MessengerPlugin/>

<div class="parentElement"
	 on:scroll={(e) => $scrollPos = e.target.scrollTop}>
	<div id="navigation">
		<div id="layout">
			{#if $directory !== "/"} <!-- this is a placeholder -->
				<div in:fly={{y: -100, duration: 500, delay: 350 }}> <!-- this needs a better delay calc -->
					<div class="content">
						<ProfileBar/>
					</div>
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
</div>

<style lang="scss">
	.parentElement {
		// if you remove any of this, it will break mobile.
		// DO NOT FUCKING REMOVE IT.
		display: block;
		position: relative;
		overflow-x: hidden; // this is a bullshit fix to fix the banner
		overflow-y: scroll;

		width: 	100%;
		height: 100vh;}

	* {	-webkit-box-sizing: border-box; 	/* Safari/Chrome, other WebKit */
		-moz-box-sizing: 	border-box; 	/* Firefox, other Gecko */
		box-sizing: 		border-box;} 	/* Opera/IE 8+ */

	// generic navigation

	#navigation,
	#layout {
		position: 	relative;
		min-height: 100vh;
		max-width: 	800px;}
	#navigation {
		margin: 	0 auto;}

	#layout { // loaded page data
		width: 		100%;
		height: 	100%;
		position: 	absolute;

		min-width: 	300px;
		padding: 	0 15px;

		display: flex;
		flex-direction: column;
		justify-content: space-between;

		.flexBox { // this fixes issues with the footer that I can't be fucked to fix.
			width: 		100%;
			margin: 	0 0 auto 0;}

		.content {
			position: 	relative;
			padding: 	15px 0;
			margin: 	0 auto;}}
</style>