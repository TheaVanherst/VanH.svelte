<script>
    import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";
    import SanityImage from "$root/serializer/sanityImage.svelte";

	export let data;
</script>

<div class="table">
	<div class="characterTable">
		{#each data.characterData.characters as character, i}
			{#if !!character && $navigationControls.localNsfwCheck(character.nsfw)}
				<div class="characterCard">
					<div class="characterProfile">
						<SanityImage image={character.render}/>
					</div>
				</div>
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	.table {
		display: 	flex;
		flex-wrap: 	wrap;
		gap: 		15px;}

	.characterTable {
		display: 	flex;
		flex-wrap: 	wrap;
		gap: 		15px;

		.characterCard {
			width: 100%;
			.characterProfile {
				width: 		150px;
				border-radius: 	var(--borderWide);
				overflow: 	hidden;
				border: 	1px transparent solid;
				transition: opacity .3s, border .5s;}}}
</style>