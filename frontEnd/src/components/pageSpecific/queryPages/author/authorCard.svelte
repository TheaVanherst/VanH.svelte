<script>
	import { navigationControls } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import SanityImage from "$root/serializer/sanityImage.svelte";
    import ArtworkCard from "$root/components/pageSpecific/queryPages/artworkCardWrapper.svelte";

    export let author;
</script>

<div class="authorCard wideBorder">
	<div class="profileBanner">
		<div class="banner">
			<SanityImage image={author.profileBanner}/>
		</div>
		<div class="icon">
			<div class="rounded">
				<SanityImage image={author.userPortrait}/>
			</div>
		</div>
	</div>

	<div class="title">
		<h3 class="userName">{author.fullName}</h3>
		<p class="handle"><span>@</span>{author.handle}{author.internalRole[0] ? ", " + author.internalRole[0].title : ""}</p>
	</div>

	<div class="descriptionWrapper">
		{#if author?.authorTag?.length > 0}
			<div class="authorTags">
				{#each author.authorTag as tag}
					<p>{tag.emoji} {tag.title}</p>
				{/each}
			</div>
		{/if}
		<p class="description">
			{author.shortDesc}
		</p>
	</div>
</div>

{#if author.latestArtworks.length > 0}
	<div class="artworkFeature">
		<h2>Latest Artworks</h2>
		<div class="artworkGallery artwork imageWrapper">
			{#each author.latestArtworks.map(e => e.nsfw ? undefined : e).filter(e=>e).splice(-6,12) as artwork}
				{#if $navigationControls.localNsfwCheck(artwork.NSFW)}
					<ArtworkCard data={artwork}/>
				{/if}
			{/each}
		</div>
	</div>
{/if}
{#if author.latestDesigns.length > 0}
	<div class="artworkFeature">
		<h2>Latest Designs</h2>
		<div class="artworkGallery designWork imageWrapper">
			{#each author.latestDesigns as design}
				{#if $navigationControls.localNsfwCheck(design.NSFW)}
					<ArtworkCard data={design}/>
				{/if}
			{/each}
		</div>
	</div>
{/if}

{#if $navigationControls.nsfw}
{/if}

<style lang="scss">
	.authorCard {
		margin: 		0 auto;
		max-width: 		550px;
		overflow: 		hidden;
		background: 	var(--TransWhite);
		transition: 	background .3s ease;
		h1,h2,h3,h4,p {			color: black;}}

	.profileBanner {
		position: relative;
		.banner {
			height: 	108px;}
		.icon {
			bottom: 	0;
			position: 	absolute;
			height: 	80px;
			width: 		80px;
			padding: 	14px;
			.rounded {
				border: 1px solid var(--TransWhite);}}}

	.title, .descriptionWrapper {
		display: grid;
		padding: 8px 4px 9px 10px;
		h1,h2,h3,h4,p {
			transition: color .2s ease;}}

	.descriptionWrapper {
		gap: 7px;
		.description {
			margin: 0 0 1px 2px;}}

	.title {
		background: white;
		transition: background .3s ease;
		gap: 		2px;

		> * {
			text-transform: capitalize;
			width: 			max-content;}}

	.authorTags {
		display: 	inline-flex;
		margin: 	2px 0 0 -1px;
		gap: 		6px;
		p {
			border-radius: 	12px;
			padding: 		2px 9px 2px 5px;
			background: 	var(--accent9);
			color: 			white;}}

	.artworkFeature {
		position: 	relative;
		display: 	grid;
		gap: 		15px;
		margin: 	15px 0 0 0;}

	.artworkGallery {
		display: flex;
		grid-template-columns: auto auto auto;
		gap: 15px;
		max-height: 500px;
		min-width: 100%;}
</style>