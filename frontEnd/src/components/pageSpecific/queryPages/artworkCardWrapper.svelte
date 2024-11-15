<script>
    import { clickOutside } 		from "$lib/scripts/transitionPresets.js";
    import { galleryStore } 		from "$lib/settings/pageSettings.js";
    import { navigationControls } 	from "$lib/settings/navigationHandling.js";

    import SanityGalleries 			from "$root/serializer/sanityGalleries.svelte";
    import ArtworkDescription 		from "$root/components/pageSpecific/queryPages/artworkDescription.svelte";

    export let
		data,
        newTag = 		true,
        disableNew = 	false;

    let active = 	false,
		hover = 	false,
        timer;

    const
        newAddition = (new Date() - new Date(data.publishedAt)) / (1000 * 3600 * 24) < 7,
        cardSelected = () => {
            if (!active) {
                const dataReOrg = structuredClone(data);
                const { styleType: style, renderType: render } = data.gallery;

                dataReOrg.gallery = dataReOrg.gallery.images.flat();

                if (style && render) {
                    dataReOrg.gallery.styleType = 	style;
                    dataReOrg.gallery.renderType = 	render;}
                // forces the gallery object to a 2d array, rather than 3d.
                galleryStore(ArtworkDescription,dataReOrg)}};

    const
		cardFloatClick = () => {
			active = active ? active : !active;},
		accessibilityToggle = () => {
        	active = !active;},
    	hovered = () => {
			hover = true;
			clearInterval(timer);},
		unhovered = () => {
			timer = setTimeout(() => {
				hover = false;
				active = false;
			}, 500);},
		clickOff = () => {
			hover = false;
			active = false;};

</script>

<div
		class="interactionWrapper wideBorder"
		class:glow={newAddition && !disableNew}
		use:clickOutside
		on:mouseenter={hovered}
		on:mouseleave={unhovered}
		on:click_outside={clickOff}
		role="region"
		aria-label="Artwork Description Wrapper"
>
	{#if newTag && newAddition && !disableNew}
		<div class="newItem shortBorder" role="status" aria-live="polite">
			<p>NEW</p>
		</div>
	{/if}
	<div class="galleryWrapper">
		<div	class="galleryContainer"
				on:click={cardSelected}
				class:clickable={active}
				role="button"
				tabindex="0"
				aria-pressed={active}
				aria-label="Select Gallery"
				on:mouseenter={hovered}
				on:mouseleave={unhovered}
				on:keydown={(e) => e.key === 'Enter' && cardSelected()}>
			<div	class="imageGallery"
					class:blurred={data.sfw && !navigationControls.nsfw}
					role="img"
					aria-label="Image Gallery">
				<SanityGalleries portableText={data.gallery} />
			</div>
		</div>
		<div 	class="galleryCard"
				on:click={cardFloatClick}
				role="button"
				tabindex="0"
				aria-label="Expand Artwork Description"
				on:mouseenter={hovered}
				on:mouseleave={unhovered}
				on:keydown={(e) => e.key === 'Enter' && accessibilityToggle(e)}>
			<ArtworkDescription {data} {hover} {active} absolute={true} />
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
		.galleryContainer {		pointer-events: all;
			&.clickable {
				.imageGallery {	pointer-events: none;}}}}
	.galleryCard {	bottom: 5px;
					left: 5px;
					width: calc(100% - 10px);
					position: relative;}
</style>