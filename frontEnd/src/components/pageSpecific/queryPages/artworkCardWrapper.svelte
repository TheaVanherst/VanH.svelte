<script>
    import { clickOutside } from "$lib/controllers/layoutControllers/transitionPresets.js";

    import { galleryStore } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { navigationControls } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import SanityGalleries 	from "$root/serializer/sanityGalleries.svelte";
    import ArtworkDescription from "$root/components/pageSpecific/queryPages/artworkDescription.svelte";

    export let
		data,
        newTag = 		true,
        disableNew = 	false;

    let active = 	false,
		hover = 	false,
        timer;

    // TODO: Note to self, this requires to remain seperated from the artwork card, specifically to have
	// TODO: it be seperated in the fullscreen gallery. Don't merge.

    const
        newAddition = (new Date() - new Date(data.publishedAt)) / (1000 * 3600 * 24) < 7,
        cardSelected = () => {
        	if (active) {
                active = !active;}
            else {
                let dataReOrg = structuredClone(data),
					style = 	data.gallery.styleType,
					render = 	data.gallery.renderType;

                dataReOrg.gallery = dataReOrg.gallery.images.flat();

                if (style && render) {
                    dataReOrg.gallery.styleType = 	style;
                    dataReOrg.gallery.renderType = 	render;}
                // forces the gallery object to a 2d array, rather than 3d.
                galleryStore(ArtworkDescription,dataReOrg)}},
		cardFloatClick = () => {
        	active = active ? active : !active;};

    const
		hovered = () => {
			hover = true;
			clearInterval(timer);},
        unhovered = () => {
			timer = setInterval(() => {
				hover = active = false}, 500)},
		clickOff = () => {
            hover = false;
			active = false;}
</script>

<div class="interactionWrapper wideBorder"
	 	class:glow={newAddition && !disableNew}
		 use:clickOutside
		 on:mouseenter={hovered}
		 on:click_outside={clickOff}
		 on:mouseleave={unhovered}>
	{#if newTag && newAddition && !disableNew}
		<div class="newItem shortBorder">
			<p>NEW</p></div>
	{/if}
	<div class="galleryWrapper">
		<div class="galleryContainer"
			 	on:click={cardSelected}
			 	class:clickable={active}>
			<div class="imageGallery"
				 	class:blurred={data.sfw && !$navigationControls.nsfw}>
				<SanityGalleries portableText={data.gallery}/></div></div>
		<div class="galleryCard"
			 	on:click={cardFloatClick}>
			<ArtworkDescription {data} {hover} {active} absolute={true}/>
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
					border: 		2px solid var(--accent7);
			.newItem { position: 	absolute;
					z-index: 		1;
					background: 	var(--accent7);
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