<script>
	import { fade, slide } from "svelte/transition";

    import { deviceData } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import RedirectBuilder from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectBuilder.svelte";
    import RainbowButtonWrap from "$root/components/generic/wrappers/buttons/rainbowButtonWrap.svelte";

    export let visible = false;
    export let preScreenHover = false;
    // manages load-in transitions .
</script>

{#if visible}
	<RedirectBuilder url="/featured">
		<div class="hoverablitySelector"
				 on:mouseover={()=>preScreenHover=true}
				 on:mouseout={()=>preScreenHover=false}>
			<div class="backgroundAnimationWrapper" transition:fade>
				<img class="stripeScan blueprintDesign"  src="/branding/CircuitTexture.webp" alt="circuit texture"/>
				<div class="stripeScan smaller regularBorder"></div>
				<div class="stripeScan animated regularBorder"></div>
				<div class="stripeScan faded regularBorder"></div>
			</div>
			<div class="globalWrapper">
				<div class="centrePosition">
					<div class="entryWrapper" transition:slide={{duration: 200, axis: 'y'}}>
						<RainbowButtonWrap
								padding="{$deviceData.screenType > 2 ? [4,25] : [6,6]}"
								bind:hover={preScreenHover}>
							<h3>Select to Enter</h3>
						</RainbowButtonWrap>
					</div>
				</div>
			</div>
		</div>
	</RedirectBuilder>
{/if}

<style lang="scss">
	.hoverablitySelector { width: 	100%;
							height: 100%;
		&:hover { .faded {	opacity: 0.7;}}}

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

	@mixin gradientGen($gridColour){
		background:
			linear-gradient(0deg, transparent 49%, $gridColour 50%, $gridColour 50%, transparent 51%, transparent),
			linear-gradient(-90deg, transparent 49%, $gridColour 50%, $gridColour 50%, transparent 51%, transparent);}

	.smaller {	@include gradientGen(var(--accent9));
		background-size:	1em 1em;
		animation: 			barStripe 2s linear infinite;
		font-size: 			25px;}
	.faded {	@include gradientGen(var(--accent7));
		background-size:	1em 1em;
		font-size: 			75px;
		border: 			1px solid var(--accent7);
		animation: 			barStripe 6s linear infinite;
		transition: 		opacity .3s ease;}
	.animated {	@include gradientGen(var(--accent5));
		background-size:	1em 1em;
		animation: 			gradient 6s linear infinite;
		mask-image: 		linear-gradient(90deg, rgba(255, 255, 255, 0), black 5%, rgba(255, 255, 255, 0) 90%);}
	.blueprintDesign {
		mask-image: 		linear-gradient(90deg, rgba(255, 255, 255, 0), black 5%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0) 90%);
		animation: 			gradient 6s linear infinite;
		background-size: 	2em 2em;
		object-fit: 		cover;
		opacity: 			0.5;}

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

	.globalWrapper {
		position: 		absolute;
		display: 		flex;
		width: 			100%;
		max-width:  	calc(100% - 30px);
		height: 		calc(100vh - 90px);
		.centrePosition {
			position: 	relative;
			width: 		max-content;
			height: 	max-content;
			margin: 	auto;}}
	.entryWrapper {
				position: 	relative;
				top: 		200px;
				z-index: 	10;
		h3 {	font-family: "Jura", sans-serif;
				color:		black;
				padding: 	0 0 1px 0;}}
</style>