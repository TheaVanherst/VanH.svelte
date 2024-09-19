<script>
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { fullscreenGalleryStore, scrollIntoView } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter, searchTermBuilder } from "$lib/controllers/layoutControllers/searchController.js";
    import { navigationControls } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import WorkshopPreview from "$root/components/pageSpecific/queryPages/workshop/workshopPreview.svelte";
    import WorkshopCard from "$root/components/pageSpecific/queryPages/workshop/workshopCard.svelte";

	export let data;

    data.workshop =
        data.workshop.map(a => ({ ...a,
            searchTerms: (
                searchTermBuilder.sfw(a) + searchTermBuilder.title(a) +
                searchTermBuilder.authors(a) + searchTermBuilder.characters(a))}));

	let filteredData = queryFilter(data.workshop);

    onMount(() => {
        const
			initialSlug = $page.url.searchParams.get('mod');

        if (initialSlug) {
            let dataReOrg = structuredClone(data.workshop).map(i => (i.slug === initialSlug ? i : undefined)).filter(n => n)[0];

            $fullscreenGalleryStore.componentUrl = 	WorkshopCard;
            $fullscreenGalleryStore.componentData = dataReOrg;

            setTimeout(() => {
                scrollIntoView(`#${initialSlug}`)}, 250);}});
</script>

<div class="workshopTable">
	{#each filteredData as data}
		{#if $navigationControls.localNsfwCheck(data.NSFW)}
			<div class="workshopItem">
				<WorkshopPreview {data}/>
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	:global(p, h3, h2){
		color: white;}

	.workshopTable {
		gap: 		15px;
		display: 	flex;
		flex-wrap: 	wrap;

		.workshopItem {
			width: 	200px;
			flex: 	1 1 auto;
		}}
</style>