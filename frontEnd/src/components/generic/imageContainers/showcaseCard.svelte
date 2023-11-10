<script>
    import { fly } from 'svelte/transition';

    import SanityImage from "$root/serializer/types/sanityImage.svelte";
    import ImageTag from "$root/components/generic/imageContainers/imageTag.svelte";

    import { deviceType } from "$lib/pageSettings/redirectHandling.js";

    export let
		image = undefined;

    let active = false;
</script>

<div class="characterCard wideBorder"
	 on:click={() => {active = !active}}
	 on:mouseenter={() => {$deviceType === 2 ? active = true : false}}
	 on:mouseleave={() => {active = false}}>

	<div class="imageWrapper">
		<SanityImage image={image}/>
		<ImageTag active={active}>
			<slot name="imageTag"/>
		</ImageTag>
	</div>

	{#if !active}
		<div class="previewCard"
			 transition:fly={{y: 50, duration: 400 }}>
			<div class="title regularBorder">
				<slot name="title"/>
			</div>
		</div>
	{:else}
		<div class="infoPlate"
			 transition:fly={{y: -50, duration: 400 }}>
			<slot name="desc"/>
		</div>
	{/if}
</div>

<style lang="scss">
	:global(.characterCard *) {
		color: 		black;}

	.characterCard {
		display: 	flex;
		position: 	relative;
		overflow: 	hidden;

		width: 		100%;
		height:		100%;}

	.previewCard {
		position: 	absolute;
		z-index: 	1;
		bottom: 	0;
		width: 		100%;

		.title {
			margin:     5px 5px 5px 5px;
			padding: 	7px 10px 10px 10px;
			background: var(--TransWhite);}}

	.infoPlate {
		position: 	absolute;
		overflow-y:	scroll;
		height: 	100%;}

</style>