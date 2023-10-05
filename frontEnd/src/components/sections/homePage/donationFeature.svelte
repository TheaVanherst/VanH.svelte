<script>
    import { fly } from 'svelte/transition';
    import { screenType } 	from '$lib/controllers/pageControllers.js';

    import Container from "$root/components/generic/containers/container.svelte";
    import SectionListCard from "$root/components/generic/containers/sectionListCard.svelte";

    export let global, tiers, personal;
</script>

<div class="table" class:mobile={$screenType === 1}>
	<div class="col">
		<SectionListCard
			featured={true}
			image={global.bannerImage}>

			<div slot="title">
				<h5>{global.tierName}</h5>
				<p>{global.tierDesc}</p>
			</div>
			<ul>
				{#each global.tierPerks as bonus}
					<li>{bonus}</li>
				{/each}
			</ul>
		</SectionListCard>
	</div>
	<div class="col">
		{#each tiers as perkType}
			<a class="row" target="_blank" href="https://ko-fi.com/theavanherst">
				<SectionListCard image={perkType.bannerImage}>
					<div slot="title">
						<h5>{perkType.tierName}</h5>
						<p>{perkType.tierDesc}</p>
					</div>
					<ul>
						{#each perkType.tierPerks as bonus}
							<li>{bonus}</li>
						{/each}
					</ul>
				</SectionListCard>
			</a>
		{/each}
	</div>
</div>

<style lang="scss">

	.table, .messageTable {
		display: 	flex;}

	.table {
		width: 		100%;
		gap: 		12px;
		margin:	 	0 0 15px 0;

		.col {
			display: 	grid;
			gap: 		12px;
			width: 		50%;}

		&.mobile {
			display: grid;
			.col {
				width: 100%;}}}

	@keyframes float {
		0% {	transform: translatey(-20px);}
		50% {	transform: translatey( 20px);}
		100% {	transform: translatey(-20px);}}
</style>