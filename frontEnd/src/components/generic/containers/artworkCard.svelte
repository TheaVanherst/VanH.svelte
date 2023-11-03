<script>
	import { fade } from "svelte/transition";
    import { clickOutside } from "$lib/transitions/transitionPresets.js";

    import { createdPush } from "$lib/builders/dateBuilder.js";
    import { galleryChange } from "$lib/controllers/pageSettings.js";

    import SanityGalleries from "$root/serializer/types/sanityGalleries.svelte";
    import SanityImage from "$root/serializer/types/sanityImage.svelte";

	import DividedTag from "$root/components/generic/wrappers/dividedTag.svelte";
    import GenericButton from "$root/components/generic/wrappers/genericButton.svelte";
    import ImageFloatCard from "$root/components/generic/imageContainers/imageFloatCard.svelte";
    import InlineTag from "$root/components/generic/wrappers/inlineTag.svelte";

    export let postData;

    let active = false,
		hover = false,
		arrayLength =
			(postData?.characters ? postData.characters.length : 0) +
			(postData?.commissionData?.characters ? postData.commissionData.characters?.length : 0);
</script>

<div class="postWrapper wideBorder"
	 on:mouseenter={() => hover = true}
	 on:click={() => active = !active}
	 use:clickOutside on:click_outside={() => hover = active = false}
	 on:mouseleave={() => hover = active = false}>

	<div class="galleryWrapper">
		{#if hover || active}
			<div class="preview" transition:fade on:click={() => galleryChange(postData.gallery)}>
				<GenericButton icon="/icons/magnifyIcon"/>
			</div>
		{/if}
		<SanityGalleries portableText={postData.gallery}/>
		<ImageFloatCard active={active} accent={true}>
			<h4 slot="title">{postData.pieceName}</h4>
			<div slot="desc">
				<h4>{postData.pieceName}</h4>
				<p>
					{!!postData.description ? postData.description : ''}
				</p>
				{#if !!postData.commissionData}
					<p class="altTitle">
						{postData.commissionData.commissionType} for:
					</p>
					{#each postData.commissionData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.owner.userPortrait}/>
							</div>
							<h4>{character.owner.handle}</h4>
						</div>
					{/each}
				{/if}
				{#if postData.authors.length > 0}
					<p> With additional help from: </p>
					{#each postData.authors as author}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={author.author.userPortrait}/>
							</div>
							<h4>{author.author.fullName}</h4>
						</div>
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
					{#each postData.tags as tag}
						<InlineTag tag={tag}/>
					{/each}
				{/if}
			</div>
			<div slot="alt">
				{#if !!postData.characters}
					<p>
						Featured Character{arrayLength > 1 ? 's' : ''}:
					</p>
					{#each postData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.charIcon}/>
							</div>
							<h4>{character.fullName}</h4>
						</div>
					{/each}
				{/if}
				{#if !!postData.commissionData?.characters}
					{#each postData.commissionData.characters as character}
						<div class="characterCard">
							<div class="icon mediaIcon shortBorder">
								<SanityImage image={character.charIcon}/>
							</div>
							<h4>{character.fullName}</h4>
						</div>
					{/each}
				{/if}

				<p>{createdPush(postData.publishedAt)}</p>

				{#if postData.imageRefId || postData.photoshopRefId}
					<div class="footer">
						<p>Discord references:</p>
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

<style lang="scss">
	.preview {
		position: 	absolute;
		z-index: 	1;
		right: 		0;
		bottom: 	0;
		margin:	 	10px;}

	.postWrapper {
		width: 		100%;
		overflow: 	hidden;
		.galleryWrapper {
			position: 	relative;}}

	p {		margin: 7px 0;}
	p + p {	margin: 4px 0;}

	.characterCard {
		display: 	flex;
		width: 		100%;
		margin: 	5px 0;
		gap: 		10px;
		vertical-align: bottom;
		> * {
			margin: 	auto 0;}
		.icon {
			overflow:	hidden;}}

	.links {
		gap: 		5px;
		display: 	grid;}
</style>