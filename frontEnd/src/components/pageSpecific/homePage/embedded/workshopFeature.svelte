<script>
    import Carousel 		from "$root/components/generic/containers/imageContainers/carousel.svelte";
    import WorkshopCard 	from "$root/components/pageSpecific/homePage/embedded/workshopCard.svelte";
    import WorkshopSnippet 	from "$root/components/pageSpecific/homePage/embedded/workshopSnippet.svelte";

    import { deviceData, navigationControls } from '$lib/controllers/layoutControllers/navigationHandling.js';

    export let dataset;

    let active = false;
</script>

{#if dataset.full}
	<Carousel>
		{#each dataset.full as workshopItem}
			{#if $navigationControls.localNsfwCheck(workshopItem?.NSFW)}
				<swiper-slide>
					<WorkshopCard dataEntry={workshopItem}/>
				</swiper-slide>
			{/if}
		{/each}
	</Carousel>
{/if}

{#if dataset.snippets}
	<div class="navWrapper">
		<div class="desktopOffset">
			<Carousel customCalc={$deviceData.screenSize < 800 ? $deviceData.screenSize / 85 : 800 / 85}>
				{#each dataset.snippets as workshopItem}
					{#if $navigationControls.localNsfwCheck(workshopItem?.NSFW)}
						<swiper-slide>
							<WorkshopSnippet item={workshopItem}/>
						</swiper-slide>
					{/if}
				{/each}
			</Carousel>
		</div>
	</div>
{/if}

<style lang="scss">
	.mobileOffset {	margin: -10px 10px -7px 0;}
	.desktopOffset {margin: -8px 0 2px 0}
	.navWrapper {	margin: 0 auto 10px auto;
		.navigationButton {
			margin: 0 auto;
			&.close {
				margin-top: 10px;}}}
</style>