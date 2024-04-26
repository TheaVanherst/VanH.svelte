<script>
    import { navigationControls } from "$lib/controllers/layoutControllers/redirectHandling.js";

    import WorkshopCard 	from "$root/components/pageSpecific/homePage/embedded/workshopCard.svelte";

	export let data;
</script>

<div class="workshopTable">
	{#each data.workshop as workshop}
		{#if $navigationControls.localNsfwCheck(workshop.NSFW)}
			<div class="workshopItem regularBorder">
				<WorkshopCard dataEntry={workshop}/>
<!--				<SanityImage image={workshop.previewImage}></SanityImage>-->
<!--				<div class="gameThumbnail profileIcon shortBorder">-->
<!--					<SanityImage image={workshop.gameLogo}></SanityImage>-->
<!--				</div>-->
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">
	.workshopTable {
		gap: 		15px;
		display: 	flex;
		flex-wrap: 	wrap;
		width: 		100%;
	}

	.workshopItem {
		position: 		relative;
		white-space: 	nowrap;
		display: 		flex;
		align-items: 	center;
		overflow: 		hidden;

		flex: 	1 1 auto;
		width: 	200px;
		margin: 0 auto;

		transition: transform .3s ease;

		.gameThumbnail {
			position: absolute;
			background: black;
			bottom: 0px;
			right: 	0px;
			margin: 5px;
		}
	}
</style>