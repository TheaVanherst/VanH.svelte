<script>
    import { createdPush } 	from "$lib/builders/dateBuilder.js";

    import { directoryData } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import DividedTag 		from "$root/components/generic/wrappers/tags & Inline/tags/pilledTag.svelte";
    import InlineTag 		from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";
    import RedirectBuilder 	from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";
    import ImageFloatCard 	from "$root/components/generic/containers/imageContainers/galleryImageCard.svelte";

    export let
		data,
		hover = true,
		active  = true,
		absolute = false;

	let characterOwners;

    const uniqueOwnerCheck = (i) => {
        let uniqueCheck = [], returnArray = [];

        i.forEach(e => {
            if (!uniqueCheck.includes(e.owner.handle)){
                uniqueCheck.push(e.owner.handle);
                returnArray.push(e.owner);}});
        return returnArray;}

	if (data?.commissionData?.characters) {
        characterOwners = uniqueOwnerCheck(data?.commissionData?.characters);}
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
				{#each characterOwners as owner}
					<div class="commissioner">
						<SocialsFoldable author={owner}/>
					</div>
				{/each}
			</div>
		{/if}
		{#if data.authors.length > 0}
			<p> With additional help from: </p>
			{#each data.authors as author}
				<SocialsFoldable author={author}/>
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
					<RedirectBuilder url="{$directoryData.stripped}?query={tag.title.toLowerCase().replaceAll(' ','_')}">
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
				<SocialsFoldable author={character} character={true}/>
			{/each}
		{/if}
		<p>{createdPush(data.publishedAt)}</p>
		{#if data.imageRefId || data.photoshopRefId}
			<p>Membership features:</p>
			<p class="footer">
				{#if data.imageRefId}
					<a href={data.imageRefId} target="_blank">
						<DividedTag hover={true}>
							<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp" alt=""></div>
							<span slot="title">Archive</span>
							<span slot="desc">Tier 1 or higher</span>
						</DividedTag>
					</a>
				{/if}
				{#if data.photoshopRefId}
					<a href={data.imageRefId} target="_blank">
						<DividedTag hover={true}>
							<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp" alt=""></div>
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

	.commissionWrapper {	margin: 5px 0 5px 0;
		.commissioner {		margin: 0 0 5px 0;}
		.altTitle {	margin: 10px 0 2px 0;}}
	.postTags {		margin: 5px 0 -5px 0;}
</style>