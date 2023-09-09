<script>
    import Container 	from "../../generic/container.svelte";
    import Carousel from "$root/components/generic/carousel.svelte";

	import characterList from "$lib/databases/characterDatabase.js";

    import CharacterCardWrap 	from "$root/components/sections/characters/hoverSlideWrap.svelte";
    import GenericInfo 			from "$root/components/sections/characters/genericInfo.svelte";
</script>

<Container bottom={10}>
	<Carousel>
		{#each characterList as char}
			<swiper-slide>
				<CharacterCardWrap characterData={char}>
					<GenericInfo data={char}></GenericInfo>
				</CharacterCardWrap>
			</swiper-slide>
		{/each}
	</Carousel>
</Container>

<a class="citation externalCitation hover" href="https://twitter.com/stellaempyrea">
	Big thanks to <span>Stella</span> for writing the character descriptions.
</a>

<style lang="scss">
	.citation {	margin: -4px 0 10px auto;}
</style>
