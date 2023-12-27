<script>
    import { directoryData, navigationData } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import RedirectBuilder 	from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import SanityImage 		from "$root/serializer/sanityImage.svelte";
    import PortableText 	from "$root/serializer/portableText.svelte";

    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";
    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/authorTags/socialsFoldable.svelte";

    import { onDestroy } from "svelte";

    onDestroy(() => {
        navigationData.update(e => ({...e, search: true }));});
    // this ensures that the search bar returns for pages on the current root, and will hide if not -
    // otherwise the new root layout will handle it.

    export let data;
    let story = data.erotica;
</script>

<div class="customWidth titlecardWrapper wideBorder">
	<RedirectBuilder url="{$directoryData.root}">
		<div class="titleCard">
			<div id="back" class="mediaIcon">
				<img src="/icons/leftIcon.webp">
			</div>
			<div class="bannerTitle">
				<h1>{data.erotica.pieceName}</h1>
			</div>
		</div>
	</RedirectBuilder>
</div>

<div class="container customWidth wideBorder">
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
				{#each data.erotica.characters as character, c}
					<div class="characterCard">
						<div class="mediaIcon shortBorder">
							<SanityImage image={character.charIcon}/>
						</div>
						<h4>{character.fullName}</h4>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="blockText">
		<PortableText data={data.erotica.story}/>
	</div>

	<div class="writers">
		{#each data.erotica.authors as author, a}
			<div class="authorCard">
				<SocialsFoldable socials={author.author.socialMedia} padding={7} internal={{user:`@${author.author.handle.toLowerCase()}`,redirect:'artwork'}}>
					<div class="card">
						<div class="authorIcon">
							<div class="profileIcon">
								<SanityImage image={author.author.userPortrait}/>
							</div>
						</div>
						<div class="handles">
							<h4>{author.author.fullName}</h4>
							<p>@{author.author.handle} - {author.participation}</p>
						</div>
					</div>
				</SocialsFoldable>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.customWidth {
		background: 	var(--TransBlack);
		max-width: 		650px;
		margin: 		0 auto 15px auto;}

	.container {
		overflow: 		hidden;
		transition: 	border .3s ease;
		.transform {
			transition: transform .3s ease;}}

	.titlecardWrapper {
		transition: 	background .3s ease, border .3s ease;
		border-bottom: 	1px solid var(--accent7);

		.titleCard {
			display: flex;
			padding: 3px 0;
			#back {	padding: 	10px;
				margin: 	0 15px 0 5px;
				img {
					transition: filter .3s ease;
					filter: 	invert(1);}}
			.bannerTitle {
				margin: 		auto 0;
				padding-bottom: 3px;
				h1 {
					text-transform: capitalize;}}}

		&:hover {
			background: 	var(--accent3);
			border-bottom: 	1px solid var(--accent3);
			#back {
				img {	filter: invert(0);}}
			.bannerTitle {
				h1 {	color: 	black;}}}}


	.banner {
		position: 	relative;
		height: 	180px;
		overflow: 	hidden;}

	.descriptionWrapper {
					border-bottom: 	1px solid var(--accent7);
		.description {	margin: 	15px;
			> * {	margin-bottom: 	8px;}}
		.postTags {	margin-bottom: 	8px;}}

	.mediaIcon {
		aspect-ratio:   1/1;
		border-radius:  50%;
		overflow:		hidden;}

	.writers {
		padding: 	15px;
		gap: 		10px;
		display: 	flex;
		margin:    -1px;
		border-top: 1px solid var(--accent9);

		.authorCard {
			background: 	white;
			border-radius: 	11px;
			width: 			max-content;
			height: 		fit-content;
			padding: 		2px 0 2px 2px;

			.card {
				display: 	flex;
				width: 		max-content;
				margin: 	5px 25px 5px 5px;

				.authorIcon {	margin: 	auto 10px 0 0;}
				.profileIcon { 	width: 		36px;
					height: 	36px;}
				.handles {		display: 	inline-block;}}

			p, h4 {
				white-space: 	nowrap;
				color: 			black;}}}

	.characters {
		display: 	flex;
		flex-wrap: 	wrap;
		gap: 		10px;

		.characterCard {
			display: 		flex;
			width: 			max-content;
			background: 	white;
			vertical-align: bottom;
			transition: 	ease .3s;

			padding:    	4px 12px 4px 4px;
			gap: 			10px;
			margin: 		0 0 0 -1px;
			border-radius: 	20px;

			h4 {			color: 		black;}
			> * {			margin: 	auto 0;}}}

	.blockText {
		padding: 28px 25px 25px;}
</style>