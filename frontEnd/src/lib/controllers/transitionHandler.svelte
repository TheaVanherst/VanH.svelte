<script>
    import { fly, scale } 	from 'svelte/transition';
    import { cubicOut } 	from 'svelte/easing';
    import LoadingFull from "$root/components/layout/loadingFull.svelte";

    import { direction, transitioning } from '$lib/controllers/accessibilityController.js';

    let transitionSpeed = 150; // transition position multipliers
</script>

{#if !$transitioning}
	<div class="transitionWrapper"
		in:fly={{
        	easing: 	cubicOut,
            duration:   250,
            delay:      250,
            x: transitionSpeed * $direction[1],
            y: transitionSpeed * -$direction[0]}}
		out:fly={{
           	easing: 	cubicOut,
            duration:   250,
            x: transitionSpeed * -$direction[1],
            y: transitionSpeed * $direction[0]}}>
		<slot/>
	</div>
{:else}
	<div class="centre" in:scale={{duration: 200}} out:scale={{duration: 200}}>
		<div class="wrapper">
			<LoadingFull/>
		</div>
	</div>
{/if}

<style lang="scss">
	.centre {
		top: 		0;
		position: 	absolute;
		width: 		100%;

		.wrapper {
			margin: 50px auto;
			width: 	fit-content;}}
</style>