<script>
	import { slide } 	from "svelte/transition";

    import TransitionHandler 	from "$lib/transitions/transitionHandler.svelte";
    import { transitioning } 	from "$lib/controllers/pageControllers.js";

    import { dataSetStore } 	from "$lib/pageSettings/pageSettings.js";
    import { urlSerializer } 	from "$lib/controllers/searchController.js";

    export let data;

    // generic query functions

    import { page } 	from "$app/stores";

    const paramLocalUpdate = () => {
        value = $page.url.searchParams.get("query") || "";
        value = decodeURIComponent(value.replaceAll('-',' '))
        $dataSetStore.page = $page.url.searchParams.get("page") || 0;
        $dataSetStore.searchQuery = value;};
    const queryReset = () => {
        value = "";
        $dataSetStore.searchQuery = "";
        $dataSetStore.page = 		0;}

	// page direction amendments & functionality

    import { onMount } 	from "svelte";
    import { afterNavigate, beforeNavigate } from "$app/navigation";

    onMount(() => {paramLocalUpdate();});
    afterNavigate((e) => {
        if (e.delta || e.type === "enter") {
            $transitioning = true;
            paramLocalUpdate();
            setTimeout(() => { // this allows the pagination to update
                $transitioning = false;},300);}});
    beforeNavigate((e) => {
        if (e.from.route.id !== e?.to?.route?.id) {
            queryReset();}});

    // search functionality

    const hardSearch = (query = "", page = 0) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        $transitioning = true;
        setTimeout(() => { // this allows the pagination to update
            $dataSetStore.searchQuery = query;
            $dataSetStore.page = 		page;
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