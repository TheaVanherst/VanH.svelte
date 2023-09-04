<script>
    import { slide } from 'svelte/transition';

    import Carousel 		from "$root/components/generic/carousel.svelte";
    import Container 		from "$root/components/generic/container.svelte";
    import WorkshopCard 	from "$root/components/sections/workshop/workshopCard.svelte";
    import WorkshopSnippet 	from "$root/components/sections/workshop/workshopSnippet.svelte";

	import { workshopArray, workshopMinatureArray } from "$lib/databases/workshopDatabase.js";
    import {screenSize, deviceType, nsfw} 			from '$lib/controllers/accessibilityController.js';

    let moreToggle = false;
</script>

<Container border={10}>
	<div>
		<Carousel>
			{#each workshopArray as workshopItem}
				<swiper-slide>
					<WorkshopCard dataEntry={workshopItem}/>
				</swiper-slide>
			{/each}
		</Carousel>
	</div>
	<div class="navWrapper">
		{#if deviceType < 2}
			{#if moreToggle}
				<div class="mobileOffset" transition:slide>
					<Carousel
							customCalc={$screenSize < 800 ? $screenSize / 85 : 800 / 85}
							pagination={false}>
						{#each workshopMinatureArray as workshopItem}
							<swiper-slide>
								<WorkshopSnippet item={workshopItem}/>
							</swiper-slide>
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
				<Carousel
						customCalc={$screenSize < 800 ? $screenSize / 85 : 800 / 85}
						pagination={false}>
					{#each workshopMinatureArray as workshopItem}
						{#if workshopItem.nsfw && $nsfw || !workshopItem.nsfw}
							<swiper-slide>
								<WorkshopSnippet item={workshopItem}/>
							</swiper-slide>
						{/if}
					{/each}
				</Carousel>
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