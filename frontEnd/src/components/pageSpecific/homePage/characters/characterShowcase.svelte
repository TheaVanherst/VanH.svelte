<script>
    import Carousel 		from "$root/components/generic/containers/imageContainers/carousel.svelte";
    import CharacterCard 	from "$root/components/pageSpecific/homePage/characters/showcaseCard.svelte";
    import InfoPlate 		from "$root/components/pageSpecific/homePage/characters/characterInfoPlate.svelte";

    import { navigationControls } from "$lib/controllers/layoutControllers/navigationHandling.js";

    export let dataset = {};
</script>

{#if dataset}
	<Carousel>
		{#each dataset as char}
			{#if char && $navigationControls.localNsfwCheck(char.nsfw)}
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

<style lang="scss">
	.citation {
		margin: 	-4px 0 10px auto;}
	.card {
		height: 	520px;}
</style>
