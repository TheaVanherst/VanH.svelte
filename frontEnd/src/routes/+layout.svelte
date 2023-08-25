<script>
    import '../styles.scss';

    import Background 			from "$root/components/layout/background.svelte";
    import MessengerPlugin 		from "$root/components/layout/messengerPlugin.svelte";

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
	<slot/>
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
</style>