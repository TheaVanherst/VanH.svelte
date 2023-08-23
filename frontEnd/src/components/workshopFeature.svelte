<script>
    import Carousel from "$root/components/generic/carousel.svelte";
    import Container 		from "./generic/container.svelte";
    import WorkshopCard 	from "./sections/workshopCard.svelte";
    import WorkshopSnippet 	from "./sections/workshopSnippet.svelte";

	import { workshopArray, workshopMinatureArray } from "$lib/databases/workshopDatabase.js";
    import { screenSize } 	from '$lib/accessibilityController.js';
</script>

<Container>
	<div>
		<Carousel>
			{#each workshopArray as workshopItem}
				<swiper-slide>
					<WorkshopCard dataEntry={workshopItem}/>
				</swiper-slide>
			{/each}
		</Carousel>
	</div>

	<div class="offset">
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
</Container>

<style lang="scss">
	.offset {
		margin: -10px 10px -4px 0;}
</style>