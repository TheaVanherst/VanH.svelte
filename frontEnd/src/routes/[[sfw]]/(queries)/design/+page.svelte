<script>
    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/pageLayout/dataPagination.svelte";

    import { dataSetStore } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter, searchTermBuilder } from "$lib/controllers/layoutControllers/searchController.js";

    import ArtworkCard from "$root/components/pageSpecific/queryPages/artworkCard.svelte";

    export let data;
    data.designs =
		data.designs.map(a => ({ ...a,
			searchTerms: (
                searchTermBuilder.sfw(a) + searchTermBuilder.title(a) + searchTermBuilder.renderStyle(a) +
                searchTermBuilder.tags(a) + searchTermBuilder.authors(a) + searchTermBuilder.characters(a) +
                searchTermBuilder.commissions(a)).toLowerCase()}));

    let pagedData, filteredData = queryFilter(data.designs);
    $: $dataSetStore.searchQuery && queryFilter(data.designs);
</script>

{#if data.designs && data.designs.length > 0}
	<div class="center">
		{#if pagedData}
			<Masonry
					items=	{pagedData}
					gap=	{10}
					idKey=	{`slug`}
					animate= {false}
					let:item>
				<div class="designPost">
					<ArtworkCard data={item}/>
				</div>
			</Masonry>
		{/if}
		{#if filteredData}
			<Pagination
				rows={filteredData} perPage={15}
				goto={$dataSetStore.page}
				bind:currentPage={$dataSetStore.page}
				bind:trimmedRows={pagedData}/>
		{/if}
	</div>
{/if}

<style lang="scss">
	.center {
		width: 	 100%;
		margin:  0 auto 15px auto;
		display: grid;
		gap: 	 15px;
	}
</style>