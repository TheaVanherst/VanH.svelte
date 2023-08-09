<script>
	// general shit
	import '../styles.scss';

    import { scrollPos, screenSize, bandWidths, screenType } 	from '$lib/accessibilityController.js';
	import LoadingFull from "../components/generic/loadingFull.svelte";
	// navigation bar
	import ProfileBar 	from "$root/components/layout/bannerAnimation.svelte";
	import Background 	from "$root/components/layout/background.svelte";

    import NavigationComponent from "$root/components/layout/navigationComponent.svelte";

	$: $screenType = $screenSize > bandWidths[1] ? 3 : $screenSize < bandWidths[2] ? 1 : 2;
    	// this deals with the bandwidth types via. bandWidths and simplifies it as a global value.
		// this prevents having to do if statements that constantly get fucked with a lot.
		// tldr; "theoretically" should be more optimal and generally easier to write for.
</script>

<svelte:window  bind:innerWidth={$screenSize}/>
<svelte:body bind:scrollY={$scrollPos}/>
<Background/>

{#if $screenSize !== 0}
	<div id="navigation">
		<div id="layout">
			<div class="bannerContent">
				<ProfileBar/>
			</div>
			<NavigationComponent/>
			<slot/>
		</div>
	</div>
{:else}
	<div id="loading">
		<div class="bannerContent">
			<ProfileBar/>
			<div class="loadingBar">
				<LoadingFull/>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	* {
		-webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
		-moz-box-sizing: 	border-box; /* Firefox, other Gecko */
		box-sizing: 		border-box; /* Opera/IE 8+ */
	}

	#navigation {
		margin: 	0 auto;
		width: 		100%;
		max-width: 	800px;
		height: 	100%;
	}

	#layout {
		width: 		100%;
		height: 	100%;
		max-width: 	801px;
		position: 	absolute;
		padding: 	15px;
		min-width: 300px;

		.bannerContent {
			padding: 	0 0 15px 0;
			margin: 	0 auto;
			position: 	relative;
		}
	}

	#loading {
		width: 		100%;
		height: 	100%;
		position: 	absolute;
		display: 	flex;
		margin: 	auto auto;

		.loadingBar {
			position: relative;
			top: 150px;
		}

		.bannerContent {
			padding: 	0 0 15px 0;
			margin: 	auto auto;
			position: 	relative;
		}
	}
</style>
