<script>
	import { directoryStatus } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import RedirectBuilder from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectBuilder.svelte";
    import SanityImage 		from "$root/serializer/sanityImage.svelte";
    import PortableText 	from "$root/serializer/portableText.svelte";

    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";
    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";

    export let story;
</script>

<h1>{story.pieceName}</h1>

<div class="storyElement wideBorder">
	<div class="banner">
		<div class="transform">
			<SanityImage image={story.image}/>
		</div>
	</div>

	<div class="descriptionWrapper">
		<div class="description">
			<p>{story.description}</p>
			{#if story.tags?.length > 0}
				<div class="postTags">
					<div class="tagScrollWrapper">

					</div>
					{#each story.tags as tag}
						<RedirectBuilder url="{$directoryStatus.strippedUrl}?query={tag.title.toLowerCase().replaceAll(' ','-')}">
							<InlineTag tag={tag}/>
						</RedirectBuilder>
					{/each}
				</div>
			{/if}

			<div class="characters">
				<div class="characterWrapper">
					{#each story.characters as character, c}
						<SocialsFoldable author={character} character={true} inverted={true}/>
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="blockText">
		<PortableText data={story.story}/>
	</div>

	<div class="writers">
		{#each story.authors as author, a}
			<SocialsFoldable author={author}/>
		{/each}
	</div>
</div>

<style lang="scss">
	.storyElement {
		overflow: 	hidden;
		max-width: 	650px;
		margin: 	15px auto 15px auto;}

	h1 {
		margin: 	35px 0 0 0;
		pointer-events: none;}

	.blockText, .descriptionWrapper, .banner {
		background: 	var(--TransBlack);}

	.banner {
		height: 	300px;
		overflow: 	hidden;
		.transform {
			display: flex;
			height: 100%;
			width: 	100%;}}

	.descriptionWrapper {
		border-bottom: 	1px solid var(--accent7);
		.description {
			gap: 		10px;
			display: 	grid;
			padding: 	15px;}}

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
			gap: 12px;
			display: flex;
			flex-wrap: inherit;}}

	.blockText {
		padding: 28px 25px 25px;}
</style>