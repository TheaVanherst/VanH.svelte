<script>
    import NavigationComponent 	from "$root/components/layout/headerElements/navBar.svelte";
    import {navigationData, navigationControls} from "$lib/controllers/layoutControllers/redirectHandling.js";

    export let data;

    import { slide } 	from "svelte/transition";
    import TransitionHandler 	from "$lib/controllers/transitionHandler.svelte";

    import { dataSetStore } 	from "$lib/controllers/layoutControllers/pageSettings.js";
    import { urlSerializer } 	from "$lib/controllers/layoutControllers/searchController.js";

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

    onMount(() => { paramLocalUpdate(); });
    afterNavigate((e) => {
        if (e.delta || e.type === "enter") {
            $navigationControls.transitioning = true;
            paramLocalUpdate();
            setTimeout(() => { // this allows the pagination to update
                $navigationControls.transitioning = false;},300);}});
    beforeNavigate((e) => {
        if (e.from.route.id !== e?.to?.route?.id) {
            queryReset();}});

    // search functionality

    const hardSearch = (query = "", page = 0) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        $navigationControls.transitioning = true;
        setTimeout(() => { // this allows the pagination to update
            $dataSetStore.searchQuery = query;
            $dataSetStore.page = 		page;
            urlSerializer({
                'query': $dataSetStore.searchQuery,
                'page': $dataSetStore.page});}, 300);
        setTimeout(() => { // this allows the pagination to update
            $navigationControls.transitioning = false;}, 300);};

    let value;
</script>

<div class="flexBox">
	{#if $navigationData.navigation || $navigationData.socials || $navigationData.logo }
		<div transition:slide>
			<NavigationComponent socials={data.featured}/>
		</div>
	{/if}

	{#if $navigationData.search}
		<div class="searchBarWrapper" transition:slide>
			<div class="searchBar">
				<form on:submit|preventDefault={() => hardSearch(value, 0)}>
					<input type="search" class="input" placeholder="Search..." bind:value={value}/>
				</form>
			</div>
		</div>
	{/if}

	<TransitionHandler>
		<slot/>
	</TransitionHandler>
</div>

<style lang="scss">
	.flexBox { // this fixes issues with the footer that I can't be fucked to fix.
		position: 	relative;

		z-index: 	1;
		width: 		100%;
		margin: 	0 0 auto 0;}

	.searchBarWrapper {
		margin: 10px auto 15px auto; }
</style>