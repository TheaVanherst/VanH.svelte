<script>
    import { createdPush } 	from "$lib/builders/dateBuilder.js";
	import { directoryStatus, deviceData } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import RedirectBuilder from "$root/components/generic/wrappers/tags & Inline/redirects/internalRedirectBuilder.svelte";
    import SanityImage 		from "$root/serializer/sanityImage.svelte";
    import PortableText 	from "$root/serializer/portableText.svelte";

    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";
    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";

    export let data;
</script>

<h1>{data.pieceName}</h1>

<div class="storyElement" class:wideBorder={$deviceData.screenType < 3 ? false : 'wideBorder'}>
	<div class="banner">
		<div class="transform">
			<SanityImage image={data.image}/>
		</div>
	</div>
	<div id="storyBlock">
		<PortableText data={data.story}/>
	</div>
	<div id="descriptionBlock">
		<div class="writers">
			<p class="citation">
				Written & developed by;</p>
			{#each data.authors as author, a}
				<SocialsFoldable author={author}/>
			{/each}
		</div>
		{#if data.tags?.length > 0}
			<div>
				<div class="postTags">
					{#each data.tags as tag}
						<RedirectBuilder url="{$directoryStatus.strippedUrl}?query={tag.title.toLowerCase().replaceAll(' ','-')}">
							<InlineTag tag={tag}/>
						</RedirectBuilder>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	<div id="characterBlock">
		<p class="citation">
			Featuring;</p>
		{#each data.characters as character, c}
			<SocialsFoldable author={character} character={true}/>
		{/each}
		<p>{createdPush(data.publishedAt)}</p>
	</div>
</div>

<style lang="scss">
	* {	color: black;}

	.storyElement {
		overflow: 	hidden;}

	h1 {
		color: 		white;
		padding:    0 0 15px 15px;
		pointer-events: none;}

	div {
		p {		margin: 7px 0 7px 0;}
		p.citation { 	margin: 9px 0 3px 0;}}

	.banner {
		height: 	200px;
		overflow: 	hidden;
		.transform {
			display: flex;
			height: 100%;
			width: 	100%;}}

	#storyBlock {
		background: var(--TransBlack);
		padding: 	26px 28px 31px;}

	#descriptionBlock {
		padding: 	5px 15px 10px 15px;
		background: var(--TransWhite);
		.writers {
			gap: 		10px;
			margin:    0 0 10px 0;}}

	#characterBlock {
		padding: 	6px 15px 8px 15px;
		background: white;
		flex-wrap: 	wrap;
		gap: 		10px;

		.citation {
			margin: 6px 0 3px 0;}}
</style>