<script>
	import { slide } from "svelte/transition";

    import { onMount } 	from "svelte";
    import { page } 	from "$app/stores";

    import TransitionHandler 	from "$lib/transitions/transitionHandler.svelte";

    import { navigationVisibility, socialMediaVisibility, transitioning } from "$lib/controllers/pageControllers.js";
    import { dataSetStore } 	from "$lib/pageSettings/pageSettings.js";
    import { urlSerializer } 	from "$lib/controllers/searchController.js";
    import { beforeNavigate } 	from "$app/navigation";

    $socialMediaVisibility = 	true;
    $navigationVisibility = 	true;

    export let data;

    onMount(() => {
        $dataSetStore.searchQuery = $page.url.searchParams.get("query") || "";
        $dataSetStore.page = $page.url.searchParams.get("page") || 0;

        if ($dataSetStore.searchQuery) {
            value = $dataSetStore.searchQuery.replaceAll('-',' ');
            value = decodeURIComponent(value);
            $dataSetStore.searchQuery = value;}});

    beforeNavigate((e) => {
        if (e.from.route.id !== e?.to?.route?.id) {
            value = "";
            $dataSetStore.searchQuery = "";
            $dataSetStore.page = 		0;}});

    const hardSearch = (query = "", page = 0) => {
        $dataSetStore.searchQuery = query;
        $dataSetStore.page = 		page;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        $transitioning = true;
        setTimeout(() => { // this allows the pagination to update
            urlSerializer({
				'query': $dataSetStore.searchQuery,
				'page': $dataSetStore.page});}, 300);
        setTimeout(() => { // this allows the pagination to update
            $transitioning = false;}, 300);};

    let value;
</script>

<div class="center wrapper" transition:slide>
	<div class="searchBar">
		<form on:submit|preventDefault={() => hardSearch(value, 0)}>
			<input type="search" class="input" placeholder="Search..." bind:value={value}/>
		</form>
	</div>
</div>

<TransitionHandler>
	<slot/>
</TransitionHandler>

<style lang="scss">
	.center { margin: 10px auto 15px auto; }
</style>