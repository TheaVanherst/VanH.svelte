<script>
    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/pageLayout/dataPagination.svelte";

    import { dataSetStore } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter } 	from "$lib/controllers/layoutControllers/searchController.js";

    import ArtworkCard from "$root/components/pageSpecific/queryPages/artworkCard.svelte";
    import {navigationControls} from "$lib/controllers/layoutControllers/redirectHandling.js";

    export let data;

    let pagedData;

    data.designs =
		data.designs.map(artwork => ({
			...artwork,
			searchTerms: (
                (artwork.sfw ? `!!sfw `: `!!nsfw `) +
				`${artwork.pieceName.replaceAll(" ","_")} ${artwork.slug} ` +
				`${artwork.gallery.renderType} ${artwork.gallery.styleType} ` +
                (!!artwork.tags ? `${artwork.tags.map(i => `${i.title}${(!!i?.relatedTags ? ` ${i.relatedTags}` : '')} `).join('')}` : '') +
                (!!artwork.authors ? artwork.authors.map(artist => `${artist.author.fullName} @${artist.author.handle}`).join('') : '') +
                (!!artwork.characters ? artwork.characters?.map(character => `:${character.fullName} :${character.nickName} `).join('') : '') +
                (!!artwork.commissionData ?
                    `${artwork.commissionData?.commissionType} commission commissioned` +
                    artwork.commissionData?.characters?.map(character => `${character.fullName} ${character.owner.handle} `).join('') : '')
			).toLowerCase()}));

    let filteredData = queryFilter(data.designs, $navigationControls.nsfw);
    $: $dataSetStore.searchQuery && (filteredData = $dataSetStore.searchQuery === "" ? data.designs : queryFilter(data.designs, true));
</script>

{#if data.designs && data.designs.length > 0}
	<div class="center">
		{#if pagedData}
			<Masonry
					items=	{pagedData}
					gap=	{10}
					idKey=	{`slug`}
					animate= {false}
					let:item>
				<div class="designPost">
					<ArtworkCard data={item}/>
				</div>
			</Masonry>
		{/if}
		{#if filteredData}
			<Pagination
					rows={filteredData} perPage={15}
					goto={$dataSetStore.page}
					bind:currentPage={$dataSetStore.page}
					bind:trimmedRows={pagedData}/>
		{/if}
	</div>
{/if}

<style lang="scss">
	.center {
		width: 	 100%;
		margin:  0 auto 15px auto;
		display: grid;
		gap: 	 15px;
	}
</style>