<script>
	import { fade } from "svelte/transition";

	import { fullscreenGalleryStore, messengerSettings, galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";
    import {deviceData, directoryStatus} from "$lib/controllers/layoutControllers/navigationHandling.js";

    import SanityImage 	from "$root/serializer/sanityImage.svelte";
    import ImageTag 	from "$root/components/generic/containers/imageContainers/imageTag.svelte";

    import { clickOutside } from "$lib/controllers/layoutControllers/transitionPresets.js";
    import { onDestroy, onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";

	let position = 0,
		maxPosition = 0;

	const
		customClickSelection = () => {
            maxPosition = $fullscreenGalleryStore?.gallery.length - 1;
            position = $fullscreenGalleryStore.currentImage;},
		gallerySwap = () => {
            position < maxPosition ? position++ : galleryExit();},
		galleryExit = async () => {
            setTimeout(async () => {
                if (!!$fullscreenGalleryStore.componentData.story) {
                    new URLSearchParams($page.url.searchParams.toString()).delete('story');}
                if (!!$fullscreenGalleryStore.componentData.story) {
                    new URLSearchParams($page.url.searchParams.toString()).delete('img');
                    new URLSearchParams($page.url.searchParams.toString()).delete('gallery');}

                await goto(`${$directoryStatus.rawDirectory}`);
                position = 0;
                galleryChange(undefined);
            }, 50);
		}

	onMount(() => {
        messengerSettings.set(true);
        document.body.classList.remove("noScroll");});

	onDestroy(() => {
        document.body.classList.add("noScroll");
        messengerSettings.set(false);});
</script>

{#if $fullscreenGalleryStore.componentData}
	<div class="galleryElement"
		 class:mobile={$deviceData.deviceType < 2}
		 transition:fade>
		{#if $fullscreenGalleryStore.componentData.story}
			<div class="galleryWrapper">
				<div class="positionSet"
					 use:clickOutside
					 on:click_outside={() => galleryExit()}>
					<svelte:component
							this={$fullscreenGalleryStore.componentUrl}
							story={$fullscreenGalleryStore.componentData}/>
				</div>
			</div>
			<div class="endButton wideBorder">
				<h4>Fin.</h4>
			</div>
		{:else if $fullscreenGalleryStore.gallery}
			<div class="galleryWrapper">
				<div class="positionSet"
					 use:customClickSelection
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
		{/if}
	</div>
{/if}

<style lang="scss">
	.galleryElement {
        position: 	fixed;
		display: 	grid;
		overflow: 	hidden scroll;
		z-index: 	10;
		width: 		100%;
		height: 	100vh;
		background: var(--TransBlack);

		.galleryWrapper {
			margin: 	auto;
			.positionSet {
				margin: 15px;}}}

	// Erotica

	.endButton {
		pointer-events: none;
		padding: 	6px 10px 150px 25px;
		margin: 	0 auto;
		max-width: 	620px;
		h4 {
			width: max-content;
			margin: 0 10px 0 auto;}}

	.mobile {
		.endButton {
			margin: 0 auto 35px auto;}}

	// Artwork

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

	.imageCitationWrapper {
		position: 	absolute;
		z-index: 	1;
		.imageCitation {
			margin: 0 auto 0 auto;
			width: 	max-content;}}

	.imageContainer {
		.image {
			border-radius: 	var(--bordernormal);
			background: 	var(--TransBlack);
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
