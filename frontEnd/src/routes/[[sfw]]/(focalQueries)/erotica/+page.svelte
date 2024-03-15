<script>
    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/pageLayout/dataPagination.svelte";

    import { dataSetStore } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter, searchTermBuilder } from "$lib/controllers/layoutControllers/searchController.js";

    import RedirectBuilder from "$root/components/generic/wrappers/redirectBuilder.svelte";
    import StoryPreview from "$root/components/pageSpecific/queryPages/storyPreview.svelte";

	export let data;
    data.erotica =
        data.erotica.map(a => ({ ...a,
            searchTerms: (
                searchTermBuilder.title(a) + searchTermBuilder.tags(a) +
				searchTermBuilder.authors(a) + searchTermBuilder.characters(a))}));

    let pagedData, filteredData = queryFilter(data.erotica);
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