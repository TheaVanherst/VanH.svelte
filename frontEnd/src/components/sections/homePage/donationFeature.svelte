<script>
    import { screenType } 	from '$lib/controllers/accessibilityController.js';

    import DonationCard from "$root/components/sections/generic/sectionListCard.svelte";

    import PersonalMessage from "$root/components/sections/homePage/personalMessage.svelte";

    export let donationData = undefined
</script>

<div class="table" class:mobile={$screenType === 1}>
	<div class="col">
		{#each donationData.global as global}
			<DonationCard data={global}/>
		{/each}
	</div>
	<div class="col">
		{#each donationData.perks as perkType}
			<a class="row" target="_blank" href="https://ko-fi.com/theavanherst">
				<DonationCard data={perkType}/>
			</a>
		{/each}
	</div>
</div>

<PersonalMessage/>

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
				display: 	flex;
				.card {
					display: 	inline;
					width: 		100%;}}}

		&.mobile {
			display: grid;
			.col {
				width: 100%;}}}
</style>