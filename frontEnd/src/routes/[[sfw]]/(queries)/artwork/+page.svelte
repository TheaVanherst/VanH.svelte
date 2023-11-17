<script>
    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/pageLayout/dataPagination.svelte";

    import { dataSetStore } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter } 	from "$lib/controllers/layoutControllers/searchController.js";

    import ArtworkCard from "$root/components/pageSpecific/queryPages/artworkCard.svelte";

    export let data;

    let filteredData = data.artworks;
    let pagedData;

    data.artworks =
		data.artworks.map(artwork => ({
			...artwork,
			searchTerms: (
				(artwork.sfw ? `!nsfw `: `nsfw `) +
				`${artwork.pieceName.replaceAll(" ","_")} ${artwork.slug} ` +
				`${artwork.gallery.renderType} ${artwork.gallery.styleType} ` +
				(!!artwork.tags ? `${artwork.tags.map(i => `${i.title}${(!!i?.relatedTags ? ` ${i.relatedTags}` : '')} `).join('')}` : '') +
				(!!artwork.authors ? artwork.authors.map(artist => `${artist.author.fullName} @${artist.author.handle}`).join('') : '') +
				(!!artwork.characters ? artwork.characters?.map(character => `:${character.fullName} :${character.nickName} `).join('') : '') +
				(!!artwork.commissionData ?
					`${artwork.commissionData?.commissionType} ` +
					artwork.commissionData?.characters?.map(character => `:${character.fullName} @${character.owner.handle} `).join('') : '')
			).toLowerCase()}));

    $: $dataSetStore.searchQuery && (filteredData = $dataSetStore.searchQuery === "" ? data.artworks : queryFilter(data.artworks, true));
</script>

<div class="center">
	{#if pagedData}
		<Masonry
				items=	{pagedData}
				gap=	{10}
				idKey=	{`slug`}
				animate= {false}
				let:item>
			<div class="artPost">
				<ArtworkCard data={item}/>
			</div>
		</Masonry>
	{/if}
	{#if filteredData}
		<Pagination
				rows={filteredData} perPage={10}
				goto={$dataSetStore.page}
				bind:currentPage={$dataSetStore.page}
				bind:trimmedRows={pagedData}/>
	{/if}
</div>

<style lang="scss">
	.center {
		width: 	 100%;
		margin:  0 auto 15px auto;
		display: grid;
		gap: 	 15px;
	}
</style>