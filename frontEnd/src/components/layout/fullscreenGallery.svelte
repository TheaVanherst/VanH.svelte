<script>
    import { fade } 	from "svelte/transition";

    import { page } 	from "$app/stores";
    import { goto } 	from "$app/navigation";

    import { clickOutside } 											from "$lib/scripts/transitionPresets.js";
    import { fullscreenGalleryStore, messengerSettings, galleryChange } from "$lib/settings/pageSettings.js";
    import { deviceData, directoryStatus } 								from "$lib/settings/navigationHandling.js";

    import SanityImage 	from "$root/serializer/sanityImage.svelte";
    import ImageTag 	from "$root/components/generic/containers/imageContainers/imageTag.svelte";

    let currentGalleryPos = 0,
        maxGalleryPos = 0,
        timeoutCheck = false;

    const
		updateQuery = () => { // Update URL query parameters
			const query = new URLSearchParams($page.url.searchParams);
			currentGalleryPos !== 0
				? query.set("img", currentGalleryPos)
				: query.delete("img");
			goto(`?${query.toString()}`, { noScroll: true });
		},
		initializeGallery = () => { // Handle gallery initialization
			const { gallery } = $fullscreenGalleryStore?.componentData || {};
			maxGalleryPos = gallery?.length - 1 || 0;
			currentGalleryPos = $fullscreenGalleryStore.currentImage || 0;
			updateQuery();
        },
		gallerySwap = () => { // Move to the next image or exit the gallery
			currentGalleryPos < maxGalleryPos
				? (currentGalleryPos++, updateQuery())
				: exitGallery();
    	},
		exitGallery = async () => {
			setTimeout(async () => {
				if (!timeoutCheck) {
					const query = new URLSearchParams($page.url.searchParams);
					query.delete("story");
					query.delete("img");
					query.delete("gallery");

					await goto(`?${query.toString()}`, { noScroll: true });
					directoryStatus.query = "";
					directoryStatus.rawDirectory =
						directoryStatus.nsfwOptional + directoryStatus.strippedUrl;

					currentGalleryPos = 0;
					galleryChange(undefined);}
				timeoutCheck = false;
			}, 50);
		};

    // Clean up gallery component name
    const renameComponent = (name) =>
        name.replace("Proxy<", "").replace(">", "");

    // Manage scrolling and messenger state
    const
		mounted = () => {
			messengerSettings.set(false);
			document.body.classList.add("noScroll");},
     	unmounted = () => {
			document.body.classList.remove("noScroll");
			messengerSettings.set(true);};

    // Reactively toggle gallery mount state
    $: $fullscreenGalleryStore.componentData ? mounted() : unmounted();

    // TODO: add aria role function to close the gallery.
	// this just generally needs more fixing.
</script>

{#if $fullscreenGalleryStore.componentData}
	<div class="galleryElement"
		 class:mobile={$deviceData.deviceType < 2}
		 transition:fade
		 role="dialog"
		 aria-labelledby="gallery-heading"
		 aria-describedby="gallery-description"
		 aria-hidden="false">
		{#if $fullscreenGalleryStore?.componentData?.gallery}
			<div class="imageSelectionHolster"
				 use:initializeGallery
				 role="navigation"
				 aria-label="Gallery Navigation">
				<div class="selectionDots"
					 role="tablist"
					 tabindex="0"
					on:click={() => {timeoutCheck = true;}}
					on:keydown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {timeoutCheck = true;}}}>
					{#each $fullscreenGalleryStore.componentData.gallery as dot, i}
						<button class="pagingDot"
								class:active={i === currentGalleryPos}
								role="tab"
								tabindex="0"
								aria-selected={i === currentGalleryPos}
								aria-controls={`gallery-image-${i}`}
								on:click={() => {currentGalleryPos = i; updateQuery();}}
								on:keydown={(e) => {
									if (e.key === 'Enter' || e.key === ' ') {currentGalleryPos = i; updateQuery();}}}/>
					{/each}
				</div>
				{#if $fullscreenGalleryStore.componentData.gallery[currentGalleryPos].desc}
					<div class="imageCitation" role="note" aria-live="polite">
						<ImageTag border="wideBorder" position="relative">
							<p>{$fullscreenGalleryStore.componentData.gallery[currentGalleryPos].desc}</p>
						</ImageTag>
					</div>
				{/if}
			</div>
		{/if}
		<div class="generalImageWrapper imageWrapper"
			 use:clickOutside
			 role="presentation"
			 on:click_outside={() => {exitGallery();}}>
			{#if $fullscreenGalleryStore?.componentData?.gallery}
				<div class="verticalAlignmentHolster wideBorder"
						role="button"
						tabindex="0"
						aria-label="Next Image"
						on:click={() => {gallerySwap(); updateQuery();}}
						on:keydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { gallerySwap(); updateQuery(); } }}>
					{#if $fullscreenGalleryStore.componentData?.gallery[currentGalleryPos]}
						<SanityImage image={$fullscreenGalleryStore.componentData.gallery[currentGalleryPos]}/>
					{/if}
				</div>
			{/if}
			{#if $fullscreenGalleryStore?.componentData}
				<div class="componentWrapper"
					 id="{renameComponent($fullscreenGalleryStore.componentUrl.name)}"
					 use:clickOutside
					 role="region"
					 aria-label="Additional Gallery Information"
					 on:click_outside={() => {$fullscreenGalleryStore?.componentData?.gallery?.length > 0 ? null : exitGallery() }}>
					<div class="component">
						<svelte:component
								this={$fullscreenGalleryStore.componentUrl}
								data={$fullscreenGalleryStore.componentData}/>
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<style lang="scss">
	.galleryElement {
        position: 	fixed;
		overflow: 	hidden scroll;
		z-index: 	10;
		width: 		100%;
		height: 	100vh;
		background: var(--transPure2);}

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
		.component {
			pointer-events: all;}}

	.generalImageWrapper {
		justify-content: 	center;
		align-items: 		center;
		// these allow clicking off the gallery.
		display: 			grid;
		height: 			auto;
		overflow: 			initial;

		.verticalAlignmentHolster {
			display: 	flex;
			margin: 	0 auto;
			width: 		100%;
			overflow: 	hidden;
			:global(img){
				max-height: 80vh;
				object-fit: contain;
				pointer-events: all;}}}

	.componentWrapper {
		display: 	flex;
		margin: 	0 0 100px 0;
		.component {
			max-width: 	500px;
			width: 		100%;
			margin: 	35px auto 50px auto;}}

	// mobile

	.mobile {
		#StoryCard {		margin: 0 0 200px;}
		.componentWrapper {	margin: 	0;
							width: 		100%;}}

</style>
