<script>
	import { fade } from "svelte/transition";
	import { fullscreenGallery, galleryChange } from "$lib/controllers/pageSettings.js";

    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    import { clickOutside } from "$lib/transitions/transitionPresets.js";

    let transitionSpeed = 250;

	let position = 0,
		maxPosition = 0;

	const
		updateCall = () => {
            maxPosition = $fullscreenGallery?.images.length - 1;
            position = 0;},
		gallerySwap = () => {
			if (position < maxPosition) {
				position++;}
			else {
				galleryExit();}},

		galleryExit = () => {
            position = 0;
            galleryChange(undefined);}
</script>

{#if $fullscreenGallery}
	<div class="overlay" use:updateCall
		in:fade={{delay:transitionSpeed}} out:fade>
		<div class="circleWrapper">
			<div class="pageCircleBar">
				{#each $fullscreenGallery?.images as dot, i}
					{#if i < position}
						<div class="circle">
						</div>
					{/if}
				{/each}
				<div class="pageNumber">
					<p>{position + 1} / {maxPosition + 1}</p>
				</div>
				{#each $fullscreenGallery?.images as dot, i}
					{#if i > position}
						<div class="circle">
						</div>
					{/if}
				{/each}
			</div>
		</div>

		<div class="wrapper">
			{#if $fullscreenGallery?.images[position]}
				<div class="image wideBorder"
					use:clickOutside on:click_outside={() => galleryExit()}
					on:click={() => gallerySwap()}>
					<SanityImage image={$fullscreenGallery?.images[position]}/>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.overlay {
        position: 	fixed;
		display: 	flex;
		z-index: 	10;
		width: 		100%;
		height: 	100%;
		background: var(--TransBlack);}

	.wrapper {
		margin: auto;

		.image {
			margin: 15px;
			box-shadow: 0 0 15px #000;

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
				width: 		15px;
				height: 	15px;
				margin: 	auto 0;
				border-radius: 	50%;
				background: 	var(--TransWhite);}
			.pageNumber {
				padding: 		3px 12px 2px;
				border-radius: 	10px;
				background: 	var(--accent9);
				p {
					color: var(--accent10);}}}}

</style>
