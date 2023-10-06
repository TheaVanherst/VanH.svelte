<script>
    import ArtworkCard from "$root/components/sections/artworkPage/artworkCard.svelte";
    import Masonry from 'svelte-bricks';
    import { onDestroy } from 'svelte';

    import {searchQuery, searchHandler} from "$lib/controllers/searchController.js";

    export let data;
    const searchProducts = data.artworks.map(artwork => ({
        ...artwork,
        searchTerms: `${artwork.pieceName} ${artwork.slug.current} ${artwork.gallery.renderType} ${artwork.gallery.styleType} ${artwork.characters?.map(character => `${character.fullName} ${character.nickName}`)} ${artwork.commissionData?.artType?.TypeName} ${artwork.commissionData?.characters?.map(character => `${character.fullName} ${character.owner.handle}`)}`
    }))

    const search = searchQuery(searchProducts);
    const unsubscribe = search.subscribe((model) => searchHandler(model));

    onDestroy(() => {unsubscribe();});
</script>

<div class="center wrapper">
	<div class="searchBar">
		<input type="search" class="input wideBorder" placeholder="Search..." bind:value={$search.search} />
	</div>

	{#if $search.filtered}
		<Masonry
				items=	{$search.filtered}
				gap=	{10}
				idKey=	{`_id`}

				animate=		{false}
				columnClass=	"flex"
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
			background: black;
			font-family: "Playfair Display", serif;
			color: var(--accent9);
			font-weight: 700;
		}
	}
</style>