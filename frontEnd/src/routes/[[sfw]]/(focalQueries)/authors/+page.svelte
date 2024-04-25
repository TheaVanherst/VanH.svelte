<script>
    import { fade } from "svelte/transition";

	import SanityImage from "$root/serializer/sanityImage.svelte";
    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";

    export let data;
</script>

<div class="wrapper">
	{#if !!data.authorData}
		{#each data.authorData as author}
			{#if author.searchable}
				<RedirectBuilder url="/authors/{author.slug}">
					<div class="authorCard" transition:fade>
						<div class="profileBanner">
							<div class="banner">
								{#if author.profileBanner}
									<SanityImage image={author.profileBanner}/>
								{/if}
							</div>
							<div class="Icon">
								<div class="rounded">
									{#if author.userPortrait}
										<SanityImage image={author.userPortrait}/>
									{/if}
								</div>
							</div>
						</div>

						<div class="title">
							<h3 class="userName">{author.fullName}</h3>
							<p class="handle"><span>@</span>{author.handle}, {author.internalRole[0].title}</p>
						</div>

						<div class="descriptionWrapper">
	<!--						<SocialsFoldable socials={author.socialMedia} padding={8}>-->
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
	<!--						</SocialsFoldable>-->
						</div>
					</div>
				</RedirectBuilder>
			{/if}
		{/each}
	{/if}
</div>

<div class="hidden">
	{#if !!data.authorData}
		{#each data.authorData as author}
			<a href="/authors/{author.slug}"></a>
		{/each}
	{/if}
</div>

<style lang="scss">
	.hidden {
		opacity: 0;
	}

	.wrapper {
		max-width: 	450px;
		margin: 	0 auto;
		display: 	grid;
		gap: 		15px;}

	.authorCard {
		transition: background .3s ease;
		overflow: 	hidden;
		gap: 		12px;
		background: 	var(--TransWhite);
		border-radius: 	var(--borderWide);

		h1,h2,h3,h4,p {
			color: black;}

		&:hover {		background: white;
			.title {	background: var(--accent7);
				h1,h2,h3,h4,p {
						color: white;}}}}

	.profileBanner {
		position: relative;
		.Icon {
			height: 	80px;
			width: 		80px;
			padding: 	12px;
			position: 	absolute;
			bottom: 	0;
			.rounded {
				border: 1px solid var(--TransWhite);}}
		.banner {
			height: 	104px;
			width: 		100%;}}

	.descriptionWrapper {
		padding: 9px 4px 5px 10px;
		.description {
			margin-left: 2px;}
		p { margin-bottom: 5px;}}

	.title {
		background: white;
		padding: 9px 4px 9px 13px;
		transition: background .3s ease;

		h1,h2,h3,h4,p {
			transition: color .2s ease;}

		.userName, .handle {
			width: 	max-content;
			height: max-content;
			margin: auto 0 3px 0;}

		.userName {
			text-transform: capitalize;
			font-weight: 	800;}
		.handle {
			margin-bottom:	-1px;
			color: 			var(--accent9);
			span {
				bottom: 	1px;
				position: 	relative;}}}

	.authorTags {
		display: 		inline-flex;
		margin-left: 	-1px;
		gap: 			6px;
		p {
			border-radius: 	12px;
			padding: 		2px 9px 2px 5px;
			background: var(--accent9);
			color: 		white;}}
</style>