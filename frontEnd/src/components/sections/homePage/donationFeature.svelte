<script>
    import { screenType } 	from '$lib/controllers/accessibilityController.js';

    import SectionListCard from "$root/components/sections/generic/sectionListCard.svelte";

    import PersonalMessage from "$root/components/sections/homePage/personalMessage.svelte";

    export let global = undefined, tiers = undefined, personal = undefined;
</script>

<div class="table" class:mobile={$screenType === 1}>
	<div class="col">
		<SectionListCard
            featured={true}
            title={global.tierName} description={global.tierDesc}
            list={global.tierPerks} banner={global.bannerImage}/>
	</div>
	<div class="col">
		{#each tiers as perkType}
			<a class="row" target="_blank" href="https://ko-fi.com/theavanherst">
				<SectionListCard
					title={perkType.tierName} description={perkType.tierDesc}
					list={perkType.tierPerks} banner={perkType.bannerImage}/>
			</a>
		{/each}
	</div>
</div>

<PersonalMessage message={personal}/>

<style lang="scss">
	.table {
		display: 	flex;
		width: 		100%;
		gap: 		15px;
		margin:	 	0 0 15px 0;

		.col {
			display: 	grid;
			gap: 		15px;
			width: 		50%;
			.row {
				display: 	flex;}}

		&.mobile {
			display: grid;
			.col {
				width: 100%;}}}
</style>