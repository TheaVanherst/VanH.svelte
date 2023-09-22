<script>
	export let
		borders = "small",
		icon = undefined
</script>

<div class="neonButton {borders}">
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
		border: 1px solid var(--accent2);

		img {
			filter:     invert(1);
			position: 	relative;}

		&:hover {
			background: var(--accent2);
			img {
				filter: invert(0);}}}
</style>