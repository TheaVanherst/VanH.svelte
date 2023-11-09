<script>
	import { fade } from "svelte/transition";

	import { fullscreenGallery, galleryChange } from "$lib/pageSettings/pageSettings.js";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    import ImageTag from "$root/components/generic/imageContainers/imageTag.svelte";

    import { clickOutside } from "$lib/transitions/transitionPresets.js";

	let position = 0,
		maxPosition = 0;

	const
		updateCall = () => {
            maxPosition = $fullscreenGallery?.gallery.length - 1;
            position = $fullscreenGallery.currentImage;},
		gallerySwap = () => {
            position < maxPosition ? position++ : galleryExit();},
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
				{#key position}
					<div class="pageNumber">
						<p>{position + 1} / {maxPosition + 1}</p>
					</div>
				{/key}
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
			<div class="positionSet" on:click={() => gallerySwap()}>
				{#if $fullscreenGallery?.gallery[position]}
					<div class="image wideBorder">
						<SanityImage image={$fullscreenGallery.gallery[position]}/>
					</div>
				{/if}
				{#if $fullscreenGallery?.citation[position]}
					<div class="imageCitation">
						<ImageTag border="shortBorder" position="relative">
							<p>{$fullscreenGallery?.citation[position]}</p>
						</ImageTag>
					</div>
				{/if}
				<p style="height: 500px">test</p>
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
			margin: 50px 15px 15px;}}

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
				padding: 		2px 20px 1px;
				border-radius: 	15px;
				background: 	var(--accent9);
				p {	color: 		var(--accent10);}}}}
</style>
