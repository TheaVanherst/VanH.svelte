<script>
    import Carousel from "$root/components/generic/carousel.svelte";

    import ImageTitleplate 	from "$root/components/sections/generic/imageTitleplate.svelte";
    import GenericInfo 			from "$root/components/sections/characters/characterInfoPlate.svelte";

    import { nsfw } from "$lib/controllers/accessibilityController.js";

    export let dataset = {};
</script>

{#if dataset}
	<Carousel>
		{#each dataset as char}
			{#if char.NSFW && $nsfw || !char.NSFW}
				<swiper-slide>
					<ImageTitleplate
							image={char.fullRender} title={char.nickName} subtitle={char.job} hoverable={true}>
						<GenericInfo data={char}/>
					</ImageTitleplate>
				</swiper-slide>
			{/if}
		{/each}
	</Carousel>
{/if}

<a class="citation externalCitation hover" href="https://twitter.com/stellaempyrea">
	Big thanks to <span>Stella</span> for writing the character descriptions.
</a>

<style lang="scss">
	.citation {	margin: -4px 0 10px auto;}
</style>
