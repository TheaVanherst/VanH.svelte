<script>
	export let
		borders = "small",
		icon = undefined,
        hovered = false;
</script>

<div class="neonButton {borders}"
	class:hovered={hovered}>
	{#if icon}
		<img src="{icon}.webp">
	{:else}
		<slot/>
	{/if}
</div>

<style lang="scss">
	.neonButton {
		width: 		min-content;
		height: 	min-content;
		overflow: 		hidden;
		vertical-align: bottom;

		transition: ease .3s;
		img {
			vertical-align: bottom;
			transition: ease .3s;}

		&.small {
			img {   width:  18px;
				height: 18px;}}

		padding: 		5px;
		border-radius: 	var(--bordernormal);

		background: 	white;
		border: 1px solid var(--accent7);

		img {
			position: 	relative;}

		&:hover, &.hovered {
			background: var(--accent7);
			img {
				filter: invert(1);}}}
</style>