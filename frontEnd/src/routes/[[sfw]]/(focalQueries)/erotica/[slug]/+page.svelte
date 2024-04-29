<script>
    import { onDestroy } from "svelte";

    import { navigationData } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import SanityImage 		from "$root/serializer/sanityImage.svelte";
    import PortableText 	from "$root/serializer/portableText.svelte";

    import BackButton 		from "$root/components/generic/wrappers/buttons/backButton.svelte";
    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";
    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";

    onDestroy(() => {
        navigationData.update(e => ({...e, search: true }));});

    export let data;
    
    let story = data.erotica;
</script>

<div class="customWidth">
	<BackButton>
		<h1>{data.erotica.pieceName}</h1>
	</BackButton>

	<div class="container wideBorder">
		<div class="banner">
			<div class="transform">
				<SanityImage image={data.erotica.image}/>
			</div>
		</div>

		<div class="descriptionWrapper">
			<div class="description">
				<p>{data.erotica.description}</p>
				{#if data.erotica.tags?.length > 0}
					<div class="postTags">
						{#each data.erotica.tags as tag}
							<InlineTag tag={tag}/>
						{/each}
					</div>
				{/if}

				<div class="characters">
					<div class="mediaIcon artSearcher">
						<img src="/icons/galleryIcon.webp">
					</div>
					<div class="characterWrapper">
						{#each data.erotica.characters as character, c}
							<SocialsFoldable author={character} character={true}/>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<div class="blockText">
			<PortableText data={data.erotica.story}/>
		</div>

		<div class="writers">
			{#each data.erotica.authors as author, a}
				<SocialsFoldable author={author}/>
			{/each}
		</div>
	</div>
</div>

<style lang="scss">
	.customWidth {
		gap: 		15px;
		display: 	grid;
		max-width: 	650px;
		margin: 	0 auto 15px auto;}

	.blockText, .descriptionWrapper, .banner {
		background: 	var(--TransBlack);}

	.container {
		overflow: 		hidden;
		transition: 	border .3s ease;
		.transform {
			transition: transform .3s ease;}}

	.banner {
		position: 	relative;
		height: 	180px;
		overflow: 	hidden;}

	.descriptionWrapper {
					border-bottom: 	1px solid var(--accent7);
		.description {	margin: 	15px;
			> * {	margin-bottom: 	8px;}}
		.postTags {	margin-bottom: 	8px;}}

	.writers {
		padding: 	15px;
		gap: 		10px;
		margin:    -1px;
		background: var(--TransWhite);
		border-top: 1px solid var(--accent9);}

	.characters {
		display: 	flex;
		flex-wrap: 	wrap;
		gap: 		10px;

		.artSearcher {
			display: flex;
			filter: invert(1);}

		.characterWrapper {
			:global(h4) {
				color: white;}

			gap: 12px;
			display: flex;}
	}

	.blockText {
		padding: 28px 25px 25px;}
</style>