<script>
    import { slide } from 'svelte/transition';

    import Carousel 		from "$root/components/generic/controllers/carousel.svelte";
    import Container 		from "$root/components/generic/containers/container.svelte";
    import WorkshopCard 	from "$root/components/pageSpecific/homePage/embedded/workshopCard.svelte";
    import WorkshopSnippet 	from "$root/components/pageSpecific/homePage/embedded/workshopSnippet.svelte";

    import { screenSize, deviceType, nsfw } from '$lib/controllers/pageControllers.js';

    let moreToggle = false;

    export let dataset = undefined;
</script>

<Container>
	{#if dataset[0]} <!-- prevents crashes -->
		<Carousel>
			{#each dataset[0] as workshopItem}
				<swiper-slide>
					<WorkshopCard dataEntry={workshopItem}/>
				</swiper-slide>
			{/each}
		</Carousel>
	{/if}
	<div class="navWrapper">
		{#if deviceType < 2}
			{#if moreToggle && dataset[1]} <!-- prevents crashes -->
				<div class="mobileOffset" transition:slide>
					<Carousel
						customCalc={$screenSize < 800 ? $screenSize / 85 : 800 / 85}
						pagination={false} footerAdd={false}>
						{#each dataset[1] as workshopItem}
							{#if workshopItem.NSFW && $nsfw || !workshopItem.NSFW}
								<swiper-slide>
									<WorkshopSnippet item={workshopItem}/>
								</swiper-slide>
							{/if}
						{/each}
					</Carousel>
				</div>
				<div class="navigationButton vertical close"
					on:mousedown={() => moreToggle = false}
					in:slide out:slide>
					<img src="/icons/upIcon.webp">
				</div>
			{:else}
				<div class="navigationButton vertical open"
					on:mousedown={() => moreToggle = true}
					in:slide={{delay: 300 }} out:slide>
					<img src="/icons/downIcon.webp">
				</div>
			{/if}
		{:else}
			<div class="desktopOffset">
				{#if dataset[1]} <!-- prevents crashes -->
					<Carousel
							customCalc={$screenSize < 800 ? $screenSize / 85 : 800 / 85}
							pagination={false} footerAdd={false}>
						{#each dataset[1] as workshopItem}
							{#if workshopItem.NSFW && $nsfw || !workshopItem.NSFW}
								<swiper-slide>
									<WorkshopSnippet item={workshopItem}/>
								</swiper-slide>
							{/if}
						{/each}
					</Carousel>
				{/if}
			</div>
		{/if}
	</div>
</Container>

<style lang="scss">
	.mobileOffset {	margin: -10px 10px -7px 0;}
	.desktopOffset {margin: -8px 0 -10px 0}
	.navWrapper {	margin: 0 auto;
		.close {	margin: 6px auto 0;}
		.open {		margin: -2px auto 0;}}
</style>