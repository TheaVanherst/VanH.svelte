<script>
    import { onMount } 	from 'svelte';

    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/generic/controllers/pagination.svelte";

    import { dataSetStore } from "$lib/pageSettings/pageSettings.js";
    import { queryFilter } 	from "$lib/controllers/searchController.js";

    import ArtworkCard 	from "$root/components/generic/containers/artworkCard.svelte";

    export let data;
    let filteredData = [];

    data.designs =
		data.designs.map(artwork => ({
			...artwork,
			searchTerms: (
				`${artwork.pieceName.replaceAll(" ","_")} ${artwork.slug} ` +
				`${artwork.gallery.renderType} ${artwork.gallery.styleType} ` +
				`${artwork.gallery.images.map(i => i.desc).join(' ')} ` +
                (!!artwork.tags ? `${artwork.tags.map(i => `${i.title} `).join('')} ` : '') +
                (!!artwork.authors ? artwork.authors.map(artist => `${artist.author.fullName} ${artist.author.handle} ${artist.author.slug} `).join('') : '') +
                (!!artwork.characters ? artwork.characters?.map(character => `${character.fullName} ${character.nickName} `).join('') : '') +
                (!!artwork.commissionData ?
                    `${artwork.commissionData?.commissionType} ` +
                    artwork.commissionData?.characters?.map(character => `${character.fullName} ${character.owner.handle} `).join('') : '')
			).toLowerCase()}));

    onMount(() => {
        filteredData = queryFilter(data.designs);});

    let pagedData;
</script>

<div class="center">
	{#if pagedData}
		<div>
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
		</div>
	{/if}
	{#if filteredData}
		<div>
			<Pagination
				rows={filteredData} perPage={15}
				goto={$dataSetStore.page}
				bind:currentPage={$dataSetStore.page}
				bind:trimmedRows={pagedData}/>
		</div>
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