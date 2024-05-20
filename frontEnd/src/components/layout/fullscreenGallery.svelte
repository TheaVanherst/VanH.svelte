<script>
    import { clickOutside } from "$lib/controllers/layoutControllers/transitionPresets.js";
    import { page } 		from "$app/stores";
    import { goto } 		from "$app/navigation";

	import { fade } from "svelte/transition";

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
                let query = new URLSearchParams($page.url.searchParams.toString());
					query.delete('story');
					query.delete('img');
					query.delete('gallery');

                await goto(`?${query.toString()}`,{noScroll: true});

				// Without this, there's a bug where the NSFW button would reactivate the gallery, as it retains the initial
				// raw directory from the initial onmount call, and isn't stripped properly.
                $directoryStatus.query = '';
                $directoryStatus.rawDirectory = $directoryStatus.nsfwOptional + $directoryStatus.strippedUrl

                position = 0;
                galleryChange(undefined);
            }, 50);}

	const
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
		{:else if $fullscreenGalleryStore?.componentData?.gallery}
			<div class="galleryWrapper">
				<div class="positionSet"
					 use:customClickSelection
					 use:clickOutside
					 on:click_outside={() => galleryExit()}>
					<div class="circleWrapper">
						<div class="pageCircleBar">
							{#each $fullscreenGalleryStore.componentData.gallery as dot, i}
								<div class="pagingDot"
									 class:active={i === position}
									 on:click={() => {position = i; queryUpdate();}}>
								</div>
							{/each}
						</div>
					</div>
					{#if $fullscreenGalleryStore.componentData?.gallery[position]}
						{#if $fullscreenGalleryStore.componentData.gallery[position].desc}
							<div class="imageCitationWrapper">
								<div class="imageCitation">
									<ImageTag border="shortBorder" position="relative">
										<p>{$fullscreenGalleryStore.componentData.gallery[position].desc}</p>
									</ImageTag>
								</div>
							</div>
						{/if}
						<div class="imageContainer">
							<div class="image" on:click={() => {gallerySwap(); queryUpdate();}}>
								<SanityImage image={$fullscreenGalleryStore.componentData.gallery[position]}/>
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
