<script>
    import SanityImage from "$root/serializer/sanityImage.svelte";
    import { fade } from "svelte/transition";

    export let author;
</script>

<div class="authorCard wideBorder" transition:fade>
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
		<p class="handle"><span>@</span>{author.handle}, {author.internalRole[0].title}</p>
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

<style lang="scss">
	.authorCard {
		max-width: 		550px;
		overflow: 		hidden;
		background: 	var(--TransWhite);
		transition: 	background .3s ease;
		h1,h2,h3,h4,p {			color: black;}
		&:hover {		background: white;
			.title {			background: var(--accent7);
				h1,h2,h3,h4,p {	color: white;}}}}

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
</style>