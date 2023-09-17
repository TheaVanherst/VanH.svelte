<script>
    import SanityImage from "$lib/serializer/sanityImage.svelte";
    import FlyInCard from "$root/components/sections/Embedded/flyInCard.svelte";

	export let dataEntry

    let hover = false;
</script>

<a href="https://steamcommunity.com/sharedfiles/filedetails/?id={dataEntry.url}" target="_blank">
	<div class="workshopItem regularBorder"
		 class:hovered={hover}
		 on:mouseenter={() => hover=true} on:mouseleave={() => hover=false}>

		<div class="workshopPreview regularBorder">
			<div class="regularBorder">
				<SanityImage image={dataEntry.previewImage}/>
			</div>

			<FlyInCard icon={dataEntry.gameLogo} title={dataEntry.itemName} desc={dataEntry.shortDesc} hover={hover}/>
		</div>
	</div>
</a>

<style lang="scss">
	.workshopItem {
		overflow: 	hidden;
		.workshopPreview {
			position: 	relative;
			overflow: 	hidden;
			margin-bottom: 27px;
			.regularBorder {
				overflow: hidden;}}}
</style>