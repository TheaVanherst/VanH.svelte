<script>
    import Container 			from "./generic/container.svelte";
    import characters 			from "$lib/databases/characterDatabase.js";
    import CharacterCard 		from "./sections/characterCard.svelte";

    import { screenType } 	from '$lib/accessibilityController.js';

    import { register } from 'swiper/element/bundle';

    register();
</script>

<Container>
	<swiper-container
			slides-per-view="{$screenType}"
			navigation="true" pagination="true" space-between={5}>
		{#each characters as char}
			<swiper-slide>
				<CharacterCard characterData={char}/>
			</swiper-slide>
		{/each}
	</swiper-container>

	<a class="citation" href="https://twitter.com/stellaempyrea">
		Big thanks to <span>Stella</span> for assistance with the descriptions.
	</a>
</Container>

<style lang="scss">
	* {
		transition: ease .3s;
	}

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
		transition: ease opacity .3s;
		filter:		drop-shadow(0px 0px 0.8px var(--accent0));}
	swiper-container::part(bullet-active) {
		background: var(--accent2);
		filter: 	drop-shadow(0px 0px 0.8px var(--accent2));}


	.citation {
		font-size:      11px;
		font-family:    "Helvetica", Sans-serif;
		opacity:        0.8;

		position: 	relative;
		display: 	block;
		margin: 	8px 0 0 auto;
		width:		max-content;

		transition: .3s ease;
		color: 		var(--accent8);

		span {
			transition: .5s ease;
			color: 		var(--accent3);}

		&:hover {
			 color: var(--accent9);
			> span {
				filter:
					drop-shadow(0px 0px 1px var(--accent9))
					brightness(0) 	saturate(100%)
					invert(87%) 	sepia(28%)
					saturate(7225%) hue-rotate(86deg)
					brightness(99%) contrast(117%);}}
	}
</style>