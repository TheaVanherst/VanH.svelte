<script>
    import { clickOutside } from "$lib/transitions/transitionPresets.js";
    import { createdPush } 	from "$lib/builders/dateBuilder.js";
    import { directoryData } 	from "$lib/pageSettings/redirectHandling.js";

    import SanityGalleries 	from "$root/serializer/types/sanityGalleries.svelte";
    import SanityImage 		from "$root/serializer/types/sanityImage.svelte";

    import RedirectBuilder from "$root/components/generic/controllers/redirectBuilder.svelte";

	import DividedTag 		from "$root/components/generic/wrappers/pilledTag.svelte";
    import SocialMediaTag 	from "$root/components/generic/wrappers/inlineRedirectTag.svelte";
    import ImageFloatCard 	from "$root/components/generic/imageContainers/imageFloatCard.svelte";
    import InlineTag 		from "$root/components/generic/wrappers/inlineGenreTag.svelte";

    export let postData;

    let active = false,
		hover = false,
		arrayLength =
			(postData?.characters ? postData.characters.length : 0) +
			(postData?.commissionData?.characters ? postData.commissionData.characters?.length : 0);

    const
		imageClick = () => {	active ? active = !active : false;},
		cardFloatClick = () => {active = active ? active : !active;};
</script>

<div class="postWrapper wideBorder"
	 on:mouseenter={() => hover = true}
	 use:clickOutside
	 on:click_outside={() => hover = active = false}
	 on:mouseleave={() => hover = false}>

	<div class="galleryWrapper">
		<div class="gallery" on:click={imageClick} class:clickable={active}>
			<div>
				<SanityGalleries portableText={postData.gallery}/>
			</div>
		</div>
		<div on:click={cardFloatClick}>
			<ImageFloatCard hover={hover} active={active} accent={true}>
				<h4 slot="title">{postData.pieceName}</h4>
				<div slot="desc">
					<h4>{postData.pieceName}</h4>
					{#if !!postData.description}
						<p>
							{postData.description}
						</p>
					{/if}
					{#if !!postData.commissionData}
						<div class="commissionWrapper">
							<p class="altTitle">
								{postData.commissionData.commissionType} for:
							</p>
							{#each postData.commissionData.characters as character}
								<div class="commissioner">
									<RedirectBuilder url="{$directoryData.stripped}?query={character.owner.handle.toLowerCase()}">
										<div class="characterCard">
											<div class="mediaIcon shortBorder">
												<SanityImage image={character.owner.userPortrait}/>
											</div>
											<h4>{character.owner.handle}</h4>
										</div>
									</RedirectBuilder>
									{#if character.owner?.socialMedia?.length > 0}
										{#each character.owner.socialMedia as social}
											<SocialMediaTag data={social}/>
										{/each}
									{/if}
								</div>
							{/each}
						</div>
					{/if}
					{#if postData.authors.length > 0}
						<p> With additional help from: </p>
						{#each postData.authors as author}
							<div class="characterCard">
								<div class="mediaIcon shortBorder">
									<SanityImage image={author.author.userPortrait}/>
								</div>
								<h4>{author.author.fullName}</h4>
							</div>
							{#if author.author?.socialMedia?.length > 0}
								{#each author.author.socialMedia as social}
									<SocialMediaTag data={social}/>
								{/each}
							{/if}
						{/each}
					{/if}

					{#if postData.gallery.styleType && postData.gallery.renderType}
						<p>
							{#if postData.gallery.styleType && postData.gallery.renderType}
								<DividedTag>
									<span slot="title">{postData.gallery.styleType}</span>
									<span slot="desc">{postData.gallery.renderType}</span>
								</DividedTag>
							{/if}
						</p>
					{/if}

					{#if postData.tags?.length > 0}
						<div class="postTags">
							{#each postData.tags as tag}
								<RedirectBuilder url="{$directoryData.stripped}?query={tag.title.toLowerCase().replaceAll(' ','-')}">
									<InlineTag tag={tag}/>
								</RedirectBuilder>
							{/each}
						</div>
					{/if}
				</div>
				<div slot="alt">
					{#if !!postData.characters || !!postData.commissionData?.characters}
						<p>
							Featured Character{arrayLength > 1 ? 's' : ''}:
						</p>
					{/if}
					{#if !!postData.characters}
						{#each postData.characters as character}
							<RedirectBuilder url="{$directoryData.stripped}?query={character.fullName.toLowerCase()}">
								<div class="characterCard">
									<div class="mediaIcon shortBorder">
										<SanityImage image={character.charIcon}/>
									</div>
									<h4>{character.fullName}</h4>
								</div>
							</RedirectBuilder>
						{/each}
					{/if}
					{#if !!postData.commissionData?.characters}
						{#each postData.commissionData.characters as character}
							<RedirectBuilder url="{$directoryData.stripped}?query={character.fullName.toLowerCase()}">
								<div class="characterCard">
									<div class="mediaIcon shortBorder">
										<SanityImage image={character.charIcon}/>
									</div>
									<h4>{character.fullName}</h4>
								</div>
							</RedirectBuilder>
						{/each}
					{/if}

					<p>{createdPush(postData.publishedAt)}</p>

					{#if postData.imageRefId || postData.photoshopRefId}
						<div class="footer">
							<p class="links">
								{#if postData.imageRefId}
									<a class="shortBorder" href={postData.imageRefId} target="_blank">
										<DividedTag hover={true}>
											<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp"></div>
											<span slot="title">Archive</span>
											<div slot="descIcon"><img class="inlineIcon" src="/externalIcons/discord.webp"></div>
											<span slot="desc">Tier 1 or higher</span>
										</DividedTag>
									</a>
								{/if}
								{#if postData.photoshopRefId}
									<a class="shortBorder" href={postData.imageRefId} target="_blank">
										<DividedTag hover={true}>
											<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp"></div>
											<span slot="title">Photoshop</span>
											<div slot="descIcon"><img class="inlineIcon" src="/externalIcons/discord.webp"></div>
											<span slot="desc">Tier 3</span>
										</DividedTag>
									</a>
								{/if}
							</p>
						</div>
					{/if}
				</div>
			</ImageFloatCard>
		</div>
	</div>
</div>

<style lang="scss">
	.preview {
		position: 	absolute;
		z-index: 	1;
		right: 		0;
		bottom: 	0;
		margin:	 	10px;}

	.clickable {	pointer-events: all;
		> div {		pointer-events: none;}}

	.postWrapper {
			width: 		100%;
			overflow: 	hidden;
		.galleryWrapper {
			position: 	relative;}}

	p {		margin: 7px 0;}
	p + p {	margin: 5px 0;}

	.commissionWrapper {	margin: 5px 0;
		.commissioner {		margin: 0 0 5px 0;}
		.altTitle {			margin: 10px 0 2px 0;}}

	.postTags {
			margin: 0 0 -5px 0;}

	.characterCard {
		display: 		flex;
		vertical-align: bottom;
		transition: 	ease .3s;

		width: 		100%;
		margin: 	0px -3px 5px -3px ;
		padding:    4px;
		gap: 		10px;
		border-radius: 20px;

		&:hover {		background: var(--accent2);
			h4 {		color: 		white;}}
		> * {			margin: 	auto 0;}
		.mediaIcon {	overflow:	hidden;}}

	.links {
		gap: 		5px;
		display: 	grid;}
</style>