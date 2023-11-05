<script>
	import { fade, slide } from "svelte/transition";

	import { fullscreenGallery, galleryChange } from "$lib/pageSettings/pageSettings.js";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";

    import { clickOutside } from "$lib/transitions/transitionPresets.js";

	let position = 0,
		maxPosition = 0;

	const
		updateCall = () => {
            maxPosition = $fullscreenGallery?.gallery.length - 1;
            position = $fullscreenGallery.currentImage;},
		gallerySwap = () => {
			if (position < maxPosition) {
				position++;}
			else {
				galleryExit();}},
		galleryExit = () => {
            position = 0;
            galleryChange(undefined);}
</script>

{#if $fullscreenGallery.gallery}
	<div class="overlay"
		 	use:updateCall
			in:fade={{delay:250}}
		 	out:fade>
		<div class="circleWrapper">
			<div class="pageCircleBar">
				{#each $fullscreenGallery?.gallery as dot, i}
					{#if i < position}
						<div class="circle">
						</div>
					{/if}
				{/each}
				<div class="pageNumber">
					<p>{position + 1} / {maxPosition + 1}</p>
				</div>
				{#each $fullscreenGallery?.gallery as dot, i}
					{#if i > position}
						<div class="circle">
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<div class="wrapper"
				use:clickOutside
			 	on:click_outside={() => galleryExit()}>
			<div class="positionSet wideBorder" on:click={() => gallerySwap()}>
				{#key position}
					<div transition:slide>
						<div class="image wideBorder">
							{#if $fullscreenGallery?.gallery[position]}
								<SanityImage image={$fullscreenGallery.gallery[position]}/>
							{/if}
						</div>
					</div>
				{/key}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.overlay {
        position: 	fixed;
		display: 	flex;
		z-index: 	10;
		width: 		100%;
		height: 	100vh;
		background: var(--TransBlack);}

	.wrapper {
		margin: auto;

		.positionSet {
			margin: 15px;
			box-shadow: 0 0 15px #000;
		}

		.image {
			overflow: hidden;

			:global(img){
				display: 	flex;
				max-width: 	85vh;
				max-height: 85vh;
				object-fit: contain;}}}

	.circleWrapper {
		position: 	absolute;
		width: 		100%;
		display: 	flex;

		.pageCircleBar {
			margin: 	0 auto;
			display: 	flex;
			padding: 	15px;
			height: 	max-content;
			gap: 		5px;

			.circle {
				width: 		12px;
				height: 	12px;
				margin: 	auto 0;
				border-radius: 	50%;
				background: 	var(--TransWhite);}
			.pageNumber {
				padding: 		4px 20px 3px;
				border-radius: 	15px;
				background: 	var(--accent9);

				p {
					color: var(--accent10);}}}}

</style>
