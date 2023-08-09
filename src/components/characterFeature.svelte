<script>
    import scss from "./generic/swiperPreset.scss";

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

	.citation {
		font-size:      11px;
		font-family:    "Helvetica", Sans-serif;
		color: 			var(--accent8);
		opacity:        0.8;

		margin: 	8px 0 8px auto;
		width:		max-content;

		position: 	relative;
		display: 	block;
		transition: .3s ease;

		span {
			transition: .5s ease;
			color: 		var(--accent2);
		}

		&:hover {
			 color: var(--accent9);
			> span {
				color: var(--accent1);
			}
		}
	}
</style>