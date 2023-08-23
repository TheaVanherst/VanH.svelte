<script>
    import { screenType } 	from '$lib/accessibilityController.js';

    import ListedBox from "$root/components/sections/listedBox.svelte";

    // let the record show that this code sucks balls.

	export let
		data,
		citation,
        divisional = 3,
        redirect = true;
</script>

<div class="tierTable {redirect ? 'offsetFix' : 'largerOffset'}">
	{#each data as set}
		<div class="tierBlock {$screenType < divisional ? 'stack' : ''}">
			{#if redirect}
				<a href={set.link ?? ''} target="_blank">
					<ListedBox data={set} button={redirect}/>
				</a>
			{:else}
				<ListedBox data={set}/>
			{/if}
		</div>
	{/each}
</div>

{#if citation}
	<div class="tableCite citation externalCitation">
		<p>{ citation }</p>
		{#each data as set}
			<div style="background-color: var(--accent{set.accent})"></div>
		{/each}
	</div>
{/if}

<style lang="scss">
	.tierTable {
		display: 		flex;
		flex-wrap: 		wrap;
		gap: 			15px;

		&.offsetFix {
			margin-bottom: 	38px;}
		&.largerOffset {
			margin-bottom: 	30px;}

		.tierBlock {
			width: 			calc((100% - 15px) / 2);
			&.stack {
				width: 100%;}}}

	.stack {
		margin-bottom: 20px;
		&:last-of-type {
			margin-bottom: 0;}}

	.tableCite {
		margin:     	0 0 15px auto;
		padding: 		3px 10px 3px 3px;
		border-right: 	1px solid var(--accent8);

		display:    flex;
		width:      max-content;
		background: var(--backgroundTrans);

		p {
			margin-right: 5px;}

		div {
			width:      10px;
			height:     10px;
			margin:     auto 0 auto 3px;}}

</style>