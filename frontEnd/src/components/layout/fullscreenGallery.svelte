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
		maxGalleryPos = 	0,
        timeoutCheckBool = 	false;

    const
		queryUpdate = () => {
            let query = new URLSearchParams($page.url.searchParams.toString());
            currentGalleryPos !== 0 ? query.set('img', currentGalleryPos) : query.delete('img');
            goto (`?${query.toString()}`,{noScroll: true});},
		customClickSelection = () => {
            maxGalleryPos = 	$fullscreenGalleryStore?.componentData?.gallery.length - 1;
            currentGalleryPos = $fullscreenGalleryStore.currentImage;
            queryUpdate();},
		imageUrlUpdate = () => {
            currentGalleryPos++
            queryUpdate();},
		gallerySwap = () => {
        	currentGalleryPos < maxGalleryPos ? imageUrlUpdate() : galleryExit();},
		galleryExit = async () => {
            setTimeout(async () => {
                if (!timeoutCheckBool) {
					let query = new URLSearchParams($page.url.searchParams.toString());
						query.delete('story');
						query.delete('img');
                        query.delete('gallery');

					await goto(`?${query.toString()}`,{noScroll: true});
					$directoryStatus.query = '';
					$directoryStatus.rawDirectory = $directoryStatus.nsfwOptional + $directoryStatus.strippedUrl

					currentGalleryPos = 0;
					galleryChange(undefined);}
                timeoutCheckBool = false;
            }, 50);};

    const
        componentDataRenamer = (name) => {
            name = name.replace("Proxy<","");
            name = name.replace(">","");
            return name;},
		mounted = () => {
			messengerSettings.set(false);
			document.body.classList.add("noScroll");},
		unmounted = () => {
			document.body.classList.remove("noScroll");
			messengerSettings.set(true);}

	$: !!$fullscreenGalleryStore.componentData ? mounted() : unmounted();
</script>

{#if $fullscreenGalleryStore.componentData}
	<div class="galleryElement"
		 class:mobile={$deviceData.deviceType < 2}
		 transition:fade>
		{#if $fullscreenGalleryStore?.componentData?.gallery}
			<div class="imageSelectionHolster"
				 use:customClickSelection
				 on:click={() => {timeoutCheckBool = true;}}>
				<div class="selectionDots">
					{#each $fullscreenGalleryStore.componentData.gallery as dot, i}
						<div class="pagingDot" class:active={i === currentGalleryPos}
							 on:click={() => {currentGalleryPos = i; queryUpdate();}}/>
					{/each}
				</div>
				{#if $fullscreenGalleryStore.componentData.gallery[currentGalleryPos].desc}
					<div class="imageCitation">
						<ImageTag border="wideBorder" position="relative">
							<p>{$fullscreenGalleryStore.componentData.gallery[currentGalleryPos].desc}</p>
						</ImageTag>
					</div>
				{/if}
			</div>
		{/if}
		<div class="generalImageWrapper imageWrapper"
			 use:clickOutside
			 on:click_outside={() => {galleryExit();}}>
			{#if $fullscreenGalleryStore?.componentData?.gallery}
				<div class="verticalAlignmentHolster wideBorder"
					 	on:click={() => {gallerySwap(); queryUpdate();}}>
					{#if $fullscreenGalleryStore.componentData?.gallery[currentGalleryPos]}
						<SanityImage image={$fullscreenGalleryStore.componentData.gallery[currentGalleryPos]}
									 scaleType={$fullscreenGalleryStore?.componentData?.gallery?.styleType === "Pixel Art"}/>
					{/if}
				</div>
			{/if}
			{#if $fullscreenGalleryStore?.componentData}
				<div class="componentWrapper" id="{componentDataRenamer($fullscreenGalleryStore.componentUrl.name)}"
					 	use:clickOutside
					 	on:click_outside={() => {$fullscreenGalleryStore?.componentData?.gallery?.length > 0 ? null : galleryExit() }}>
					<div class="component">
						<svelte:component
								this={$fullscreenGalleryStore.componentUrl}
								data={$fullscreenGalleryStore.componentData}/>
				</div></div>
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
