<script>
    import {fullscreenGalleryStore, galleryStore} from "$lib/settings/pageSettings.js";

    import SanityImage from "$root/serializer/sanityImage.svelte";
    import FlyInCard from "$root/components/generic/containers/textContainers/blankFlyIn.svelte";

    import WorkshopCard from "$root/components/pageSpecific/queryPages/workshop/workshopCard.svelte";
    import {page} from "$app/stores";
    import {goto} from "$app/navigation";

	export let
        data,
		clickable = true

    let active = false;

    const
		onclick = () => {
            setTimeout(async () => {
                if (!!$fullscreenGalleryStore.componentData) {
                    $page.url.searchParams.set('mod',data.slug);
                    await goto (`?${$page.url.searchParams.toString()}`,{noScroll: true});}}, 250);
            galleryStore(WorkshopCard,data);},
		hovered = () => {
        	active = true;},
		unhovered = () => {
        	active = false;}
</script>

<a href="https://steamcommunity.com/sharedfiles/filedetails/?id={data.url}" target="_blank">
	<div class="workshopItem regularBorder"
		 id={data.slug}
		 class:hovered={active}

		 on:mouseenter={hovered}
		 on:mouseleave={unhovered}>

		<div class="workshopPreview regularBorder">
			<div class="regularBorder imageWrapper">
				<SanityImage image={data.previewImage}/>
			</div>
			<FlyInCard {active}>
				<h5 slot="title"> {data.itemName} </h5>
				<div slot="icon">
					<div class="shortBorder imageWrapper">
						<SanityImage image={data.gameLogo}/>
					</div>
				</div>
				<span slot="desc">{data.shortDesc}</span>
			</FlyInCard>
		</div>
	</div>
</a>

<style lang="scss">
	.workshopItem {
		overflow: 	hidden;
		.workshopPreview {
			position: 	relative;
			overflow: 	hidden;
			.regularBorder {
				overflow: hidden;}}}
</style>