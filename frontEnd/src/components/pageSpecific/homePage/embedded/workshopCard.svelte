<script>
    import SanityImage from "$root/serializer/sanityImage.svelte";
    import FlyInCard from "$root/components/generic/containers/imageContainers/showcaseFlyIn.svelte";

	export let dataEntry

    let active = false;
</script>

<a href="https://steamcommunity.com/sharedfiles/filedetails/?id={dataEntry.url}" target="_blank">
	<div class="workshopItem regularBorder"
		 class:hovered={active}
		 on:mouseenter={() => active=true}
		 on:mouseleave={() => active=false}>

		<div class="workshopPreview regularBorder">
			<div class="regularBorder imageWrapper">
				<SanityImage image={dataEntry.previewImage}/>
			</div>
			<FlyInCard {active}>
				<h5 slot="title"> {dataEntry.itemName} </h5>
				<div slot="icon">
					<SanityImage image={dataEntry.gameLogo}/>
				</div>
				<span slot="desc">{dataEntry.shortDesc}</span>
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