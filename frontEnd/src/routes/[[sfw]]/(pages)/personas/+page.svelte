<script>
    import { navigationControls } from "$lib/settings/navigationHandling.js";

    import SanityImage 	from "$root/serializer/sanityImage.svelte";
    import PortableText from "$root/serializer/portableText.svelte";

	export let data;
</script>

<div class="table">
	<div class="characterTable">
		{#each data.characterData.characters as character, i}
			{#if !!character && $navigationControls.localNsfwCheck(character.nsfw) && character.lore}
				<h2>{character.fullName}</h2>
				<div class="characterCard">
					<div class="characterProfile">
						<SanityImage image={character.render}/>
					</div>
					<div class="characterBio">
						<PortableText data={character.lore}/>
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
			width: 		100%;
			display: 	flex;
			gap: 		15px;
			.characterProfile {
				min-width: 		200px;
				width: 			100%;
				margin-bottom: 	auto;

				border-radius: 	var(--borderWide);
				overflow: 	hidden;
				border: 	1px transparent solid;
				transition: opacity .3s, border .5s;}
			.characterBio {
				display: block;
				padding: 15px;
				border-radius: var(--borderWide);

				background: 	var(--transPure2);
				border-top: 	1px solid var(--accent1);
				border-bottom: 	1px solid var(--accent1);
			}
		}}
</style>