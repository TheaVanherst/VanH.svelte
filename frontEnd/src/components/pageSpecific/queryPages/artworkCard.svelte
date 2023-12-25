<script>
    import { clickOutside } from "$lib/controllers/transitionPresets.js";
    import { fullscreenGalleryStore } from "$lib/controllers/layoutControllers/pageSettings.js";

    import SanityGalleries 	from "$root/serializer/sanityGalleries.svelte";
    import ArtworkDescription from "$root/components/pageSpecific/queryPages/artworkDescription.svelte";

    export let data;

    let active = false,
		hover = false;

    const
		imageClick = () => {
        	if (active) {
                active = !active;}
            else {
                $fullscreenGalleryStore.componentUrl = ArtworkDescription;
                $fullscreenGalleryStore.componentData = data;}},
		cardFloatClick = () => {active = active ? active : !active;};
</script>

<div class="wideBorder"
	 on:mouseenter={() => hover = true}
	 use:clickOutside
	 on:click_outside={() => hover = active = false}
	 on:mouseleave={() => hover = active = false}>

	<div class="galleryWrapper">
		<div class="galleryContainer" on:click={imageClick} class:clickable={active}>
			<div class="imageGallery">
				<SanityGalleries portableText={data.gallery}/>
			</div>
		</div>
		<div class="galleryCard" on:click={cardFloatClick}>
			<ArtworkDescription {data} {hover} {active} absolute={true}/>
		</div>
	</div>
</div>

<style lang="scss">
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