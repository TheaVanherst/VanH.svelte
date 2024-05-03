<script>
    import Carousel 		from "$root/components/generic/containers/imageContainers/carousel.svelte";

    import { navigationControls } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import SidebarTexts 	from "$root/components/layout/pageLayout/sidebarTexts.svelte";

	import CharacterFeature from "$root/components/pageSpecific/homePage/characters/characterShowcase.svelte";
    import WorkshopFeature 	from "$root/components/pageSpecific/homePage/embedded/workshopFeature.svelte";
    import GithubFeature 	from "$root/components/pageSpecific/homePage/embedded/githubFeature.svelte";
    import KofiCards 		from "$root/components/pageSpecific/homePage/kofiCards.svelte";
    import QandaFeature 	from "$root/components/pageSpecific/homePage/qandaFeature.svelte";

    import ArtworkCard from "$root/components/pageSpecific/queryPages/artworkCard.svelte";

    export let data;
</script>

<SidebarTexts titlecard="Characters" icon="profileIcon.webp">
	<CharacterFeature dataset={data.characterData.characters}/>
</SidebarTexts>

<SidebarTexts titlecard="Github" icon="githubLogoLined.webp">
	<GithubFeature dataset={data.githubData}/>
</SidebarTexts>

{#if $navigationControls.nsfw}
	<SidebarTexts titlecard="Artwork" icon="galleryIcon.webp">
		<Carousel>
			{#each data.artworks as artwork, i}
				<swiper-slide>
					{#if !!artwork}
						<div class="artworkCard">
							<ArtworkCard data={artwork} disableNew={true}/>
						</div>
					{/if}
				</swiper-slide>
			{/each}
		</Carousel>
	</SidebarTexts>
{/if}

<SidebarTexts titlecard="Workshop" icon="steamLogoLined.webp">
	<WorkshopFeature dataset={data.workshopData}/>
</SidebarTexts>

{#if $navigationControls.nsfw}
	<SidebarTexts titlecard="Support" icon="kofiLogo.webp">
		<KofiCards tiers={data.donationData.tiers}/>
	</SidebarTexts>
{/if}

<SidebarTexts titlecard="Q&A" icon="commentIcon.webp">
	<QandaFeature dataset={data.qAndA}/>
</SidebarTexts>

<style lang="scss">
	.artworkCard { height: 500px;}
</style>