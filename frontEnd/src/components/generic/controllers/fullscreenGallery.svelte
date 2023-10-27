<script>
	import { fade } from "svelte/transition";
	import { fullscreenGallery, galleryChange } from "$lib/controllers/pageSettings.js";

    import SanityGalleries from "$root/serializer/types/sanityGalleries.svelte";
    import GenericButton from "$root/components/generic/wrappers/genericButton.svelte";

    import { clickOutside } from "$lib/transitions/transitionPresets.js";

    let transitionSpeed = 250;
</script>

{#if $fullscreenGallery}
	<div class="overlay" in:fade={{delay:transitionSpeed}} out:fade>
		<div class="preview" on:click={() => galleryChange(undefined)}>
			<GenericButton icon="/icons/closeIcon"/>
		</div>

		<div class="wrapper">
			<div class="center" use:clickOutside on:click_outside={() => galleryChange(undefined)}>
				<SanityGalleries portableText={$fullscreenGallery}/>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	.overlay {
        position: 	fixed;
		z-index: 	10;
		left: 		0;
		top: 		0;

		background: var(--TransBlack);
		width: 		100%;
		height: 	100%;}

	.preview {
		position: 	absolute;
		z-index: 	1;
		right: 		0;
		margin:	 	22px;}

	.wrapper {
		position: absolute;
		display: flex;
		width: 100%;
		height: 100%;

		.center {
			margin: 	auto;
			padding: 	15px;
			max-height: calc(100vh - 30px);
			max-width: 	calc(100% - 30px);
			overflow: 	scroll;}}
</style>