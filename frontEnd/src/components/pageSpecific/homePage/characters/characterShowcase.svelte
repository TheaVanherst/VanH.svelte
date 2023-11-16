<script>
    import Carousel from "$root/components/generic/controllers/carousel.svelte";
    import CharacterCard 	from "$root/components/generic/imageContainers/showcaseCard.svelte";
    import InfoPlate 			from "$root/components/pageSpecific/homePage/characters/characterInfoPlate.svelte";

    import { navigationControls } from "$lib/pageSettings/redirectHandling.js";
    export let dataset = {};
</script>

{#if dataset}
	<Carousel>
		{#each dataset as char}
			{#if char && char.nsfw && $navigationControls.nsfw || !char.nsfw}
				<swiper-slide>
					<div class="card">
						<CharacterCard image={char.render}>
							<p slot="imageTag">{char.developmentStatus}</p>

							<div slot="title">
								<h4>{char.nickName}</h4>
								<p>{char.job}</p>
							</div>

							<div slot="desc">
								<InfoPlate data={char}/>
							</div>
						</CharacterCard>
					</div>
				</swiper-slide>
			{/if}
		{/each}
	</Carousel>
{/if}

<a class="citation externalCitation hover" href="https://twitter.com/stellaempyrea" target="_blank">
	Big thanks to <span>Stella</span> for writing the character descriptions.
</a>

<style lang="scss">
	.citation {
		margin: 	-4px 0 10px auto;}
	.card {
		height: 	520px;}
</style>
