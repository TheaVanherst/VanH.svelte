<script>
    import { page } 	from "$app/stores";
    import { onMount } 	from "svelte";

    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/coreLayoutComponents/pageLayout/dataPagination.svelte";

    import { dataSetStore } from "$lib/settings/pageSettings.js";
    import { galleryManager, queryFilter, searchTermBuilder } from "$lib/controllers/searchController.js";

    import StoryPreview from "$root/components/pageSpecific/queryPages/erotica/storyPreview.svelte";

	export let
		data;
		data.erotica =
			data.erotica.map(a => ({ ...a,
				searchTerms: (
					searchTermBuilder.title(a) + searchTermBuilder.tags(a) +
					searchTermBuilder.authors(a) + searchTermBuilder.characters(a))}));

    let pagedData,
		filteredData = queryFilter(data.erotica);

    onMount(() => {
        const
            initialSlug = $page.url.searchParams.get('story');
        	initialSlug ? galleryManager.textInitializing(data.erotica, initialSlug) : false; });
</script>

{#if !!data.erotica && data?.erotica?.length > 0}
	{#if filteredData}
		<Pagination
				rows={filteredData} perPage={10}
				goto={$dataSetStore.page}
				bind:currentPage={$dataSetStore.page}
				bind:trimmedRows={pagedData}>
			{#if pagedData}
				<Masonry
						items=	{pagedData}
						gap=	{10}
						idKey=	{`slug`}
						animate= {false}
						let:item>
					<div class="erotica" on:click={galleryManager.storySelection(item)}>
						<StoryPreview story={item}/>
					</div>
				</Masonry>
			{/if}
		</Pagination>
	{/if}
{/if}