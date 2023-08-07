<script>
    import Container 			from "./generic/container.svelte";

    import WorkshopCard from "./sections/workshopCard.svelte";
	import { workshopData } from "$lib/databases/workshopDatabase.js";
    import { screenType } 	from '$lib/accessibilityController.js';

    import { register } from 'swiper/element/bundle';

    register();
</script>

<Container>
	<swiper-container
			slides-per-view="{$screenType}"
			navigation="true" pagination="true" space-between={5}>
		{#each workshopData as workshopItem}
			<swiper-slide>
				<WorkshopCard dataEntry={workshopItem}/>
			</swiper-slide>
		{/each}
	</swiper-container>
</Container>

<style lang="scss">
	* {
		transition: ease .3s;}

	swiper-container::part(button-prev),
	swiper-container::part(button-next) {
		width: 		10px;
		height: 	40px;
		padding: 	5px;

		border-radius: 		3px;
		background-color: 	var(--backgroundTrans);
		backdrop-filter: 	blur(var(--imageBlurring));
		color: 				white!important;

	&:hover {
		 background: var(--accent2);}}
	swiper-container::part(bullet),
	swiper-container::part(bullet-active) {
		backdrop-filter: 	blur(var(--imageBlurring));
		border-radius: 		1px;
		width: 	35px;
		height: 3px;}
	swiper-container::part(bullet) {
		background: white;
		transition: ease opacity .3s;
		filter:		drop-shadow(0px 0px 0.8px var(--accent0));}
	swiper-container::part(bullet-active) {
		background: var(--accent2);
		filter: 	drop-shadow(0px 0px 0.8px var(--accent2));}
</style>