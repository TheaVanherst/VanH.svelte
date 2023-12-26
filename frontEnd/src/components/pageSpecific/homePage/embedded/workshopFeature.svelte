<script>
    import { slide } from 'svelte/transition';

    import Carousel 		from "$root/components/generic/containers/carousel.svelte";
    import Container 		from "$root/components/generic/containers/container.svelte";
    import WorkshopCard 	from "$root/components/pageSpecific/homePage/embedded/workshopCard.svelte";
    import WorkshopSnippet 	from "$root/components/pageSpecific/homePage/embedded/workshopSnippet.svelte";

    import { deviceData, navigationControls } from '$lib/controllers/layoutControllers/redirectHandling.js';

    export let dataset;

    let active = false;
</script>

<Container>
	{#if dataset.full}
		<Carousel>
			{#each dataset.full as workshopItem}
				<swiper-slide>
					<WorkshopCard dataEntry={workshopItem}/>
				</swiper-slide>
			{/each}
		</Carousel>
	{/if}
	{#if dataset.snippets}
		<div class="navWrapper">
			{#if $deviceData.deviceType < 2}
				{#if active}
					<div class="mobileOffset" transition:slide>
						<Carousel
								customCalc={$deviceData.screenSize < 800 ? $deviceData.screenSize / 85 : 800 / 85}
								pagination={false} footerAdd={false}>
							{#each dataset.snippets as workshopItem}
								{#if $navigationControls.localNsfwCheck(workshopItem?.NSFW)}
									<swiper-slide>
										<WorkshopSnippet item={workshopItem}/>
									</swiper-slide>
								{/if}
							{/each}
						</Carousel>
					</div>
					<div class="navigationButton down close"
						on:mousedown={() => active = false}
						in:slide out:slide>
						<img src="/icons/upIcon.webp">
					</div>
				{:else}
					<div class="navigationButton up open"
						on:mousedown={() => active = true}
						in:slide={{delay: 100 }} out:slide>
						<img src="/icons/downIcon.webp">
					</div>
				{/if}
			{:else}
				<div class="desktopOffset">
					<Carousel
							customCalc={$deviceData.screenSize < 800 ? $deviceData.screenSize / 85 : 800 / 85}
							pagination={false} footerAdd={false}>
						{#each dataset.snippets as workshopItem}
							{#if $navigationControls.localNsfwCheck(workshopItem?.NSFW)}
								<swiper-slide>
									<WorkshopSnippet item={workshopItem}/>
								</swiper-slide>
							{/if}
						{/each}
					</Carousel>
				</div>
			{/if}
		</div>
	{/if}
</Container>

<style lang="scss">
	.mobileOffset {	margin: -10px 10px -7px 0;}
	.desktopOffset {margin: -8px 0 -10px 0}
	.navWrapper {	margin: 0 auto;
		.navigationButton {
			margin: 0 auto;
			&.close {
				margin-top: 10px;}}}
</style>