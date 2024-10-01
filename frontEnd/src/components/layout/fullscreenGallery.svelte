<script>
    import { fade } from "svelte/transition";

    import { page } 		from "$app/stores";
    import { goto } 		from "$app/navigation";

    import { clickOutside } from "$lib/controllers/layoutControllers/transitionPresets.js";
    import { fullscreenGalleryStore, messengerSettings, galleryChange } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { deviceData, directoryStatus } 								from "$lib/controllers/layoutControllers/navigationHandling.js";

    import SanityImage 	from "$root/serializer/sanityImage.svelte";
    import ImageTag 	from "$root/components/generic/containers/imageContainers/imageTag.svelte";

	let position = 0,
		maxPosition = 0;

	const
		queryUpdate = () => {
            let query = new URLSearchParams($page.url.searchParams.toString());
            position !== 0 ? query.set('img', position) : query.delete('img');
            goto (`?${query.toString()}`,{noScroll: true});},
		customClickSelection = () => {
            maxPosition = 	$fullscreenGalleryStore?.componentData?.gallery.length - 1;
            position = 		$fullscreenGalleryStore.currentImage;
            queryUpdate();},
		imageUrlUpdate = () => {
            position++
            queryUpdate();},
		gallerySwap = () => {
        	position < maxPosition ? imageUrlUpdate() : galleryExit();},
		galleryExit = async () => {
            setTimeout(async () => {
                if (!stopCheck) {
					let query = new URLSearchParams($page.url.searchParams.toString());
						query.delete('story');
						query.delete('img');
						query.delete('gallery');
						query.delete('mod');

					await goto(`?${query.toString()}`,{noScroll: true});
					$directoryStatus.query = '';
					$directoryStatus.rawDirectory = $directoryStatus.nsfwOptional + $directoryStatus.strippedUrl

					position = 0;
					galleryChange(undefined);
                }
                stopCheck = false;
            }, 50);}

	const
		mounted = () => {
			messengerSettings.set(false);
			document.body.classList.add("noScroll");},
		unmounted = () => {
			document.body.classList.remove("noScroll");
			messengerSettings.set(true);}

	$: !!$fullscreenGalleryStore.componentData ? mounted() : unmounted();
    let stopCheck = false; // fuck this tbh

	// TODO: Rewrite this to manage seperate components better. It's dog.
	// TODO: honestly, just rewrite this to just be a framework, rather than requiring seperate instances for each slot type.
</script>

{#if $fullscreenGalleryStore.componentData}
	<div class="galleryElement"
		 class:mobile={$deviceData.deviceType < 2}
		 transition:fade>
		{#if $fullscreenGalleryStore.componentData.story}
			<div class="componentWrapper" id="erotica" on:click={() => {queryUpdate();}}
				 use:clickOutside
				 on:click_outside={() => {galleryExit();}}>
				<div class="component">
					<svelte:component
						this={$fullscreenGalleryStore.componentUrl}
						data={$fullscreenGalleryStore.componentData}/>
				</div>
			</div>
		{:else if $fullscreenGalleryStore?.componentData?.gallery}
			<div class="imageSelectionHolster"
				 use:customClickSelection
				 on:click={() => {stopCheck = true;}}>
				<div class="selectionDots">
					{#each $fullscreenGalleryStore.componentData.gallery as dot, i}
						<div class="pagingDot" class:active={i === position}
							 on:click={() => {position = i; queryUpdate();}}>
						</div>
					{/each}
				</div>
				{#if $fullscreenGalleryStore.componentData.gallery[position].desc}
					<div class="imageCitation">
						<ImageTag border="wideBorder" position="relative">
							<p>{$fullscreenGalleryStore.componentData.gallery[position].desc}</p>
						</ImageTag>
					</div>
				{/if}
			</div>
			<div class="generalImageWrapper imageWrapper"
				 use:clickOutside
				 on:click_outside={() => {galleryExit();}}>
				<div class="verticalAlignmentHolster"
					 on:click={() => {gallerySwap(); queryUpdate();}}>
					{#if $fullscreenGalleryStore.componentData?.gallery[position]}
						<SanityImage image={$fullscreenGalleryStore.componentData.gallery[position]}/>
					{/if}
				</div>
				{#if $fullscreenGalleryStore.componentUrl}
					<div class="componentWrapper" on:click={() => {queryUpdate();}}>
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
{/if}

<style lang="scss">
	.galleryElement {
        position: 	fixed;
		overflow: 	hidden scroll;
		z-index: 	10;
		width: 		100%;
		height: 	100vh;
		background: var(--TransBlack);}

	// Paging Dots

	.imageSelectionHolster {
		display: 	grid;
		padding: 	15px 15px 11px 15px;
		margin: 	0 auto;
		gap: 		5px;
		height: 	min-content;
		width: 		min-content;
		pointer-events: none;

		> * {
			display: 	flex;
			margin: 	0 auto;}

		.selectionDots {
			pointer-events: all;
			width: 		min-content;
			gap: 		5px;}
		.imageCitation {
			margin: 	0 auto 0 auto;
			width: 		max-content;}}

	// Artwork

	.generalImageWrapper, .componentWrapper {
		pointer-events: 	none;
		.alignment, .component {
			pointer-events: all;}}

	.generalImageWrapper {
		justify-content: 	center;
		align-items: 		center;
		display: 			grid;
		height: 			auto;
		overflow: 			initial;

		.verticalAlignmentHolster {
			display: 	flex;
			margin: 	0 auto;
			width: 		100%;
			:global(img){
				max-height: 80vh;
				object-fit: contain;
				pointer-events: all;
			}
		}
	}

	.componentWrapper {
		display: 	flex;
		margin: 	0 0 100px 0;
		.component {
			max-width: 	500px;
			width: 		100%;
			margin: 	35px auto 50px auto;}}

	.mobile {
		#erotica {
			margin: 0 0 200px;}
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
