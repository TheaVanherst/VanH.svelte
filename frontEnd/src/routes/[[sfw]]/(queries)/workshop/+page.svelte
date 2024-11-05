<script>
    import { queryFilter, searchTermBuilder } 			from "$lib/controllers/searchController.js";
    import { navigationControls } 						from "$lib/settings/navigationHandling.js";

    import WorkshopPreview 	from "$root/components/pageSpecific/queryPages/workshop/workshopPreview.svelte";

	export let data;

    data.workshop =
        data.workshop.map(a => ({ ...a,
            searchTerms: (
                searchTermBuilder.sfw(a) + searchTermBuilder.title(a) +
                searchTermBuilder.authors(a) + searchTermBuilder.characters(a))}));
</script>

<div class="workshopTable">
	{#each  queryFilter(data.workshop) as data}
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