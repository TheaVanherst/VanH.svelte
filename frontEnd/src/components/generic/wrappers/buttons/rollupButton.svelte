<script>
	export let
		active = false,
		hover = false,
		invert = false,
		padding = "5"
</script>

<div class="aspectMask">
	<div class="foldable"
		 class:active
		 class:invert
		 class:regular={!invert}
		 on:mousedown={() => active=!active}>
		<div class="iconCrop" style="padding:{padding}px">
			<img src="/icons/downIcon.webp">
		</div>
	</div>
</div>

<style lang="scss">
	.aspectMask {
		margin: auto 8px;}
	.foldable {
		border-radius: 	50%;
		aspect-ratio: 	1/1;

		.iconCrop {
			aspect-ratio: 	1/1;
			margin:	 		auto;
			display: 		flex;}

		img {
			position: 	relative;
			display: 	flex;
			margin: 	auto;
			top: 		2px;
			transition: filter .3s ease;}

		transition: background .5s ease, transform .3s ease;

		&.regular {
			border: 1px solid var(--accent7);
			background: var(--TransBlack);
			img {	filter: 	invert(1);}
			&.active {	background: var(--accent10);
				transform: rotate(180deg);
				img {	filter: 	invert(0);}}
			&:hover {	background: var(--accent7);
				img {	filter: 	invert(1);}}}
		&.invert {
			&.active {
				transform: rotate(180deg);}
			&:hover {	background: var(--accent7);
				img {	filter: 	invert(1);}}}}
</style>