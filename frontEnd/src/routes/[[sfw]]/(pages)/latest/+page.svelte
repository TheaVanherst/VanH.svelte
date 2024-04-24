<script>
    import Masonry 	from 'svelte-bricks';

    import SidebarTexts 	from "$root/components/layout/pageLayout/sidebarTexts.svelte";
    import ArtworkCard 		from "$root/components/pageSpecific/queryPages/artworkCard.svelte";
    import Carousel 		from "$root/components/generic/containers/imageContainers/carousel.svelte";

	export let data;
</script>

<SidebarTexts titlecard="Highlighted" icon="highlightedIcon.webp">
	<Carousel centered={true}>
		{#each data.highlighted as artwork}
			{#if !!artwork}
				<swiper-slide>
					<div class="highlightedCard">
						<ArtworkCard data={artwork} newTag={false}/>
					</div>
				</swiper-slide>
			{/if}
		{/each}
	</Carousel>
</SidebarTexts>

<SidebarTexts titlecard="Designs" icon="colourWheel.webp">
	<div class="artworkFeature">
		<Masonry
				items=	{data.designs}
				gap=	{10}
				idKey=	{`slug`}
				animate= {false}
				let:item>
			<div class="designCard">
				<ArtworkCard data={item}/>
			</div>
		</Masonry>
	</div>
</SidebarTexts>

<SidebarTexts titlecard="Artwork" icon="galleryIcon.webp">
	<div class="artworkFeature">
		<Masonry
				items=	{data.artworks}
				gap=	{10}
				idKey=	{`slug`}
				animate= {false}
				let:item>
			<div class="artworkCard">
				<ArtworkCard data={item}/>
			</div>
		</Masonry>
	</div>
</SidebarTexts>

<style lang="scss">
	.artworkFeature {
		position: relative;
		margin-bottom: 	15px;}

	.highlightedCard {	height: 500px;}
	.artworkCard {		height: 600px;}
	.designCard {		height: 400px;}
</style>