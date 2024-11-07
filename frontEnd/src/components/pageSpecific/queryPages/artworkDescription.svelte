<script>
    import { createdPush } 	from "$lib/builders/dateBuilder.js";

    import DividedTag 		from "$root/components/generic/wrappers/tags/pilledTag.svelte";
    import SocialsFoldable 	from "$root/components/generic/wrappers/socialsFoldable.svelte";
    import ImageFloatCard 	from "$root/components/generic/containers/imageContainers/galleryImageCard.svelte";
    import FoldedTags 		from "$root/components/generic/wrappers/tags/foldedTags.svelte";

    export let
		data,
		hover = true,
		active  = true,
		absolute = false;

	let characterOwners;

    const uniqueOwnerCheck = (i) => {
        let uniqueCheck = [],
			returnArray = [];

        i.forEach(e => {
            if (!uniqueCheck.includes(e.owner.handle)){
                uniqueCheck.push(e.owner.handle);
                returnArray.push(e.owner);}});
        return returnArray;}

    data?.commissionData?.characters ? characterOwners = uniqueOwnerCheck(data?.commissionData?.characters) : false;
</script>

<ImageFloatCard {hover} {active} {absolute}>
	<h4 slot="title">{data.pieceName}</h4>
	<div slot="desc">
		<h4>{data.pieceName}</h4>
		{#if data.gallery.styleType && data.gallery.renderType}
			<p id="renderType" class="citation">
				{data.gallery.styleType}, {data.gallery.renderType}
			</p>
		{/if}
		<p id="date" class="citation">{createdPush(data.publishedAt)}</p>
		{#if !!data.description}
			<p id="description">{data.description}</p>
		{/if}
		{#if characterOwners}
			<div class="commissionWrapper">
				<p class="citation" >{data.commissionData.commissionType} for:</p>
				{#each characterOwners as author}
					<div class="commissioner">
						<SocialsFoldable {author}/>
					</div>
				{/each}
			</div>
		{/if}
		{#if data.authors?.length > 0}
			<p class="citation"> Created with the help of: </p>
			{#each data.authors as author}
				<SocialsFoldable {author}/>
			{/each}
		{/if}
	</div>
	<div slot="alt">
		{#if !!data?.characters || characterOwners}
			<p class="citation">Featured Character{[].concat(data?.commissionData?.characters, data?.characters).filter(Boolean).length > 1 ? 's' : ''}:</p>
			{#each [].concat(data?.commissionData?.characters, data?.characters).filter(Boolean) as author}
				<SocialsFoldable {author} character={true}/>
			{/each}
			{#if data.tags?.length > 0}
				<FoldedTags tagSet={data.tags} urlRedirect={data.slug}/>
			{/if}
		{/if}
		{#if data.imageRefId || data.photoshopRefId}
			<p class="citation">Membership features:</p>
			<p class="footer">
				{#if data.imageRefId}
					<a href={data.imageRefId} target="_blank">
						<DividedTag hover={true}>
							<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp" alt=""></div>
							<span slot="title">Artchive</span>
							<span slot="desc">Tier 1</span>
						</DividedTag>
					</a>
				{/if}
				{#if data.photoshopRefId}
					<a href={data.imageRefId} target="_blank">
						<DividedTag hover={true}>
							<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp" alt=""></div>
							<span slot="title">Source file</span>
							<span slot="desc">Tier 3</span>
						</DividedTag>
					</a>
				{:else if data.archiveTooLarge}
					<div>
						<DividedTag>
							<div slot="titleIcon"><img class="inlineIcon" src="/externalIcons/discord.webp" alt=""></div>
							<span slot="title">Source File</span>
							<span slot="desc">Unavailable</span>
						</DividedTag>
					</div>
				{/if}
			</p>
		{/if}
	</div>
</ImageFloatCard>

<style lang="scss">
	.footer {			width: 	100%;
						display: flex;
						gap: 	5px;
						margin: 2px auto 2px 0;}
	div { p {			margin: 7px 0 7px 0;}
		p + p {			margin: 5px 0 5px 0;}
		p.citation { 	margin: 9px 0 3px 0;}
		p#renderType {	margin: 3px 0 2px 0;}
		p#date {		margin: 3px 0 5px 0;}
		p#description { margin: 9px 0 0 0;}}
	.commissionWrapper {margin: 5px 0 5px 0;
		.commissioner {	margin: 0 0 5px 0;}}
</style>