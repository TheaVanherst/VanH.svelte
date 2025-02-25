<script>
    import { deviceData, navigationControls
    					  } from '$lib/settings/navigationHandling.js';

    import SidebarTexts 	from "$root/components/layout/coreLayoutComponents/pageLayout/sidebarTexts.svelte";
    import ArtworkCard 		from "$root/components/pageSpecific/queryPages/artworkCardWrapper.svelte";
    import Carousel 		from "$root/components/generic/containers/imageContainers/carousel.svelte";

    import WorkshopCard 	from "$root/components/pageSpecific/queryPages/workshop/workshopPreview.svelte";
    import WorkshopSnippet 	from "$root/components/pageSpecific/queryPages/workshop/workshopSnippet.svelte";

	import CharacterFeature from "$root/components/pageSpecific/homePage/characterShowcase.svelte";
    import KofiCards 		from "$root/components/pageSpecific/kofiCards.svelte";
    import QandaFeature 	from "$root/components/pageSpecific/homePage/qandaFeature.svelte";

    export let data;
</script>

<SidebarTexts titlecard="Characters" icon="profileIcon.webp">
	<CharacterFeature dataset={data.characterData.characters}/>
</SidebarTexts>

{#if $navigationControls.nsfw}
	<SidebarTexts titlecard="Artwork" icon="galleryIcon.webp">
		<Carousel maxWidth={2}>
			{#each data.artworks as artwork}
				<swiper-slide>
					<div class="artworkCard">
						<ArtworkCard data={artwork} disableNew={true}/>
					</div>
				</swiper-slide>
			{/each}
		</Carousel>
	</SidebarTexts>
{/if}

<SidebarTexts titlecard="Workshop" icon="steamLogo.webp">
	{#if data.workshopData.full}
		<Carousel>
			{#each data.workshopData.full as data}
				{#if $navigationControls.localNsfwCheck(data?.NSFW)}
					<swiper-slide>
						<WorkshopCard {data}/>
					</swiper-slide>
				{/if}
			{/each}
		</Carousel>
	{/if}
	{#if data.workshopData.snippets}
		<div class="navWrapper">
			<div class="offset">
				<Carousel customCalc={$deviceData.screenSize < 800 ? $deviceData.screenSize / 85 : 800 / 85}>
					{#each data.workshopData.snippets as item}
						{#if $navigationControls.localNsfwCheck(item?.NSFW)}
							<swiper-slide>
								<WorkshopSnippet {item}/>
							</swiper-slide>
						{/if}
					{/each}
				</Carousel>
			</div>
		</div>
	{/if}
</SidebarTexts>

<SidebarTexts titlecard="Designs" icon="galleryIcon.webp">
	<Carousel maxWidth={3}>
		{#each data.designs as artwork}
			<swiper-slide>
				<div class="artworkCard">
					<ArtworkCard data={artwork} disableNew={true}/>
				</div>
			</swiper-slide>
		{/each}
	</Carousel>
</SidebarTexts>

{#if $navigationControls.nsfw}
	<SidebarTexts titlecard="Support" icon="patreonIcon.webp">
		<KofiCards tiers={data.donationData.tiers}/>
	</SidebarTexts>
{/if}

<SidebarTexts titlecard="Q&A" icon="wrenchIcon.webp">
	<QandaFeature dataset={data.qAndA}/>
</SidebarTexts>

<style lang="scss">
	.artworkCard { height: 500px;}

	.navWrapper {	margin: 0 auto 10px auto;
		.offset {	margin: -8px 0 2px 0; }}

	#github {
		display: 	flex;
		flex-wrap: 	wrap;
		gap: 	 	10px;
		margin-bottom: 15px;
		.cell {		width: calc(50% - 6px);}
		&.full {
			.cell {	width: 100%;}}

		* {	transition: .3s cubic-bezier(0.33, 1, 0.68, 1);}
		a:hover {
			.referral {
				background: var(--accent1)!important;
				p {	color: 	white!important;}}}

		.slide {
			overflow: hidden;
			.thumbnail {
				position: 	relative;
				overflow: 	hidden;
				max-height: 180px;
				min-height: 150px;
				.imageWrapper {
					height: 250px;}}}
		.referral { // fallback colour
			padding: 	7px 9px 6px 9px;
			overflow: 	hidden;
			background: var(--pure1);
			p {	color: 			black;
				font-weight: 	600;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				display: 	-webkit-box;
				overflow: 	hidden;}}}
</style>