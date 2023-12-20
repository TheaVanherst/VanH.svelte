<script>
    import { createdPush } 	from "$lib/builders/dateBuilder.js";
    import { directoryData } 	from "$lib/controllers/layoutControllers/redirectHandling.js";

    import SanityImage 		from "$root/serializer/types/sanityImage.svelte";

    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";

    import DividedTag 		from "$root/components/generic/wrappers/tags & Inline/pilledTag.svelte";
    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";
    import ImageFloatCard 	from "$root/components/generic/containers/imageContainers/galleryImageCard.svelte";
    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/inlineGenreTag.svelte";

    export let
		data,
		hover = true,
		active  = true,
		absolute = false;
</script>

<ImageFloatCard {hover} {active} {absolute}>
	<h4 slot="title">{data.pieceName}</h4>
	<div slot="desc">
		<h4>{data.pieceName}</h4>
		{#if !!data.description}
			<p>{data.description}</p>
		{/if}
		{#if !!data.commissionData}
			<div class="commissionWrapper">
				<p class="altTitle">{data.commissionData.commissionType} for:</p>
				{#each data.commissionData.characters as character}
					<div class="commissioner">
						<SocialsFoldable socials={character.owner.socialMedia}>
							<RedirectBuilder url="{$directoryData.stripped}?query=@{character.owner.handle.toLowerCase()}">
								<div class="characterCard">
									<div class="mediaIcon shortBorder">
										<SanityImage image={character.owner.userPortrait}/>
									</div>
									<h4>{character.owner.handle}</h4>
								</div>
							</RedirectBuilder>
						</SocialsFoldable>
					</div>
				{/each}
			</div>
		{/if}
		{#if data.authors.length > 0}
			<p> With additional help from: </p>
			{#each data.authors as author}
				<SocialsFoldable socials={author.author.socialMedia}>
					<RedirectBuilder url="{$directoryData.stripped}?query=@{author.author.handle.toLowerCase().replaceAll(' ','-')}">
						<div class="characterCard" class:socialFold={author?.author?.socialMedia?.length > 0}>
							<div class="mediaIcon shortBorder">
								<SanityImage image={author.author.userPortrait}/>
							</div>
							<h4>{author.author.fullName}</h4>
						</div>
					</RedirectBuilder>
				</SocialsFoldable>
			{/each}
		{/if}

		{#if data.gallery.styleType && data.gallery.renderType}
			<p>
				<DividedTag>
					<span slot="title">{data.gallery.styleType}</span>
					<span slot="desc">{data.gallery.renderType}</span>
				</DividedTag>
			</p>
		{/if}
		{#if data.tags?.length > 0}
			<div class="postTags">
				{#each data.tags as tag}
					<RedirectBuilder url="{$directoryData.stripped}?query={tag.title.toLowerCase().replaceAll(' ','-')}">
						<InlineTag tag={tag}/>
					</RedirectBuilder>
				{/each}
			</div>
		{/if}
	</div>

	<div slot="alt">
		{#if !!data.characters || !!data.commissionData?.characters}
			<p>Featured Character{[].concat(data?.commissionData?.characters, data?.characters).filter(Boolean).length > 1 ? 's' : ''}:</p>
			{#each [].concat(data?.commissionData?.characters, data?.characters).filter(Boolean) as character}
				<RedirectBuilder url="{$directoryData.stripped}?query=:{(character.nickName ?? character.fullName).toLowerCase()}">
					<div class="characterCard">
						<div class="mediaIcon shortBorder">
							<SanityImage image={character.charIcon}/>
						</div>
						<h4>{character.fullName}</h4>
					</div>
				</RedirectBuilder>
			{/each}
		{/if}
		<p>{createdPush(data.publishedAt)}</p>
		{#if data.imageRefId || data.photoshopRefId}
			<p>Membership features:</p>
			<p class="footer">
				{#if data.imageRefId}
					<a href={data.imageRefId} target="_blank">
						<DividedTag hover={true}>
							<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp"></div>
							<span slot="title">Archive</span>
							<span slot="desc">Tier 1 or higher</span>
						</DividedTag>
					</a>
				{/if}
				{#if data.photoshopRefId}
					<a href={data.imageRefId} target="_blank">
						<DividedTag hover={true}>
							<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp"></div>
							<span slot="title">Photoshop</span>
							<span slot="desc">Tier 3 or higher</span>
						</DividedTag>
					</a>
				{/if}
			</p>
		{/if}
	</div>
</ImageFloatCard>

<style lang="scss">
	p {		margin: 7px 0 7px 0;}
	p + p {	margin: 5px 0 5px 0;}

	.characterCard {
		display: 		flex;
		vertical-align: bottom;
		transition: 	ease .3s;

		padding:    	4px;
		gap: 			10px;
		margin: 		0px -3px 1px -1px ;
		border-radius: 	20px;

		&:hover {		background: var(--accent2);
			h4 {		color: 		white;}}
		> * {			margin: 	auto 0;}
		.mediaIcon {	overflow:	hidden;}}

	.commissionWrapper {	margin: 5px 0 5px 0;
		.commissioner {		margin: 0 0 5px 0;}
		.altTitle {	margin: 10px 0 2px 0;}}
	.postTags {		margin: 5px 0 -5px 0;}
	.footer {
		.links {	gap: 		5px;
					display: 	grid;}}
</style>