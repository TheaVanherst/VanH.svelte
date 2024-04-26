<script>
	// import { slide, fade } from "svelte/transition";

    import { queryFilter, searchTermBuilder } from "$lib/controllers/layoutControllers/searchController.js";
    import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";

    // import PortableText from "$root/serializer/portableText.svelte";
    // import SanityImage from "$root/serializer/sanityImage.svelte";

    import WorkshopCard from "$root/components/pageSpecific/homePage/embedded/workshopCard.svelte";
    // import SocialsFoldable 	from "$root/components/generic/wrappers/tags & Inline/socialsFoldable.svelte";

	export let data;

    data.workshop =
        data.workshop.map(a => ({ ...a,
            searchTerms: (
                searchTermBuilder.sfw(a) + searchTermBuilder.title(a) +
                searchTermBuilder.authors(a) + searchTermBuilder.characters(a))}));

    let focusId = undefined;

    const
		focalItem = (id) => {
            focusId = focusId === id ? undefined : id}

	let filteredData = queryFilter(data.workshop);
</script>

<!--{#if focusId !== undefined}-->
<!--	<div class="featuredItem" transition:slide>-->
<!--		<div class="workshopFeature wideBorder">-->
<!--			<div class="bannerWrapper">-->
<!--				{#if filteredData[focusId].banner}-->
<!--					<div class="banner imageWrapper" transition:slide>-->
<!--						<SanityImage image={filteredData[focusId].banner} width={800}/>-->
<!--					</div>-->
<!--				{/if}-->
<!--			</div>-->

<!--			<div class="dataWrapper">-->
<!--				<div class="thumbnailWrapper imageWrapper regularBorder">-->
<!--					<SanityImage image={filteredData[focusId].previewImage} width={200}/>-->
<!--					<div class="gameThumbnail profileIcon shortBorder">-->
<!--						<SanityImage image={filteredData[focusId].gameLogo} width={48}/>-->
<!--					</div>-->
<!--				</div>-->

<!--				<div class="information">-->
<!--					<div class="header">-->
<!--						<h2>-->
<!--							{filteredData[focusId].itemName}-->
<!--						</h2>-->
<!--						<p transition:slide>{filteredData[focusId].shortDesc}</p>-->
<!--					</div>-->
<!--					<div class="authors" transition:slide>-->
<!--						{#each filteredData[focusId].authors as author}-->
<!--							<SocialsFoldable author={author} authorSocials={false}/>-->
<!--						{/each}-->
<!--					</div>-->
<!--					{#if filteredData[focusId].desc}-->
<!--						{#key focusId}-->
<!--							<div class="description" transition:slide>-->
<!--								<PortableText data={filteredData[focusId].desc}/>-->
<!--							</div>-->
<!--						{/key}-->
<!--					{/if}-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--	</div>-->
<!--{/if}-->

<div class="workshopTable">
	{#each filteredData as workshop, i}
		{#if $navigationControls.localNsfwCheck(workshop.NSFW)}
			<div class="workshopItem" on:click={() => {focalItem(i)}} class:active={i === focusId}>
				<WorkshopCard dataEntry={workshop} clickable={true}/>
<!--				<div class="imageWrapper wideBorder">-->
<!--					<div class="thumbnail">-->
<!--						<SanityImage image={workshop.previewImage}/>-->
<!--					</div>-->
<!--					<div class="gameThumbnail profileIcon shortBorder">-->
<!--						<SanityImage image={workshop.gameLogo}/>-->
<!--					</div>-->
<!--				</div>-->
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	:global(p, h3, h2){
		color: black;}

	.gameThumbnail {
		position: 	absolute;
		background: black;

		bottom: 0;
		right: 	0;
		margin: 5px;}

	.featuredItem {
		margin-bottom: 15px;
		.workshopFeature {
			position: 	relative;
			overflow: 	hidden;
			width: 		100%;
			top: 		0;
			left: 		0;
			background: var(--TransWhite);

			> * {
				width: 		100%;
				box-sizing: border-box;
				display: 	flex;}

			.bannerWrapper {
				width: 		100%;}
			.banner {
				vertical-align: bottom;
				background: var(--accent7);
				height: 	200px;}}}

	.dataWrapper {
		padding: 	15px;
		gap: 		14px;

		.thumbnailWrapper {
			width: 		200px;
			min-width: 	fit-content;}

		.information {
			flex-grow: 	1;

			.header {
				gap: 		6px;
				display: 	grid;}
			.authors {
				margin:    	10px 0 10px -2px;
				padding: 	7px 0 7px 0;
				border-bottom: 	1px solid var(--accent9);
				border-top: 	1px solid var(--accent7);}
			.description {
				margin: 	0 auto auto 0;}}}

	.workshopTable {
		gap: 		15px;
		display: 	flex;
		flex-wrap: 	wrap;

		.workshopItem {
			width: 	200px;
			flex: 	1 1 auto;

			//.imageWrapper {
			//	transition: border .3s ease;
			//	border: 1px solid transparent;}
			//&.active {
			//	.imageWrapper {
			//		border: 1px solid white;}}
			//
			//.thumbnail {
			//	transition: transform .3s ease;}
			//&:hover {
			//	.thumbnail {
			//		transform: scale(1.1);}}
		}}
</style>