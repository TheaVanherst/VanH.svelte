<script>
    import { fly } 	from 'svelte/transition';

    import '../styles.scss';

	// general shit
    import { scrollPos, screenSize, bandWidths, screenType } 	from '$lib/accessibilityController.js';

	import LoadingFull 			from "../components/generic/loadingFull.svelte";

	import ProfileBar 			from "$root/components/layout/bannerAnimation.svelte";
	import Background 			from "$root/components/layout/background.svelte";

    import NavigationComponent 	from "$root/components/layout/navigationComponent.svelte";
    import PageFooter 			from "../components/layout/pageFooter.svelte";

	$: $screenType = $screenSize > bandWidths[1] ? 3 : $screenSize < bandWidths[2] ? 1 : 2;
    	// this deals with the bandwidth types via. bandWidths and simplifies it as a global value.
		// this prevents having to do if statements that constantly get fucked with a lot.
		// tldr; "theoretically" should be more optimal and generally easier to write for.

    let pageData = 0;
		// for some reason, something I've done fucks with the scroll position, so you can't bind
		// it typically with svelte. Instead, I'm just using the ParentElement as a means to do everything instead.
</script>

<svelte:window bind:innerWidth={ $screenSize }/>

<Background/>

<div class="parentElement"
	 bind:this={ pageData }
	 on:scroll={() => $scrollPos = pageData.scrollTop}>
	<!-- the current issue is that the banner has an overflow problem, and results in the page having an x overflow, fucking with the page. -->
	<!-- This code here is really dogshit for edge browsers, but fixes the issue via. preventing overflow on this parent element -->

	{#if $screenSize !== 0}
		<!-- basic loading check -->
		<div id="navigation">
			<div id="layout">
				<div class="content"
					 in:fly={{y: -100, duration: 500, delay: 300 }}>
					<ProfileBar/>
				</div>
				<NavigationComponent/>
				<slot/>
				<PageFooter/>
			</div>
		</div>
	{:else}
		<div id="loading">
			<div class="content">
				<ProfileBar/>
				<div class="loadingBar">
					<LoadingFull/>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	* {
		-webkit-box-sizing: border-box; 	/* Safari/Chrome, other WebKit */
		-moz-box-sizing: 	border-box; 	/* Firefox, other Gecko */
		box-sizing: 		border-box;} 	/* Opera/IE 8+ */

	#navigation,
	#layout {
		max-width: 	800px;}

	.parentElement,
	.content {
		position: 	relative;}

	.parentElement {
		#navigation {
			margin: 	0 auto;}}

	.content {
		padding: 	0 0 15px 0;}

	// page types

	#layout,
	#loading {
		width: 		100%;
		height: 	100%;
		position: 	absolute;}

	#layout { // loaded page data
		min-width: 	300px;
		padding: 	15px;

		.content {
			margin: 	0 auto;}}

	#loading { // loading animation
		margin: 	auto auto;
		display: 	flex;

		.loadingBar {
			position: 	relative;
			top: 		150px;}
		.content {
			margin: 	auto auto;}}
</style>
