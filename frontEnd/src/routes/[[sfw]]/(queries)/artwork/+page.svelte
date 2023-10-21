<script>
    import {onDestroy, onMount} from 'svelte';

    import Masonry 		from 'svelte-bricks';
    import ArtworkCard 	from "$root/components/sections/artworkPage/artworkCard.svelte";
    import Pagination from "$root/components/generic/controllers/pagination.svelte";

    import { searchQuery, searchHandler, urlSerializer } from "$lib/controllers/searchController.js";

    export let data;

    data.artworks = data.artworks.map(artwork => ({
        ...artwork,
        searchTerms:
            (artwork.nsfw ? `nsfw ` : `notsfw `) +
			`${artwork.pieceName} ${artwork.slug} ` +
			`${artwork.gallery.renderType} ${artwork.gallery.styleType} ` +
            `${artwork.gallery.images.map(i => i.desc).join(' ')} ` +
            (!!artwork.authors ? artwork.authors.map(artist => `${artist.fullName} ${artist.handle} ${artist.slug} `) : '') +
            (!!artwork.characters ? artwork.characters?.map(character => `${character.fullName} ${character.nickName } `) : '') +
            (!!artwork.commissionData ?
                `${artwork.commissionData?.commissionType} ` +
                artwork.commissionData?.characters?.map(character => `${character.fullName} ${character.owner.handle} `) : '')
    }));

    const search = searchQuery(data?.artworks);
    const unsubscribe = search.subscribe((model) => searchHandler(model));

    onDestroy(() => {unsubscribe();});
    onMount(() => {
        if (data.search) {
            $search.search = data.search.replaceAll('-',' ');}});

    let pagedData, finalPage, pageNo;
</script>

<div class="center wrapper">
	<div class="searchBar">
		<form on:submit|preventDefault={() => urlSerializer({'query': $search.search})}>
			<input type="search" class="input wideBorder" placeholder="Search..." bind:value={$search.search}/>
		</form>
	</div>

	{#if $search.filtered && pagedData}
		<Masonry
				items=	{pagedData}
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

{#if finalPage}
	<div class="center endOfContent wideBorder">
		<p>That's all she wrote!</p>
	</div>
{/if}

<div class="center wrapper">
	<Pagination
		rows={$search.filtered}
		perPage={12}
		goto={data?.page}
		bind:currentPage={pageNo}
		bind:trimmedRows={pagedData}
		bind:lastPage={finalPage}/>
</div>

<style lang="scss">
	.center {
		margin: 0 auto 15px auto;}

	.wrapper {
		width: 	100%;
		.artPost {
			display: 	flex;}}

	.endOfContent {
		padding: 	7px 30px;
		width: 		max-content;
		background: var(--TransBlack);
		border:	 	1px solid var(--accent2);}
</style>