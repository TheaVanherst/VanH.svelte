<script>
	import { fade } from "svelte/transition";

	import { fullscreenGalleryStore, galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    import ImageTag from "$root/components/generic/containers/imageContainers/imageTag.svelte";

    import { clickOutside } from "$lib/controllers/transitionPresets.js";

	let position = 0,
		maxPosition = 0;

	const
		updateCall = () => {
            maxPosition = $fullscreenGalleryStore?.gallery.length - 1;
            position = $fullscreenGalleryStore.currentImage;},
		gallerySwap = () => {
            position < maxPosition ? position++ : galleryExit();},
		galleryExit = () => {
            position = 0;
            galleryChange(undefined);}
</script>

{#if $fullscreenGalleryStore.gallery}
	<div class="overlay"
		 	use:updateCall
			in:fade={{delay:250}}
		 	out:fade>
		<div class="wrapper"
				use:clickOutside
			 	on:click_outside={() => galleryExit()}>
			<div class="circleWrapper">
				<div class="pageCircleBar">
					{#each $fullscreenGalleryStore?.gallery as dot, i}
						<div class="pagingDot"
							 class:active={i === position}
							 on:click={() => {position = i}}>
						</div>
					{/each}
				</div>
			</div>

			<div class="positionSet" on:click={() => gallerySwap()}>
				{#if $fullscreenGalleryStore?.gallery[position]}
					<div class="image wideBorder">
						<SanityImage image={$fullscreenGalleryStore.gallery[position]}/>
					</div>
				{/if}
				{#if $fullscreenGalleryStore?.citation[position]}
					<div class="imageCitation">
						<ImageTag border="shortBorder" position="relative">
							<p>{$fullscreenGalleryStore?.citation[position]}</p>
						</ImageTag>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.overlay {
        position: 	fixed;
		display: 	flex;
		overflow: 	scroll;
		z-index: 	10;
		width: 		100%;
		height: 	100vh;
		background: var(--TransBlack);}

	.wrapper {
		margin: 	auto;
		.positionSet {
			margin: 15px;}}

	.imageCitation {
		margin: 	0 auto;
		position: 	relative;
		width: 		max-content;}

	.image {
		overflow: 	hidden;
		box-shadow: 0 0 15px #000;
		background: var(--TransBlack);

		:global(img){
			display: 	flex;
			max-width: 	85vh;
			max-height: 85vh;
			object-fit: contain;}}

	.circleWrapper {
		position: 	absolute;
		display: 	flex;

		width: 	100%;
		bottom: 0;
		left: 	0;

		.pageCircleBar {
			display: 	flex;
			height: 	max-content;

			margin: 	0 auto;
			padding: 	15px;
			gap: 		5px;

			.pagingDot {
				border-radius: 	5px;}}}
</style>
