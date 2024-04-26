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

    console.log(story)
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

		<div class="characters">
			{#each story.characters as character, c}
				<SocialsFoldable author={character} character={true}/>
			{/each}
		</div>
		<div class="writers">
			<div class="icons">
				{#each story.authors as author, a}
					<div class="mediaIcon rounded">
						<SanityImage image={author.userPortrait}/>
					</div>
				{/each}
			</div>
			<p class="creation">Created by {authorCredit}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		transition: 	border .3s ease, background .2s ease;
		background: 	var(--TransBlack);
		border-bottom: 	1px solid var(--accent10);
		overflow: 		hidden;

		&:hover {
			background: 	black;
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

	.description {	padding: 	12px 0 10px 0;
					margin: 	0 10px 0 10px;
		em { 		display: 	block; }
		> *:not(:last-child) {	margin-bottom: 8px;}
		.postTags {				margin-bottom: 6px;}}

	.characters {
		display: 	flex;
		flex-wrap: 	wrap;
		gap: 		5px;
		.characterCard {
			display: 		flex;
			width: 			max-content;
			background: 	white;
			vertical-align: bottom;
			transition: 	ease .3s;

			padding:    	2px 12px 2px 2px;
			gap: 			10px;
			margin: 		0 2px 1px -1px ;
			border-radius: 	20px;

			h5 {		color: 		black;}
			&:hover {	background: var(--accent7);
				h5 {	color: 		white;}}
			> * {		margin: 	auto 0;}}}

	.writers {
		display: 	flex;
		margin: 	-1px;
		.icons {
			display: 	flex;
			.mediaIcon {
				border: 	1px solid black;
				z-index: 	1;
				&:not(:first-of-type){
					margin-left: 	-10px;}}}
		.creation {
			margin: 	auto 18px auto 8px;
			padding: 	2px 0 0 0;}}
</style>