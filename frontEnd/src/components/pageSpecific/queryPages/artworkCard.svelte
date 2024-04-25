<script>
    import { clickOutside } from "$lib/controllers/layoutControllers/transitionPresets.js";
    import { fullscreenGalleryStore } from "$lib/controllers/layoutControllers/pageSettings.js";

    import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import SanityGalleries 	from "$root/serializer/sanityGalleries.svelte";
    import ArtworkDescription from "$root/components/pageSpecific/queryPages/artworkDescription.svelte";

    export let
		data,
        newTag = 		true,
        disableNew = 	false;

    let active = 	false,
		hover = 	false,
        timer;

    const
        newAddition = (new Date() - new Date(data.publishedAt)) / (1000 * 3600 * 24) < 7;

    const
		imageClick = () => {
        	if (active) {
                active = !active;}
            else {
                $fullscreenGalleryStore.componentUrl = ArtworkDescription;
                $fullscreenGalleryStore.componentData = data;}},
		cardFloatClick = () => {
        	active = active ? active : !active;};
</script>

<div class="interactionWrapper wideBorder" class:glow={newAddition && !disableNew}
	 on:mouseenter={() => {hover = true; clearInterval(timer);}}
	 use:clickOutside
	 on:click_outside={() => hover = active = false}
	 on:mouseleave={() => {timer = setInterval(function () {hover= active = false;}, 500)}}>
	{#if newTag && newAddition && !disableNew}
		<div class="newItem shortBorder">
			<p>
				NEW
			</p>
		</div>
	{/if}
	<div class="galleryWrapper">
		<div class="galleryContainer" on:click={imageClick} class:clickable={active}>
			<div class="imageGallery" class:blurred={data.sfw && !$navigationControls.nsfw}>
				<SanityGalleries portableText={data.gallery}/>
			</div>
		</div>
		<div class="galleryCard" on:click={cardFloatClick}>
			<ArtworkDescription {data} {hover} {active} absolute={true}/>
		</div>
	</div>
</div>


<style lang="scss">
	.interactionWrapper, .galleryWrapper, .galleryContainer, .imageGallery {
		height: 100%;
		width: auto;}

	.interactionWrapper {
		&.glow {
			border-radius: 	9px;
			border: 		2px solid var(--accent7);

			.newItem {
				position: 	absolute;
				z-index: 	1;
				background: var(--accent7);
				margin:	 	5px;

				p {	font-weight: 700;
					padding: 5px 12px 5px 12px;}}}}



	.galleryWrapper {
		position: 	relative;
		overflow: hidden;
		.galleryContainer {
			pointer-events: all;
			&.clickable {
				.imageGallery {
					pointer-events: none;}}}}
	.galleryCard {
		bottom: 0;}
</style>