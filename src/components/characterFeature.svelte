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
	@import "./src/commonStyles.scss";
	@import "./src/components/generic/swiperPreset.scss";

	* {
		transition: ease .3s;
	}

	.citation {
		@include citationText(var(--accent2), var(--accent1));

		margin: 	8px 0 8px auto;
		width:		max-content;

		position: 	relative;
		display: 	block;

		transition: .3s ease;
	}
</style>