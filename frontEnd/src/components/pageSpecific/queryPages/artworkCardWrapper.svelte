<script>
    import { clickOutside } 		from "$lib/scripts/transitionPresets.js";
    import { galleryStore } 		from "$lib/settings/pageSettings.js";
    import { navigationControls } 	from "$lib/settings/navigationHandling.js";

    import SanityGalleries 			from "$root/serializer/sanityGalleries.svelte";
    import ArtworkDescription 		from "$root/components/pageSpecific/queryPages/artworkDescription.svelte";
    import { galleryManager } 		from "$lib/controllers/searchController.js";

    export let
		data,
        newTag = 		true,
        disableNew = 	false,
        expandedTags = 	false;

    let active = 	false,
		hover = 	false,
        timer;

    const
        newAddition = (new Date() - new Date(data.publishedAt)) / (1000 * 3600 * 24) < 7,
        cardSelected = () => {
            const
				{ gallery, ...rest } = data,
            	{ styleType, renderType, images } = gallery;
            const
				galleryData = {
					...rest,
					gallery: images.flat(),
					...(styleType && renderType && { styleType, renderType })};
            // forces the gallery object to a 2d array, rather than 3d.
            galleryManager.artworkSelection(galleryData)
            galleryStore(ArtworkDescription,galleryData)};

    const
    	hovered = () => {
			hover = true;
			clearInterval(timer);},
		unhovered = () => {
			timer = setTimeout(() => {
				hover = false;
				active = false;
			}, 800);},
		clickOff = () => {
        	if (hover) {
                hover = false;
                active = false;}};

</script>

<div
		class="interactionWrapper wideBorder"
		class:glow={newAddition && !disableNew}
		use:clickOutside
		on:click_outside={clickOff}>
	{#if newTag && newAddition && !disableNew}
		<div class="newItem shortBorder" role="status" aria-live="polite">
			<p>NEW</p>
		</div>
	{/if}
	<div class="galleryWrapper">
		<div 	class="galleryCard"
				on:click={() => active = true}
				on:mouseenter={hovered}
				on:mouseleave={unhovered}>
			<ArtworkDescription {data} {hover} {active} {expandedTags}/>
		</div>
		<div	class="galleryContainer"
				on:mouseenter={hovered}
				on:mouseleave={unhovered}>
			<div	class="imageGallery"
					on:click={cardSelected}
					class:blurred={!$navigationControls.localNsfwCheck(data.sfw)}>
				<SanityGalleries portableText={data.gallery} />
			</div>
		</div>
	</div>
</div>


<style lang="scss">
	.interactionWrapper,
	.galleryWrapper,
	.galleryContainer,
	.imageGallery {	height: 100%;
					width: auto;}

	.interactionWrapper {
		&.glow {	border-radius: 	9px;
					border: 		2px solid var(--accent1);
			.newItem { position: 	absolute;
					z-index: 		1;
					background: 	var(--accent1);
					margin:	 		5px;
				p {	font-weight: 	700;
					padding: 		5px 12px 5px 12px;}}}}

	.galleryWrapper {			position: 		relative;
								overflow: 		hidden;
		.galleryContainer {		pointer-events: all;}}
	.galleryCard {
		bottom: 5px;
		left: 	5px;
		width: 	calc(100% - 10px);
		position: 	absolute;
		z-index: 	1;}
</style>