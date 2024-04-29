<script>
    import { createdPush } 		from "$lib/builders/dateBuilder.js";
    import { directoryData } 	from "$lib/controllers/layoutControllers/redirectHandling.js";
    import { readingTime } 		from "$lib/builders/measurementConverters.js";

    import RedirectBuilder 	from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import SanityImage 		from "$root/serializer/sanityImage.svelte";

    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";
    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";

    export let story;
    let active = false;

    let authorCredit = `${story.authors.map(e => e.fullName)}`;
    	authorCredit = (authorCredit.replace(',', ", ")).replace(/,(?=[^,]+$)/, ' and');
</script>

<div class="container wideBorder"
	on:mouseover={() => active = true}
	on:mouseleave={() => active = false}>
	<div class="banner">
		<div class="transform">
			<SanityImage image={story.image}/>
		</div>
		<div class="bannerTitle regularBorder">
			<h4>{story.pieceName}</h4>
		</div>
	</div>
	<div class="characters">
		{#each story.characters as character}
			<SocialsFoldable author={character} character={true}/>
		{/each}
	</div>
	<div class="description">
		<p>{story.description}</p>
		<p>{createdPush(story.publishedAt)}</p>
		<em>{readingTime(story.story)} minute estimated read time.</em>
		{#if story.tags?.length > 0}
			<div class="postTags">
				{#each story.tags as tag}
					<RedirectBuilder url="{$directoryData.stripped}?query={tag.title.toLowerCase().replaceAll(' ','-')}">
						<InlineTag tag={tag}/>
					</RedirectBuilder>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.container {
		transition: 	border .3s ease;
		border-bottom: 	1px solid transparent;
		overflow: 		hidden;

		.description {
			background: 	var(--TransBlack);}
		&:hover {
			.description {
				background: 	black;}
			border-bottom: 	1px solid var(--accent7);
			.bannerTitle {
				background: var(--accent7);
				h4 {
					color: 	white;}}
			.transform {
				transform: 	scale(1.1);}}}

	.banner {
		position: 	relative;
		height: 	150px;
		overflow: 	hidden;

		.transform {
			height: 	100%;
			transition: transform .3s ease;}

		.bannerTitle {
			position: 	absolute;
			width: 		-webkit-fill-available;
			min-width: 	-moz-available;
			bottom: 	0;
			padding: 	10px 12px 11px 12px;
			margin:     5px 5px 5px 5px;

			background: 	var(--TransWhite);
			transition: 	background .3s ease;}
			h4 {	color: 	black;}}

	.description {
		transition: 	background .2s ease;
		padding: 		12px 10px 10px 10px;
		em { 	display: 	block; }
		> *:not(:last-child) {	margin-bottom: 8px;}
		.postTags {				margin-bottom: 6px;}}

	.characters {
		background: white;
		display: 	flex;
		flex-wrap: 	wrap;
		padding: 	5px 8px;
		gap: 		5px;
	}
</style>