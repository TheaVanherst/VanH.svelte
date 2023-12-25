<script>
    import NavigationComponent 	from "$root/components/layout/headerElements/navBar.svelte";
    import { navigationData, navigationControls, directoryData } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import TransitionHandler 	from "$lib/controllers/transitionHandler.svelte";
    import RedirectBuilder 		from "$root/components/generic/wrappers/redirectBuilder.svelte";

    import SanityImage 			from "$root/serializer/sanityImage.svelte";
    import RollupButton 		from "$root/components/generic/wrappers/buttons/rollupButton.svelte";
    import InlineTag 			from "$root/components/generic/wrappers/tags & Inline/tags/inlineGenreTag.svelte";

    import { dataSetStore } 	from "$lib/controllers/layoutControllers/pageSettings.js";
    import { urlSerializer } 	from "$lib/controllers/layoutControllers/searchController.js";

    import { page } 	from "$app/stores";
    import { onMount } 	from "svelte";
    import { slide } 	from "svelte/transition";
    import { afterNavigate, beforeNavigate } from "$app/navigation";

    const paramLocalUpdate = () => {
        value = $page.url.searchParams.get("query") || "";
        value = decodeURIComponent(value.replaceAll('-',' '))
        $dataSetStore.page = $page.url.searchParams.get("page") || 0;
        $dataSetStore.searchQuery = value;};
    const queryReset = () => {
        value = "";
        $dataSetStore.searchQuery = "";
        $dataSetStore.page = 		0;}

    export let data;

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
	let active = false;

    $: $navigationData.search === false ? active = false : false;
</script>

<div class="flexBox">
	{#if $navigationData.navigation || $navigationData.socials || $navigationData.logo }
		<div class="inlineWrapper" transition:slide>
			<NavigationComponent socials={data.socialMedia}/>
		</div>
	{/if}

	{#if $navigationData.search}
		<div class="searchBarWrapper" transition:slide>
			<div class="searchBar">
				<form on:submit|preventDefault={() => hardSearch(value, 0)}>
					<input type="search" class="input" placeholder="Search..." bind:value={value}/>
				</form>
				<RollupButton bind:active padding={8}/>
			</div>
		</div>
	{/if}

	{#if active && data.tags && $navigationData.search}
		<div class="tableGroup wideBorder" transition:slide>
			<h4>Characters</h4>
			<div class="characterInline">
				{#each data.characters as character, c}
					<div class="characterIcon">
						<RedirectBuilder url="{$directoryData.stripped}?query=:{character.nickName.toLowerCase().replaceAll(' ','-')}">
							<div class="profileIcon" class:active={value.includes(character.nickName.toLowerCase())}>
								<SanityImage image={character.charIcon}/>
							</div>
						</RedirectBuilder>
					</div>
				{/each}
			</div>
			{#each data.tags as tagSet, i}
				{#if !tagSet[1][1] && !$navigationControls.nsfw || $navigationControls.nsfw}
					<h4>{tagSet[0].replaceAll("Tags","").replaceAll("Tag","")} Tags</h4>
					<div class="tagGroup">
						{#each tagSet[1][0] as tag, e}
							<RedirectBuilder url="{$directoryData.stripped}?query={tag.title.toLowerCase().replaceAll(' ','-')}">
								<InlineTag tag={tag} active={value.includes(tag.title.toLowerCase())}/>
							</RedirectBuilder>
						{/each}
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	<TransitionHandler>
		<slot/>
	</TransitionHandler>
</div>

<style lang="scss">
	h4 {
		width: 100%;
		color: 	black;
		padding: 0 0 5px 0;}

	.flexBox { // this fixes issues with the footer that I can't be fucked to fix.
		position: 	relative;
		z-index: 	1;
		width: 		100%;
		margin: 	0 0 auto 0;}

	.searchBarWrapper {
		margin: 10px auto 0 auto;
		.searchBar {
			display: flex;
			margin: 0 auto;
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
		max-height: 200px;
		overflow: 	scroll;

		.tagGroup {
			padding: 		5px 5px;
			display: 		flex;
			flex-wrap: 		wrap;
			flex-direction: row;
			color: 			black;}}
</style>