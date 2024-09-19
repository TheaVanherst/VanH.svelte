<script>
    import { createdPush } 		from "$lib/builders/dateBuilder.js";
    import { readingTime } 		from "$lib/builders/measurementConverters.js";

    import SanityImage 		from "$root/serializer/sanityImage.svelte";

    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";
	import FoldedTags 		from "$root/components/generic/wrappers/tags & Inline/tags/foldedTags.svelte";

    export let story;

    let active = false;
</script>

<div class="container wideBorder"
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
			<h5 id="publishDate">{createdPush(story.publishedAt)}</h5>
			<p id="publishCredits">Written & created by;</p>
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
		<em>{readingTime(story.story)} minute estimated read time.</em>
		<p>Featuring;</p>
		<div class="characters">
			{#each story.characters as character}
				<div on:click|stopPropagation>
					<SocialsFoldable author={character} character={true} inverted={true} />
				</div>
			{/each}
		</div>
		{#if story.tags?.length > 0}
			<FoldedTags tagSet={story.tags} urlRedirect={story.slug} redirectType="story="/>
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
		&.active {
			border-bottom: 	1px solid var(--accent7);
			.description {	background: black;}
			.transform {	transform: 	scale(1.1);}
			.bannerTitle {	background: var(--accent7);
				h4 {		color: 	white;}}}}

	.authors {
		padding: 	0 0 8px 0;
		width: 		100%;
		background: white;

		.publishCard {
			display: 	grid;
			gap: 		6px;
			padding: 	12px 8px 0 12px;

			p, h5 {				color: 			black;}
			#publishCredits { 	padding: 		0 0 0 3px; }
			#publishDate { 		font-weight: 	600; }}
		.authorList {
			padding: 	5px 8px 0 8px;
			display: 	flex;
			gap: 		5px;
			width: 		max-content;}}

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
		padding: 		15px 15px 12px 15px;
		em { display: 		block; }
		p, em {
			margin-bottom: 	8px;}
		.characters {
			gap: 		5px;
			display: 	flex;
			flex-wrap: 	wrap;
			>*:last-child{
				margin-right: 70px;}}}
</style>