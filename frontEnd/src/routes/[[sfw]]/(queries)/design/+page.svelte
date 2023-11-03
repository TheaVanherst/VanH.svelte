<script>
    import { onDestroy, onMount } from 'svelte';
    import { page } from "$app/stores";

    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/generic/controllers/pagination.svelte";

    import ArtworkCard 	from "$root/components/generic/containers/artworkCard.svelte";

    import { searchQuery, searchHandler, urlSerializer } from "$lib/controllers/searchController.js";
    import { transitioning } from "$lib/controllers/pageControllers.js";

    export let data;

    data.design = data.design.map(artwork => ({
        ...artwork,
        searchTerms: (
			`${artwork.pieceName} ${artwork.slug} ` +
			`${artwork.gallery.renderType} ${artwork.gallery.styleType} ` +
            `${artwork.gallery.images.map(i => i.desc).join(' ')} ` +
            (!!artwork.authors ? artwork.authors.map(artist => `${artist.author.fullName} ${artist.author.handle} ${artist.author.slug} `) : '').join(' ')
    	).toLowerCase()
    }));

    const search = searchQuery(data.design);
    const unsubscribe = search.subscribe((model) => searchHandler(model));

    onDestroy(() => { unsubscribe(); });
    onMount(() => {
        data.page = $page.url.searchParams.get("page") || 0;
        data.search = $page.url.searchParams.get("query") || undefined;
        if (data.search) {
            value = data.search.replaceAll('-',' ');
            value = decodeURIComponent(value);
            $search.search = value;
        } // initializes search filter
    });

    let pagedData, finalPage;

    let hardSearch = (query = "", page = 0) => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        setTimeout(() => {
            $search.search = query;
            data.page = page;
        }, 200);

        $transitioning = true;
        setTimeout(() => { // this allows the pagination to update
            urlSerializer({'query': $search?.search, 'page': data?.page});
        }, 300);
        setTimeout(() => { // this allows the pagination to update
            $transitioning = false;
        }, 300);
    };

    let value;
</script>

<div class="center wrapper">
	<div class="searchBar">
		<form on:submit|preventDefault={() => hardSearch(value, 0)}>
			<input type="search" class="input" placeholder="Search..." bind:value={value}/>
		</form>
	</div>

	{#if $search.filtered && pagedData}
		<Masonry
				items=	{pagedData}
				gap=	{10}
				idKey=	{`slug`}
				animate= {false}
				let:item>
			<div class="designPost">
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
		perPage={10}
		goto={data?.page}
		bind:currentPage={data.page}
		bind:trimmedRows={pagedData}
		bind:lastPage={finalPage}/>
</div>

<style lang="scss">
	.center {
		margin: 0 auto 15px auto;}

	.wrapper {
		width:	100%;
		.designPost {
			display: 	flex;}}

	.endOfContent {
		padding: 	7px 30px;
		width: 		max-content;

		p {
			color:		var(--accent9);}
		background: var(--TransBlack);
		border:	 	1px solid var(--accent2);}
</style>