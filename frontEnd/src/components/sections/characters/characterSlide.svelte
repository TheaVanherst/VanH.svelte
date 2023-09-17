<script>
    import Carousel from "$root/components/generic/carousel.svelte";

    import CharacterCardWrap 	from "$root/components/sections/characters/homepageHoverSlide.svelte";
    import GenericInfo 			from "$root/components/sections/characters/informationPlate.svelte";

    import { nsfw } from "$lib/controllers/accessibilityController.js";

    export let dataset = {};
</script>

<Carousel>
	{#each dataset as char}
		{#if char.NSFW && $nsfw || !char.NSFW}
			<swiper-slide>
				<CharacterCardWrap data={char}>
					<GenericInfo data={char}/>
				</CharacterCardWrap>
			</swiper-slide>
		{/if}
	{/each}
</Carousel>

<a class="citation externalCitation hover" href="https://twitter.com/stellaempyrea">
	Big thanks to <span>Stella</span> for writing the character descriptions.
</a>

<style lang="scss">
	.citation {	margin: -4px 0 10px auto;}
</style>
