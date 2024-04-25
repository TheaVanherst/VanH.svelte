<script>
    import KofiCards 		from "$root/components/pageSpecific/homePage/kofiCards.svelte";

	export let data;
</script>

<KofiCards tiers={data.donationData.tiers}/>

<div class="table wideBorder">
	<h2 class="tableTitle"> Compare tiers & features </h2>

	{#each data.donationData.tierData as row, i}
		{#if row[1] === "titleGap" || i === 0}
			<div class="subsection">
				{#each data.donationData.tierData[0] as title, e}
					{#if e === 0}
						<div class="cell categoryTitle">
							<h5>
								{row[0]}
							</h5>
						</div>
					{:else if i === 0}
						<div class="cell membershipTier">
							<h5>
								{title}
							</h5>
						</div>
					{/if}
				{/each}
			</div>
		{:else}
			<div class="row">
				{#each row as coloumn, e}
					<div class="cell">
						{#if coloumn === "true"}
							<div class="checkWrapper">
								<img class="checkmark" src="/icons/checkmarkIcon.webp">
							</div>
						{:else if coloumn === "false"}

						{:else}
							<p class={e !== 0 ? 'perk' : 'subtitle'}>
								{coloumn}
							</p>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	{/each}
</div>

<style lang="scss">

	.table {
		box-sizing: border-box;
		display: 	flex;
		flex-basis: auto;

		flex-direction: column;
		flex-shrink: 	0;
		list-style: 	none;

		background: var(--TransBlack);
		border: 1px solid var(--accent7);
		padding: 	15px;}

	.row, .subsection {
		flex-direction: row;
		display: 		flex;

		.cell {	width: 		20%;
				display: 	flex;
			p.perk {
				margin: 	0 auto;}
			&.membershipTier > h5 {
				margin: 	0 auto;}}}

	.row {			padding: 7px 0;
		border-bottom: 	1px solid var(--accent9);}
	.subsection {	padding: 40px 0 8px;}

	.checkWrapper {
		position: 	relative;
		margin: 	auto auto;
		width: 		20px;
		min-height: 14px;

		img {
			position: 	absolute;
			filter: 	invert(1);

			width: 	20px;
			height: 20px;
			margin: -3px 0;}}
</style>