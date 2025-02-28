<script>
    import { page } 	from "$app/stores";
    import { onMount } 	from "svelte";

    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/coreLayoutComponents/pageLayout/dataPagination.svelte";

    import { dataSetStore } 									from "$lib/settings/pageSettings.js";
    import { queryFilter, searchTermBuilder, galleryManager }	from "$lib/controllers/searchController.js";

    import ArtworkCard 	from "$root/components/pageSpecific/queryPages/artworkCardWrapper.svelte";

    export let
		data;
		data.designs = // TODO: this needs putting into the api request
			data.designs.map(a => ({ ...a,
				searchTerms: (
					searchTermBuilder.sfw(a) + searchTermBuilder.title(a) + searchTermBuilder.renderStyle(a) +
					searchTermBuilder.tags(a) + searchTermBuilder.authors(a) + searchTermBuilder.characters(a) +
					searchTermBuilder.commissions(a)).toLowerCase()}));

    let pagedQueryResults,
        queryData = queryFilter(data.designs);

    onMount(() => {
        const
			initialSlug = $page.url.searchParams.get('gallery');
        	initialSlug ? galleryManager.galleryInitializing(data.designs, initialSlug) : false; });
</script>

{#if !!data.designs && data?.designs?.length > 0}
	{#if queryData}
		<Pagination
				rows={queryData} perPage={15}
				goto={$dataSetStore.page}
				bind:currentPage={$dataSetStore.page}
				bind:trimmedRows={pagedQueryResults}>
			{#if pagedQueryResults}
				<Masonry
						items=	{pagedQueryResults}
						gap=	{10}
						idKey=	{`slug`}
						animate= {false}
						let:item>
					<div class="designPost" id="{item.slug}">
						<ArtworkCard data={item} expandedTags={true}/>
					</div>
				</Masonry>
			{/if}
		</Pagination>
	{/if}
{/if}