<script>
	import { fade, slide } from "svelte/transition";

    export let visible = false;
</script>

{#if visible}
	<div class="backgroundAnimationWrapper" transition:fade>
		<img class="stripeScan blueprintDesign"  src="/branding/CircuitTexture.webp"/>
		<div class="stripeScan smaller regularBorder"></div>
		<div class="stripeScan animated regularBorder"></div>
		<div class="stripeScan faded regularBorder"></div>
	</div>
	<div class="globalWrapper">
		<div class="centrePosition">
			<h3 class="entry shortBorder" transition:slide={{duration: 200, axis: 'y'}}>
				Select to Enter
			</h3>
		</div>
	</div>
{/if}

<style lang="scss">
	.stripeScan {
		position: 		absolute;
		display: 		inline-block;
		box-sizing: 	border-box;
		mask-repeat: 	no-repeat;
		overflow: 		hidden;

		margin: 	15px 0 0 0;
		width: 		100%;
		max-width:  calc(100% - 30px);
		height: 	calc(100vh - 90px);}

	.blueprintDesign {
		mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0), black 5%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 90%);
		animation: 	gradient 6s linear infinite;

		background-size: 2em 2em;
		object-fit: cover;
		opacity: 0.5;
		position: absolute;}

	@mixin gradientGen($gridColour){
		background:
			linear-gradient(0deg, transparent 49%, $gridColour 50%, $gridColour 50%, transparent 51%, transparent),
			linear-gradient(-90deg, transparent 49%, $gridColour 50%, $gridColour 50%, transparent 51%, transparent);}

	.smaller {
		@include gradientGen(var(--accent9));
		animation: 	barStripe 2s linear infinite;
		font-size: 	25px;
		background-size: 1em 1em;}
	.faded {
		@include gradientGen(var(--accent7));
		font-size: 	75px;
		border: 	1px solid var(--accent7);
		animation: 	barStripe 6s linear infinite;
		opacity: 	0.2;
		background-size: 1em 1em;}
	.animated {
		@include gradientGen(var(--accent5));
		font-size: 	75px;
		animation: 	gradient 6s linear infinite;
		border: 	solid 1px;
		mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0), black 5%, rgba(255, 255, 255, 0) 90%);
		background-size: 1em 1em;}

	@keyframes zRotation {
		from {	transform: rotateY(0);}
		to {	transform: rotateY(-1turn);}}
	@keyframes barStripe {
		0% {	background-position: 2em 1em;}
		100% {	background-position: 0 0;} }
	@keyframes gradient {
		0% {	mask-position: 100vmin 0;  background-position: 2em 1em;}
		50% {	mask-position: -100vmin 0; background-position: 1em 0.5em;}
		100% {	mask-position: -100vmin 0; background-position: 0em 0em;}}

	// TextBox

	.globalWrapper {
		position: 	absolute;
		display: 	flex;
		width: 		100%;
		max-width:  calc(100% - 30px);
		height: 	calc(100vh - 90px);

		.centrePosition {
			position: relative;
			width: max-content;
			height: max-content;
			margin: auto;}}

	.entry {
		padding: 	2px 27px 3px 27px;
		top: 		200px;
		z-index: 	10;
		background: var(--accent3);
		font-family: "Jura", sans-serif;
		color: 		black;}
</style>