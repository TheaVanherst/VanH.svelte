<script>
	import { fly } from "svelte/transition";

    import SanityImage from "$lib/serializer/sanityImage.svelte";
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

		<div class="workshopPreview regularBorder imageWrapper">
			<div class="regularBorder thumbnail">
				<SanityImage image={dataEntry.previewImage}/>
			</div>

			{#if hover}
				<div class="transWrap shortBorder" transition:fly={{y:-50}}>
					<div class="desc">
						<div class="gameIcon">
							<SanityImage image={dataEntry.gameLogo}/></div>
						<div>
							<p>{dataEntry.shortDesc}</p>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</a>

<style lang="scss">
	@import "../../../commonStyles";

	.workshopItem {
		overflow: 	hidden;}

	.gameIcon {
		min-width: 	24px;
		height: 	24px;
		margin: 	auto -3px auto 8px;}

	.workshopPreview {
		margin-bottom: 27px;
		.regularBorder, .shortBorder {
			overflow: hidden;}}

	.transWrap {
		position: 	absolute;
		bottom: 	0;
		margin: 	5px;

		.desc {
			background: white;
			overflow: 	hidden;
			display: flex;

			p {
				color: black;
				@include shortForm(2);}}}
</style>