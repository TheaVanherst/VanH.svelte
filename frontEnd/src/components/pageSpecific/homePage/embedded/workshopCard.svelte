<script>
    import SanityImage from "$root/serializer/sanityImage.svelte";

    import FlyInCard from "$root/components/generic/containers/textContainers/blankFlyIn.svelte";

	export let
		dataEntry,
		clickable = true

    let active = false;
</script>

{#if clickable}
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
						<div class="shortBorder imageWrapper">
							<SanityImage image={dataEntry.gameLogo}/>
						</div>
					</div>
					<span slot="desc">{dataEntry.shortDesc}</span>
				</FlyInCard>
			</div>
		</div>
	</a>
{:else}
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
					<div class="shortBorder imageWrapper">
						<SanityImage image={dataEntry.gameLogo}/>
					</div>
				</div>
				<span slot="desc">{dataEntry.shortDesc}</span>
			</FlyInCard>
		</div>
	</div>
{/if}

<style lang="scss">
	.workshopItem {
		overflow: 	hidden;
		.workshopPreview {
			position: 	relative;
			overflow: 	hidden;
			.regularBorder {
				overflow: hidden;}}}
</style>