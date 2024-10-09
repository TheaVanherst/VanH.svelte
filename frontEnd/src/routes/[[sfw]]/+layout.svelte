<script>
    import { slide } 			from "svelte/transition";

    import { page } 	from "$app/stores";
    import { onMount } 	from "svelte";
    import { afterNavigate, beforeNavigate } from "$app/navigation";

    import { dataSetStore } 	from "$lib/controllers/layoutControllers/pageSettings.js";
    import { urlSerializer } 	from "$lib/controllers/layoutControllers/searchController.js";
    import { navigationData, navigationControls, directoryStatus, navigationDirectories } from "$lib/controllers/layoutControllers/navigationHandling.js";

    import TransitionHandler 	from "$lib/controllers/layoutControllers/transitionHandler.svelte";
   	import NavigationComponent 	from "$root/components/layout/headerElements/navBar.svelte";

    import SanityImage 			from "$root/serializer/sanityImage.svelte";
    import RollupButton 		from "$root/components/generic/wrappers/buttons/rollupButton.svelte";
    import InlineTag 			from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";

    const
		paramLocalUpdate = () => {
			value = $page.url.searchParams.get("query") || "";
			value = decodeURIComponent(value.replaceAll('-',' '))
			$dataSetStore.page = $page.url.searchParams.get("page") || 0;
			$dataSetStore.searchQuery = value;},
    	queryReset = () => {
			value = "";
			$dataSetStore.searchQuery = "";
			$dataSetStore.page = 		0;}

    onMount(() => {
        if ($navigationData.search){
            paramLocalUpdate();}});
    afterNavigate((e) => {
        if ($navigationData.search){
            paramLocalUpdate();}
        if (e.delta || e.type === "enter") {
            $navigationControls.transitioning = true;
            setTimeout(() => { // this allows the pagination to update
                $navigationControls.transitioning = false;},300);}});
    beforeNavigate((e) => {
        if (e.from.route.id !== e?.to?.route?.id) {
            queryReset();}});

    export let data;

    // search functionality
    let value,
		active = false;

    // generic search.
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
			e = e.toLowerCase() // forces the query to be in lowercase by the new element also being lowercase.
			hardSearch((value.includes(e) ? value.replaceAll(`${e}`, '') : value + ` ${e}`).split(" ").filter(n => n).join("-"))});

    $: $navigationData.search === false ? active = false : false;
</script>

{#if $navigationData.navigation || $navigationData.socials || $navigationData.logo}
	<div class="inlineWrapper" transition:slide>
		<NavigationComponent socials={data.socialMedia}/></div>
{/if}

{#if $navigationData.search}
<!--	Search bar & character buttons-->
	<div class="searchBarWrapper" in:slide={{delay: 125}} out:slide={{delay: 175}}>
		<div class="searchBar">
			<form on:submit|preventDefault={() => hardSearch(value, 0)}>
				<input type="search" class="input" placeholder="Search..." bind:value={value}/></form>
			<RollupButton bind:active padding={3}/></div></div>
{/if}

{#if active && data.tags && $navigationData.search}
	<div class="tableGroup wideBorder" transition:slide>

		{#if navigationDirectories[$directoryStatus.rootIndex[0]]?.pages?.[$directoryStatus.rootIndex[1]].characters}
			<h4>Characters</h4>
			<div class="characterInline">
				{#each data.characters as character, c}
					<div class="characterIcon">
						<div on:mousedown={() => queryBuilder(":" + character.nickName)}>
							<div class="profileIcon rounded" class:active={value.includes(character.nickName.toLowerCase())}>
								<SanityImage image={character.charIcon}/></div></div></div>
				{/each}
			</div>
		{/if}

		{#each data.tags as tagSet}
			{#if !tagSet.nsfw && !$navigationControls.nsfw || $navigationControls.nsfw}
				{#if navigationDirectories[$directoryStatus.rootIndex[0]]?.pages?.[$directoryStatus.rootIndex[1]]?.queryTypes?.includes(tagSet.category) || $directoryStatus.rootIndex[1] === undefined}
					<div transition:slide>
						<h4>{tagSet.category} Tags</h4>
						<div class="tagGroup">
							{#each tagSet.tags as tag, e}
								<div on:mousedown={() => queryBuilder(tag.title)}>
									<InlineTag tag={tag} active={value.includes(tag.title.toLowerCase())}/></div>
							{/each}
						</div></div>
				{/if}
			{/if}
		{/each}
	</div>
{/if}

<TransitionHandler>
	<slot/>
</TransitionHandler>

<style lang="scss">
	h4 {
		width: 100%;
		color: 	black;
		padding: 0 0 5px 0;}

	.searchBarWrapper {
		margin: 	10px auto 0 auto;
		.searchBar {
			display: 	flex;
			gap: 		10px;
			margin: 	0 auto;
			padding: 	0 0 0 10px;
			form {
				display: contents;}}}

	.characterInline {
		display: 	inline-block;
		margin: 	5px 0 3px 5px;
		.characterIcon {
			display: 	inline-block;
			margin: 	0 5px 5px 0;
			.profileIcon {
					transition: opacity .2s ease, border .3s ease;
					background: transparent;
					border: 	1px solid white;
					opacity: 	0.6;
				&.active {
					border: 	1px solid var(--accent9);
					opacity: 	1;}
				&:hover {
					opacity: 	1;}}}}

	.tableGroup {
		background: var(--TransWhite);
		padding: 	15px;
		margin: 	15px 0 0 0;
		max-height: 300px;
		overflow: 	scroll;

		.tagGroup {
			padding: 		5px 5px;
			display: 		flex;
			flex-wrap: 		wrap;
			flex-direction: row;
			color: 			black;}}
</style>