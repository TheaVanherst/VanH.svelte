<script>
    import { createdPush } 	from "$lib/builders/dateBuilder.js";
    import { directoryData } 	from "$lib/controllers/layoutControllers/redirectHandling.js";

    import { readingTime } from "$lib/builders/measurementConverters.js";

    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import SanityImage from "$root/serializer/sanityImage.svelte";
    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";

    export let story;

    let authorCredit = `${story.authors.map(e => e.author.fullName)}`;
    	authorCredit = (authorCredit.replace(',', ", ")).replace(/,(?=[^,]+$)/, ' and');
</script>

<div class="container wideBorder">
	<div class="banner">
		<div class="transform">
			<SanityImage image={story.image}/>
		</div>
		<div class="bannerTitle">
			<h4>{story.pieceName}</h4>
		</div>
	</div>
	<p class="publishedAt">{createdPush(story.publishedAt)}</p>
	<div class="description">
		<p>{story.description}</p>
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
				<RedirectBuilder url="{$directoryData.stripped}?query=:{(character.nickName ?? character.fullName).toLowerCase()}">
					<div class="characterCard">
						<div class="mediaIcon shortBorder">
							<SanityImage image={character.charIcon}/>
						</div>
						<h5>{character.fullName}</h5>
					</div>
				</RedirectBuilder>
			{/each}
		</div>
		<div class="writers">
			<div class="icons">
				{#each story.authors as author, a}
					<div class="mediaIcon">
						<SanityImage image={author.author.userPortrait}/>
					</div>
				{/each}
			</div>
			<p class="creation">Created by; {authorCredit}</p>
		</div>
	</div>
</div>

<style lang="scss">
	.container {
		overflow: 		hidden;
		background: 	var(--TransBlack);
		border-bottom: 	1px solid var(--accent2);

		transition: border .3s ease;
		.transform {
			transition: transform .3s ease;}

		.publishedAt {
			transition: background .3s ease, color .3s ease;
			background: var(--accent10);
			padding: 	6px 15px 5px 15px;
			color: 		black;}
		&:hover {
			background: 	black;
			border-bottom: 	1px solid var(--accent7);
			.publishedAt {
				background: var(--accent7);
				color: 		white;}
			.transform {
				transform: 	scale(1.1);}}}

	.banner {
		position: 	relative;
		max-height: 180px;
		overflow: 	hidden;

		.bannerTitle {
			bottom: 	0;
			position: 	absolute;
			z-index: 	2;

			padding: 	12px;
			background: var(--TransBlack);
			min-width: 	-moz-available;}}

	.description {
		padding: 	12px 0 10px;
		margin: 	0 10px;
		em { 	display: 		block; }
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

	.mediaIcon {
		aspect-ratio:   1/1;
		border-radius:  50%;
		overflow:		hidden;}
</style>