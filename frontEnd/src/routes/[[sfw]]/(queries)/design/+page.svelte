<script>
    import { page } 	from "$app/stores";
    import { goto } 	from "$app/navigation";
    import { onMount } 	from "svelte";

    import Masonry 		from 'svelte-bricks';
    import Pagination 	from "$root/components/layout/pageLayout/dataPagination.svelte";

    import { dataSetStore, fullscreenGalleryStore, scrollIntoView } from "$lib/controllers/layoutControllers/pageSettings.js";
    import { queryFilter, searchTermBuilder } 						from "$lib/controllers/layoutControllers/searchController.js";

    import ArtworkCard 			from "$root/components/pageSpecific/queryPages/artworkCard.svelte";
    import ArtworkDescription 	from "$root/components/pageSpecific/queryPages/artworkDescription.svelte";

    export let
		data;
		data.designs =
			data.designs.map(a => ({ ...a,
				searchTerms: (
					searchTermBuilder.sfw(a) + searchTermBuilder.title(a) + searchTermBuilder.renderStyle(a) +
					searchTermBuilder.tags(a) + searchTermBuilder.authors(a) + searchTermBuilder.characters(a) +
					searchTermBuilder.commissions(a)).toLowerCase()}));

    let pagedData, filteredData = queryFilter(data.designs);

    const
		artworkSelect = async (gallery) => {
			setTimeout(async () => {
				if (!!$fullscreenGalleryStore.componentData) {
					$page.url.searchParams.set('gallery',gallery.slug);

					if ($fullscreenGalleryStore.currentImage > 0) {
						$page.url.searchParams.set('img',$fullscreenGalleryStore.currentImage);}

					await goto (`?${$page.url.searchParams.toString()}`,{noScroll: true});}
			}, 250);}

    onMount(() => {
        const
			initialSlug = 		$page.url.searchParams.get('gallery'),
        	initialImageId = 	Number($page.url.searchParams.get('img'));

        if (initialSlug) {
            let dataReOrg = structuredClone(data.designs).map(i => i.slug === initialSlug ? i : undefined).filter(n => n)[0],
            	style = 	dataReOrg.gallery.styleType,
                render = 	dataReOrg.gallery.renderType;

            dataReOrg.gallery = 			dataReOrg.gallery.images.flat();
            dataReOrg.gallery.styleType = 	style;
            dataReOrg.gallery.renderType = 	render;

            $fullscreenGalleryStore.componentUrl = 	ArtworkDescription;
            $fullscreenGalleryStore.componentData = dataReOrg;
            $fullscreenGalleryStore.currentImage = 	initialImageId;

            setTimeout(() => {
                scrollIntoView(`#${initialSlug}`)}, 250)
        }});
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
				<div class="designPost"
					 on:click={artworkSelect(item)}
					 id="{item.slug}">
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