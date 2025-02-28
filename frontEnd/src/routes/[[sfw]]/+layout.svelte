<script>
    import { slide } 			from "svelte/transition";

    import { page } 			from "$app/stores";
    import { onMount } 			from "svelte";
    import { afterNavigate, beforeNavigate }
								from "$app/navigation";

    import { dataSetStore } 	from "$lib/settings/pageSettings.js";
    import { urlSerializer } 	from "$lib/controllers/searchController.js";
    import {navigationData, navigationControls, navigationDirectories, directoryStatus}
        						from "$lib/settings/navigationHandling.js";

    import TransitionHandler 	from "$lib/controllers/transitionHandler.svelte";
   	import NavBar 				from "$root/components/layout/coreLayoutComponents/headerElements/navBar.svelte";
	import InlineGenreTag 		from "$root/components/generic/wrappers/tags/inlineGenreTag.svelte";

    export let data;

    let container;
    let inputValue,
        searchVisibility = false;

    const handleClickOutside = (event) => {
        searchVisibility = !(!!container && !container.contains(event.target));}

    onMount(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);};});
    afterNavigate((e) => {
        if ($navigationData.search && data?.tags){
            paramFilterUpdate();
            paramLocalUpdate();}
        if (e.delta || e.type === "enter") {
            $navigationControls.transitioning = true;
            setTimeout(() => { // this allows the pagination to update
                $navigationControls.transitioning = false;},300);}});
    beforeNavigate((e) => {
        if (e.from.route.id !== e?.to?.route?.id) {
            queryReset();}});

    let nsfwBlacklist = ["nsfwTags", "explicitTags"];
	let filteredTagStore = [],
        filteredList = [],
        filteredWord = "";

    const
		paramFilterUpdate = () => {
            filteredTagStore = structuredClone(data.tags).map(e=>e.tags).flat();
            filteredTagStore = filteredTagStore.filter(i=>navigationDirectories[$directoryStatus.rootIndex[0]]?.pages?.[$directoryStatus.rootIndex[1]]?.queryTypes.includes(i.type))
            filteredTagStore = !$navigationControls.nsfw ? filteredTagStore.filter(i=> !nsfwBlacklist.includes(i.type)) : filteredTagStore;},
		paramLocalUpdate = () => {
			inputValue = $page.url.searchParams.get("query") || "";
			inputValue = decodeURIComponent(inputValue.replaceAll('-',' '))
			$dataSetStore.page = $page.url.searchParams.get("page") || 0;
			$dataSetStore.searchQuery = inputValue;},
    	queryReset = () => {
			inputValue = "";
			$dataSetStore.searchQuery = "";
			$dataSetStore.page = 		0;}

    const
		hardSearch = (query = "", page = 0) => {
            $navigationControls.transitioning = true;
			window.scrollTo({ top: 0, behavior: 'smooth' });
			setTimeout(() => { // this allows the pagination to update
				$dataSetStore.searchQuery = query;
				$dataSetStore.page = 		page;
				urlSerializer({
					'query': $dataSetStore.searchQuery,
					'page': $dataSetStore.page});}, 300);
			setTimeout(() => { // this allows the pagination to update
				$navigationControls.transitioning = false;}, 300);},

    	// constructs a search param from tag data.
    	queryBuilder = (e => {
            inputValue = inputValue.slice(0, -filteredWord.length)
			e = e.toLowerCase() // forces the query to be in lowercase by the new element also being lowercase.
			hardSearch((inputValue.includes(e) ? inputValue.replaceAll(`${e}`, '') : inputValue + ` ${e}`).split(" ").filter(n => n).join("-"))});

    $:	if (!inputValue) {
        	filteredList = [];}
		else {
			searchVisibility = true;
            if (filteredTagStore.length > 0) {
                filteredWord = inputValue.split(" ").pop();
                filteredList = filteredTagStore.filter(e =>
                    e?.title.toLowerCase().includes(filteredWord) ||
                    e.relatedTags?.toLowerCase().includes(filteredWord));
                filteredList.length === 1 && filteredWord === filteredList[0]?.title.toLowerCase() ?
					filteredList = [] : filteredList;}}
</script>

{#if $navigationData.navigation || $navigationData.socials || $navigationData.logo}
	<div class="inlineWrapper" transition:slide>
		<NavBar socials={data.socialMedia}/></div>
{/if}

{#if $navigationData.search}
<!--	Search bar & character buttons-->
	<div class="searchBarWrapper" in:slide={{delay: 125}} out:slide={{delay: 175}}>
		<div id="hoverWrapper"
			 	bind:this={container}
			 	on:mouseclick={() => searchVisibility = true}>
			<div class="searchBar">
				<form on:submit|preventDefault={() => hardSearch(inputValue, 0)}>
					<input type="search" class="input" placeholder="Search..." bind:value={inputValue}/></form>
			</div>
			{#if filteredList.length > 0 && filteredWord.length > 0 && searchVisibility}
				<div id="autocompleteWrapper">
					<div id="autocomplete">
						<h5 class="title">Suggested Terms;</h5> <br>
						{#each filteredList.slice(0, 16) as tag}
							<div class="dropDownItem clickable" on:click={() => queryBuilder(tag.title)}>
								{#key tag}
									<InlineGenreTag tag={tag} inv={true}/>
								{/key}
							</div>
						{/each}
						{#if filteredList.length === 0}
							<div class="dropDownItem readMore">
								<p>No search terms found.</p>
							</div>
						{/if}
					</div>
				</div>
			{/if}
		</div>
	</div>
{/if}

<TransitionHandler>
	<slot/>
</TransitionHandler>

<style lang="scss">
	.searchBarWrapper {
		margin: 	10px auto 0 auto;
		.searchBar {
			display: 	flex;
			form {
				display: contents;}}}

	#autocompleteWrapper {
		position: 	absolute;
		z-index: 	100;
		width: 		100%;}

	#autocomplete {
		width: 		100%;
		max-width: 	620px;
		box-sizing: border-box;

		display: 	flex;
		flex-wrap: 	wrap;
		justify-content: 	center;
		align-items: 		start;

		gap:	 	0 2px;
		padding: 	6px;
		margin: 	10px auto;

		border-radius:  12px;
		background: 	var(--transPure1);

		.title {
			color: black;
			padding: 2px 5px 10px 5px;
			width: 100%;}

		.dropDownItem {
			&.readMore {
				background: var(--dark1);}}}
</style>