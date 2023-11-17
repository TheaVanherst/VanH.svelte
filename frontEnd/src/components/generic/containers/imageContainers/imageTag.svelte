<script>
    import { fly } from 'svelte/transition';

	export let
		active = false,
		positionArray = [1,1],
		position = 'absolute',
		border = 'regularBorder';
</script>

{#if !active}
	<div class="developmentIcon {border}" style="position:{position}"
		 transition:fly={{y: (positionArray[0] * 50), duration: 400 }}>
			<slot/>
	</div>
{/if}

<style lang="scss">
	:global(.developmentIcon *) {
		color: 		black;}

	.developmentIcon {
		margin: 	5px 5px;
		padding: 	5px 7px;

		top: 	0;
		right: 	0;

		font-weight: 700;
		background: var(--TransWhite);
		color: 		black;}
</style>