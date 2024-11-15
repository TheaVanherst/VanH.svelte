<script>
	import { fade } from "svelte/transition";

	export let scrollSpeed
</script>

{#if scrollSpeed < 0}
	<div class="top small" transition:fade={{duration: 150}}></div>
	<div class="top large" transition:fade={{duration: 100}}></div>
{/if}

<slot/>

{#if scrollSpeed > 0}
	<div class="bottom small" transition:fade={{duration: 150}}></div>
	<div class="bottom large" transition:fade={{duration: 100}}></div>
{/if}

<style lang="scss">
	@mixin gradientGen($gridColour){
		background:
			linear-gradient(0deg, transparent 49%, $gridColour 50%, $gridColour 50%, transparent 51%, transparent),
			linear-gradient(-90deg, transparent 49%, $gridColour 50%, $gridColour 50%, transparent 51%, transparent);}

	.top, .bottom {
		position: 	fixed;
		width: 		100vw;
		&.small {
			@include gradientGen(var(--dark1));
			font-size: 	25px;
			opacity: 	0.7;
			background-size:	1em 1em;}
		&.large {
			@include gradientGen(var(--accent1));
			font-size: 	75px;
			background-size:	1em 1em;}}

	.top {
		top: 	-100px;
		height: 520px;
		mask-image: radial-gradient(ellipse at top, rgba(255, 255, 255, 0), black 0%, rgba(255, 255, 255, 0) 90%);}
	.bottom {
		bottom: -100px;
		height: 420px;
		mask-image: radial-gradient(ellipse at bottom, rgba(255, 255, 255, 0), black 0%, rgba(255, 255, 255, 0) 90%);}
</style>