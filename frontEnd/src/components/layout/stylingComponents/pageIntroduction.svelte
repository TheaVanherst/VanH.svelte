<script>
	import { fade, slide } from "svelte/transition";

    export let visible = false;
</script>

{#if visible}
	<div class="backgroundAnimationWrapper" transition:fade>
		<div class="loader smaller regularBorder"></div>
		<div class="loader animated regularBorder"></div>
		<div class="loader faded regularBorder"></div>
	</div>
	<div class="GlobalWrapper" transition:slide={{duration: 200, axis: 'y'}}>

	</div>
{/if}

<style lang="scss">
	.loader {
		position: 		absolute;
		display: 		inline-block;
		box-sizing: 	border-box;
		mask-repeat: 	no-repeat;

		margin: 	15px 0 0 0;
		width: 		100%;
		max-width:  calc(100% - 30px);
		height: 	calc(100vh - 90px);}

	@mixin gradientGen($gridColour){
		background:
			linear-gradient(0deg, transparent 49%, $gridColour 50%, $gridColour 50%, transparent 51%, transparent),
			linear-gradient(-90deg, transparent 49%, $gridColour 50%, $gridColour 50%, transparent 51%, transparent);}

	.smaller {
		@include gradientGen(var(--accent9));
		animation: 	barStripe 2s linear infinite;
		font-size: 	25px;
		border: 	1px solid var(--accent9);
		background-size: 1em 1em;}
	.faded {
		@include gradientGen(var(--accent7));
		font-size: 	45px;
		border: 	1px solid var(--accent7);
		animation: 	barStripe 6s linear infinite;
		opacity: 	0.4;
		background-size: 1em 1em;}
	.animated {
		@include gradientGen(var(--accent5));
		font-size: 	45px;
		animation: 	gradient 6s linear infinite;
		border: 	solid 1px;
		mask-image: linear-gradient(90deg, black 0%, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0) 50%, black 50%, rgba(255, 255, 255, 0) 90%);
		background-size: 1em 1em;}

	@keyframes barStripe {
		0% {	background-position: 2em 1em;}
		100% {	background-position: 0 0;} }
	@keyframes gradient {
		0% {	mask-position: 100vmin 0;  background-position: 2em 1em;}
		50% {	mask-position: -100vmin 0; background-position: 1em 0.5em;}
		100% {	mask-position: -100vmin 0; background-position: 0em 0em;}}

	// TextBox

	.GlobalWrapper {
		position: 	absolute;
		display: 	flex;
		width: 		100%;
		max-width:  calc(100% - 30px);
		height: 	calc(100vh - 90px);}
</style>