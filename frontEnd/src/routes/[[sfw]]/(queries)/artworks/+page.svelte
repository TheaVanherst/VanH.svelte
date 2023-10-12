<script>
    import {onDestroy, onMount} from 'svelte';

    import Masonry 		from 'svelte-bricks';
    import ArtworkCard 	from "$root/components/sections/artworkPage/artworkCard.svelte";

    import { searchQuery, searchHandler, urlSerializer } from "$lib/controllers/searchController.js";

    export let data;

    data.artworks = data.artworks.map(artwork => ({
        ...artwork,
        searchTerms:
            (artwork.nsfw ? `nsfw ` : `notsfw `) +
			`${artwork.pieceName} ${artwork.slug} ` +
			`${artwork.gallery.renderType} ${artwork.gallery.styleType} ` +
            (!!artwork.authors ? artwork.authors.map(artist => `${artist.fullName} ${artist.handle} ${artist.slug} `) : '') +
            (!!artwork.characters ? artwork.characters?.map(character => `${character.fullName} ${character.nickName } `) : '') +
            (!!artwork.commissionData ?
                `${artwork.commissionData?.commissionType} ` +
                artwork.commissionData?.characters?.map(character => `${character.fullName} ${character.owner.handle} `) : '')
    }));

    const search = searchQuery(data.artworks);
    const unsubscribe = search.subscribe((model) => searchHandler(model));

    onDestroy(() => {unsubscribe();});
    onMount(() => {$search.search = window.location.search.substring(3).replaceAll('-',' ');});
</script>

<div class="center wrapper">
	<div class="searchBar">
		<form on:submit|preventDefault={() => urlSerializer($search.search)}>
			<input type="search" class="input wideBorder" placeholder="Search..." bind:value={$search.search}/>
		</form>
	</div>

	{#if $search.filtered}
		<Masonry
			items=	{$search.filtered}
			gap=	{10}
			idKey=	{`slug`}
			animate= {false}
			let:item>
				<div class="artPost">
					<ArtworkCard postData={item}/>
				</div>
		</Masonry>
	{/if}
</div>

<div class="center endOfContent wideBorder">
	<p>That's all she wrote!</p>
</div>


<style lang="scss">
	.center {
		margin: 	0 auto 15px auto;}

	#characterSelect {
		display: flex;
		gap: 10px;}

	.wrapper {
		width: 100%;
		.artPost {
			display: 	flex;}}

	.endOfContent {
		padding: 	7px 30px;
		width: 		max-content;
		background: var(--TransBlack);
		border:	 	1px solid var(--accent2);}

	.searchBar {
		margin: 0 auto 15px auto;
		max-width: max-content;

		.input {
			padding: 	10px 15px;
			min-width: 	50%;
			max-width: 	100%;
			width: 		500px;
			border: 1px solid var(--accent2);
			outline: none;
			background: var(--TransBlack);
			font-family: "Playfair Display", serif;
			color: var(--accent9);
			font-weight: 700;
		}
	}
</style>