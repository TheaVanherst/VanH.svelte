<script>
    import { createdPush } 		from "$lib/builders/dateBuilder.js";
    import { readingTime } 		from "$lib/builders/measurementConverters.js";

    import SanityImage 		from "$root/serializer/sanityImage.svelte";

    import SocialsFoldable 	from "$root/components/generic/wrappers/socialsFoldable.svelte";
	import FoldedTags 		from "$root/components/generic/wrappers/tags/foldedTags.svelte";

    export let story;

    let active = false;
</script>

<div class="eroticaPreview wideBorder" id="{story.slug}"
	on:mouseover={() => active = true}
	on:mouseleave={() => active = false}
	class:active={active}>
	<div class="banner">
		<div class="transform">
			<SanityImage image={story.image}/>
		</div>
		<div class="bannerTitle regularBorder">
			<h4>{story.pieceName}</h4>
		</div>
	</div>
	<div class="authors">
		<div class="publishCard">
			<h5>{createdPush(story.publishedAt)}</h5>
			<p class="citation">Written & created by;</p>
		</div>
		<div class="authorList">
			{#each story.authors as author}
				<div on:click|stopPropagation>
					<SocialsFoldable author={author}/>
				</div>
			{/each}
		</div>
	</div>

	<div class="description">
		<p>
			{story.description}
		</p>
		<em>{readingTime(story.story)}</em>
		<p class="citation">Featured character{story.characters.length > 1 ? 's' : ''};</p>
		<div class="characters">
			{#each story.characters as character}
				<div on:click|stopPropagation>
					<SocialsFoldable author={character} character={true} inverted={true}/></div>
			{/each}
			{#if story.tags?.length > 0}
				<FoldedTags tagSet={story.tags} urlRedirect={story.slug} redirectType="story="/>
			{/if}
		</div>
	</div>
</div>

<style lang="scss">
	.eroticaPreview {
		transition: 	border .3s ease;
		border-bottom: 	1px solid transparent;
		overflow: 		hidden;

		.description {
			background: 	var(--transPure2);}
		&.active {
			border-bottom: 	1px solid var(--accent1);
			.description {	background: black;}
			.transform {	transform: 	scale(1.1);}
			.bannerTitle {	background: var(--accent1);
				h4 {		color: 	white;}}}}

	.authors {
		background: white;
		padding: 	10px 8px 8px 10px;
		* { color: black; }

		.publishCard {
				display: grid;
				gap: 	7px;
			p { padding: 0 0 0 3px; }}
		.authorList {
			display: 	flex;}}

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

			background: 	var(--transPure1);
			transition: 	background .3s ease;}
			h4 {	color: 	black;}}

	.description {
		transition: 	background .2s ease;
		padding: 		16px 15px;
		em { display: 		block; }
		p, em {
			margin-bottom: 	8px;}
		.characters {
			gap: 		5px;
			display: 	flex;
			flex-wrap: 	wrap;
			>*:last-child{
				margin-right: 50px;}}}
</style>