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
		<h4 class="titleH4">
			{dataEntry.itemName}
		</h4>

		<div class="workshopPreview regularBorder">
			<div class="regularBorder">
				<SanityImage image={dataEntry.previewImage}/>
			</div>

			<FlyInCard icon={dataEntry.gameLogo} desc={dataEntry.shortDesc} hover={hover}/>
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
			.regularBorder, .shortBorder {
				overflow: hidden;}}}
</style>