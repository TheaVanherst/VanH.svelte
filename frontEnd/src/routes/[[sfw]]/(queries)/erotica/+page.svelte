<script>
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";

    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/pageLayout/dataPagination.svelte";

    import { dataSetStore, fullscreenGalleryStore } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter, searchTermBuilder } from "$lib/controllers/layoutControllers/searchController.js";
    import { directoryStatus } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import StoryPreview from "$root/components/pageSpecific/queryPages/storyPreview.svelte";
    import StoryCard from "$root/components/pageSpecific/queryPages/storyCard.svelte";

	export let data;

    data.erotica =
        data.erotica.map(a => ({ ...a,
            searchTerms: (
                searchTermBuilder.title(a) + searchTermBuilder.tags(a) +
				searchTermBuilder.authors(a) + searchTermBuilder.characters(a))}));

    let pagedData,
		filteredData = queryFilter(data.erotica);

    $: $dataSetStore.searchQuery && queryFilter(data.erotica);

    const storySelect = async (story) => {
        $fullscreenGalleryStore.componentUrl = 	StoryCard;
        $fullscreenGalleryStore.componentData = story;

        setTimeout(async () => {
        if (!!$fullscreenGalleryStore.componentData) {
            $page.url.searchParams.set('story',story.slug);
            const newQuery = `?${$page.url.searchParams.toString()}`;
            $directoryStatus.query = newQuery;
            await goto (newQuery);}
        else {
            new URLSearchParams($page.url.searchParams.toString()).delete('story');
            await goto(`${$directoryStatus.rawDirectory}`);}
        }, 250);}

    onMount(() => {
        const
            initialSlug = $page.url.searchParams.get('story');
        $fullscreenGalleryStore.componentUrl = StoryCard;
        $fullscreenGalleryStore.componentData = data.erotica.map(i => {return i.slug === initialSlug ? i : undefined;}).filter(n => n)[0];
	})
</script>

<div class="center">
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
</div>

<style lang="scss">
	.center {
		width: 	 100%;
		margin:  0 auto 15px auto;
		display: grid;
		gap: 	 15px;}
</style>