<script>
	import { fade } from "svelte/transition";

	import { fullscreenGalleryStore, galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { deviceData } from "$lib/controllers/layoutControllers/redirectHandling.js";

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
		 	class:mobile={$deviceData.deviceType < 2}
		 	use:updateCall
			transition:fade>
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

			<div class="positionSet">
				{#if $fullscreenGalleryStore?.gallery[position]}
					{#if $fullscreenGalleryStore.gallery[position].desc}
						<div class="imageCitationWrapper">
							<div class="imageCitation">
								<ImageTag border="shortBorder" position="relative">
									<p>{$fullscreenGalleryStore.gallery[position].desc}</p>
								</ImageTag>
							</div>
						</div>
					{/if}
					<div class="imageContainer">
						<div class="image" on:click={() => gallerySwap()}>
							<SanityImage image={$fullscreenGalleryStore.gallery[position]}/>
						</div>
						{#if $fullscreenGalleryStore.componentUrl}
							<div class="componentWrapper">
								<div class="component">
									<svelte:component
											this={$fullscreenGalleryStore.componentUrl}
											data={$fullscreenGalleryStore.componentData}/>
								</div>
							</div>
						{/if}
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
		overflow: 	hidden scroll;
		z-index: 	10;
		width: 		100%;
		height: 	100vh;
		background: var(--TransBlack);

		.wrapper {
			margin: 	auto;}}

	.componentWrapper, .circleWrapper {
		pointer-events: none;
		.pageCircleBar, .component {
			pointer-events: all;}}

	.circleWrapper {
		position: 	absolute;
		display: 	flex;

		width: 	100%;
		top: 	0;
		left: 	0;

		.pageCircleBar {
			display: 	flex;
			margin: 	0 auto;
			padding: 	15px;
			gap: 		5px;}}

	.positionSet {
		margin: 15px;
		.imageCitationWrapper {
			position: 	absolute;
			z-index: 	1;
			.imageCitation {
				margin: 0 auto 0 auto;
				width: 	max-content;}}}

	.imageContainer {
		background: var(--TransBlack);
		.image {
			border-radius: 	var(--bordernormal);
			overflow: 		hidden;}

		:global(img){
			display: 	flex;
			max-width: 	85vh;
			max-height: 85vh;
			object-fit: contain;}}

	.componentWrapper {
		position: 	absolute;
		display: 	flex;
		width: 		calc(100% - 20px);
		left: 		0;
		margin: 	0 10px 0 10px;
		.component {
			max-width: 	600px;
			min-width: 	400px;
			margin: 	35px auto 35px auto;}}

	.mobile {
		.positionSet {
			margin: 0;}
		.componentWrapper {
			margin: 	0;
			width: 		100%;}
		.image {
			> div {
				border-radius: 	0;
				overflow: 		hidden;}
			:global(img){
				max-width: 	100vh;}}}
</style>
