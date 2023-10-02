<script>
    import { fly } from 'svelte/transition';

	export let
		active = false,
		position = [1,1],
		border = 'regularBorder';
</script>

{#if !active}
	<div class="developmentIcon
		{border}
		{position[0] === 0 ? 'bottom' : 'top'}
		{position[1] === 0 ? 'left' : 'right'}"
		 transition:fly={{y: (position[0] * 50), duration: 400 }}>
			<slot/>
	</div>
{/if}

<style lang="scss">
	:global(.developmentIcon *) {
		color: 		black;}

	.developmentIcon {
		position: 	absolute;

		margin: 	5px 5px;
		padding: 	5px 7px;

		&.left {	left: 	0;}
		&.right {	right: 	0;}
		&.top {		top: 	0;}
		&.bottom {	bottom: 0;}

		font-weight: 700;
		background: var(--TransWhite);
		color: 		black;}
</style>