<script>
    import scss from "./generic/swiperPreset.scss";

    import Container 		from "./generic/container.svelte";
    import WorkshopCard 	from "./sections/workshopCard.svelte";
    import WorkshopSnippet 	from "./sections/workshopSnippet.svelte";

	import { workshopArray, workshopMinatureArray } from "$lib/databases/workshopDatabase.js";
    import { screenType, screenSize } 	from '$lib/accessibilityController.js';

    import { register } from 'swiper/element/bundle';

    register();
</script>

<Container>
	<div class="caro">
		<swiper-container
				slides-per-view="{$screenType}"
				navigation="true" pagination="true" space-between={5}>
			{#each workshopArray as workshopItem}
				<swiper-slide>
					<WorkshopCard dataEntry={workshopItem}/>
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
	<div class="caro offset">
		<swiper-container
				slides-per-view={$screenSize < 800 ? $screenSize / 85 : 800 / 85}
				navigation="true">
			{#each workshopMinatureArray as workshopItem}
				<swiper-slide>
					<WorkshopSnippet item={workshopItem}/>
				</swiper-slide>
			{/each}
		</swiper-container>
	</div>
</Container>

<style lang="scss">
	* {
		transition: ease .3s;
	}

	.offset {
		margin: 	5px 10px 15px 10px;
		position: 	relative;
	}

	.caro {
		border-radius:	5px;
		overflow: 		hidden;
	}
</style>