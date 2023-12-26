<script>
    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/pageLayout/dataPagination.svelte";

    import { dataSetStore } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter } 	from "$lib/controllers/layoutControllers/searchController.js";
    import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";
    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";

    import StoryPreview from "$root/components/pageSpecific/erotica/storyPreview.svelte";

	export let data;

    let pagedData;

    data.erotica =
        data.erotica.map(artwork => ({
            ...artwork,
            searchTerms: (
                `${artwork.pieceName.replaceAll(" ","_")} ${artwork.slug} ` +
                (!!artwork.tags ? `${artwork.tags.map(i => `${i.title}${(!!i?.relatedTags ? ` ${i.relatedTags}` : '')} `).join('')}` : '') +
                (!!artwork.authors ? artwork.authors.map(artist => `${artist.author.fullName} @${artist.author.handle}`).join('') : '') +
                (!!artwork.characters ? artwork.characters?.map(character => `:${character.fullName} :${character.nickName} `).join('') : '')
            ).toLowerCase()}));

    let filteredData = queryFilter(data.erotica, $navigationControls.nsfw);
    $: $dataSetStore.searchQuery && queryFilter(data.erotica);
</script>

<div class="center">
	{#if pagedData}
		<Masonry
				items=	{pagedData}
				gap=	{10}
				idKey=	{`slug`}
				animate= {false}
				let:item>
			<div class="erotica">
				<RedirectBuilder url="/erotica/{item.slug}">
					<StoryPreview story={item}/>
				</RedirectBuilder>
			</div>
		</Masonry>
	{/if}
	{#if filteredData}
		<Pagination
			rows={filteredData} perPage={10}
			goto={$dataSetStore.page}
			bind:currentPage={$dataSetStore.page}
			bind:trimmedRows={pagedData}/>
	{/if}
</div>

<style lang="scss">
	.center {
		width: 	 100%;
		margin:  0 auto 15px auto;
		display: grid;
		gap: 	 15px;}
</style>