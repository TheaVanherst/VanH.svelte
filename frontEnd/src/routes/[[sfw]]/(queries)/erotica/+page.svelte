<script>
    import { page } 	from "$app/stores";
    import { goto } 	from "$app/navigation";
    import { onMount } 	from "svelte";

    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/pageLayout/dataPagination.svelte";

    import { dataSetStore, fullscreenGalleryStore } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter, searchTermBuilder } 		from "$lib/controllers/layoutControllers/searchController.js";

    import StoryPreview from "$root/components/pageSpecific/queryPages/erotica/storyPreview.svelte";
    import StoryCard 	from "$root/components/pageSpecific/queryPages/erotica/storyCard.svelte";

	export let data;

    data.erotica =
        data.erotica.map(a => ({ ...a,
            searchTerms: (
                searchTermBuilder.title(a) + searchTermBuilder.tags(a) +
				searchTermBuilder.authors(a) + searchTermBuilder.characters(a))}));

    let pagedData,
		filteredData = queryFilter(data.erotica);

    const
		storySelect = async (story) => {
			setTimeout(async () => {
                $fullscreenGalleryStore.componentUrl = 	StoryCard;
                $fullscreenGalleryStore.componentData = story;

				if (!!$fullscreenGalleryStore.componentData) {
					$page.url.searchParams.set('story',story.slug);
					await goto (`?${$page.url.searchParams.toString()}`);}
			}, 250);};

    onMount(() => {
        $fullscreenGalleryStore.componentUrl = StoryCard;
        $fullscreenGalleryStore.componentData = structuredClone(data.erotica).map(i => (i.slug === $page.url.searchParams.get('story') ? i : undefined)).filter(n => n)[0];
	});
</script>

{#if filteredData}
	<Pagination
			rows={filteredData} perPage={10}
			goto={$dataSetStore.page}
			bind:currentPage={$dataSetStore.page}
			bind:trimmedRows={pagedData}/> {/if}
{#if pagedData}
	<Masonry
			items=	{pagedData}
			gap=	{10}
			idKey=	{`slug`}
			animate= {false}
			let:item>
		<div class="erotica" on:click={storySelect(item)}>
			<StoryPreview story={item}/>
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